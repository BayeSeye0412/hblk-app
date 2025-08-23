import QassaidList, { Qassida } from "@/components/ui/QassaidList";
import { DurusItem, QassaidItem } from "@/lib/supabase";
import { DataService } from "@/services/DataService";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function QassaidScreen() {
  const [qassaid, setQassaid] = useState<QassaidItem[]>([]);
  const [durus, setDurus] = useState<DurusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, { sounds_count: number; downloads_count: number; pages: number }>>({});
  const router = useRouter();

  const fetchAll = async () => {
    setLoading(true);
    const [qassaidData, durusData] = await Promise.all([
      DataService.getQassaid(),
      DataService.getDurus(),
    ]);
    setQassaid(qassaidData);
    setDurus(durusData);

    // Récupérer les stats pour chaque Qassida
    const statsObj: Record<string, { sounds_count: number; downloads_count: number; pages: number }> = {};
    await Promise.all(qassaidData.map(async (item) => {
      // Nombre de sons
      const sounds = await DataService.getSounds();
      const soundsCount = sounds.filter(s => s.qassaid_id === item.id).length;
      // Nombre de téléchargements
      const downloadsCount = await DataService.getQassaidDownloadCount(item.id);
      // Nombre de pages (récupéré dynamiquement depuis la colonne 'pages')
      let pages = item.pages ?? item.size ?? 0;
      if (!pages && item.pdf_url) {
        // Si la colonne pages n'est pas renseignée, tente de la récupérer dynamiquement
        pages = await DataService.getQassaidPages(item.id, item.pdf_url);
      }
      statsObj[item.id] = {
        sounds_count: soundsCount,
        downloads_count: downloadsCount,
        pages,
      };
    }));
    setStats(statsObj);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [])
  );

  // Liste des IDs téléchargés
  const downloadedIds = new Set(durus.map(d => d.qassaid_id));

  const handleDownload = async (item: Qassida) => {
    const success = await DataService.downloadQassaid(item.id);
    if (success) {
      alert(`Téléchargement de ${item.title} réussi !`);
      await fetchAll();
    } else {
      alert(`Erreur lors du téléchargement de ${item.title}`);
    }
  };

  const handleRead = (item: Qassida) => {
    router.push({ pathname: '/pdf', params: { id: item.id, title: item.title } });
  };

  // Adapter les données pour le composant QassaidList
  const qassaidForList: Qassida[] = qassaid
    .filter(item => !downloadedIds.has(item.id))
    .map((item) => ({
      id: item.id,
      title: item.title,
      pages: stats[item.id]?.pages ?? 0,
      sounds_count: stats[item.id]?.sounds_count ?? 0,
      downloads_count: stats[item.id]?.downloads_count ?? 0,
      isDownloaded: false,
    }));

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#02701e" style={{ marginTop: 40 }} />
      ) : (
        <QassaidList qassaid={qassaidForList} onDownload={handleDownload} onRead={handleRead} />
      )}
    </View>
  );
}