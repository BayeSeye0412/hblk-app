import QassaidList, { Qassida } from '@/components/ui/QassaidList';
import { ThemedText } from '@/components/ThemedText';
import { useDurusStore } from '@/hooks/useDurusStore';
import { DataService } from '@/services/DataService';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function DurussScreen() {
  const { durus, loading: durusLoading, refresh } = useDurusStore();
  const [stats, setStats] = useState<Record<string, { sounds_count: number; downloads_count: number; pages: number }>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const fetchStats = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Récupérer les stats pour chaque Qassida téléchargé
      const statsObj: Record<string, { sounds_count: number; downloads_count: number; pages: number }> = {};
      await Promise.all(durus.map(async (item) => {
        try {
          if (item.qassaid?.id) {
            const sounds = await DataService.getSounds();
            const soundsCount = sounds.filter(s => s.qassaid_id === item.qassaid?.id).length;
            const downloadsCount = await DataService.getQassaidDownloadCount(item.qassaid.id);
            let pages = item.qassaid?.pages ?? item.qassaid?.size ?? 0;
            if (!pages && item.qassaid?.pdf_url) {
              pages = await DataService.getQassaidPages(item.qassaid.id, item.qassaid.pdf_url);
            }
            statsObj[item.qassaid.id] = {
              sounds_count: soundsCount,
              downloads_count: downloadsCount,
              pages,
            };
          }
        } catch (err) {
          // Erreur sur un item, stats à zéro
          if (item.qassaid?.id) {
            statsObj[item.qassaid.id] = { sounds_count: 0, downloads_count: 0, pages: 0 };
          }
        }
      }));
      setStats(statsObj);
    } catch (err: any) {
      setErrorMsg('Erreur lors du chargement des données. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
      if (durus.length > 0) {
        fetchStats();
      } else {
        setLoading(false);
      }
    }, [durus.length])
  );

  // Adapter les données pour QassaidList
  const qassaidForList: Qassida[] = durus.map((item) => ({
    id: item.qassaid?.id || item.id, // <-- id pur pour tracking et navigation
    title: item.qassaid?.title || 'Qassida inconnu',
    pages: stats[item.qassaid?.id || '']?.pages ?? item.qassaid?.pages ?? item.qassaid?.size ?? 0,
    sounds_count: stats[item.qassaid?.id || '']?.sounds_count ?? 0,
    downloads_count: stats[item.qassaid?.id || '']?.downloads_count ?? 0,
    isDownloaded: true,
    pdf_url: item.qassaid?.pdf_url || '',
    // Si QassaidList attend une prop "key", tu peux mettre la clé combinée ici
    key: `${item.qassaid?.id || item.id}_${item.id}`,
  }));

  const handleRead = (item: Qassida) => {
    // Logs de debug
    console.log('🔍 Clic sur PDF:', { id: item.id, title: item.title, pdf_url: item.pdf_url });
    
    // Navigation vers la page PDF à la racine
    router.push({
      pathname: '/pdf',
      params: { 
        uri: item.pdf_url || '',
        title: item.title || 'PDF',
        id: item.id 
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 16 }}>
      {loading || durusLoading ? (
        <>
          <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 40 }} />
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <QassaidList qassaid={[]} onRead={handleRead} />
          </View>
        </>
      ) : errorMsg ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <ThemedText style={{ color: '#b71c1c', fontWeight: 'bold', fontSize: 16, textAlign: 'center', backgroundColor: '#ffeaea', padding: 12, borderRadius: 8 }}>{errorMsg}</ThemedText>
        </View>
      ) : qassaidForList.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <ThemedText style={{ color: '#999', fontSize: 16, fontStyle: 'italic', textAlign: 'center' }}>Aucun qassaïd téléchargé pour le moment.</ThemedText>
        </View>
      ) : (
        <QassaidList qassaid={qassaidForList} onRead={handleRead} />
      )}
    </View>
  );
}
