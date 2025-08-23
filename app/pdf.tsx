import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Pressable, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import Pdf from 'react-native-pdf';
import * as FileSystem from 'expo-file-system';
import { DataService } from '../services/DataService';

function sanitizeUrl(uri: string | undefined): string {
  if (!uri) return '';
  // Encode l'URL correctement et échappe les caractères problématiques comme les apostrophes
  return encodeURI(uri).replace(/'/g, "%27");
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backOverlay: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 24,
    padding: 6,
  },
  backButtonOverlay: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function PdfScreen() {
  const params = useLocalSearchParams<{ uri: string; id?: string; title?: string }>();
  const remoteUri = params.uri ? encodeURI(params.uri) : '';
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const hideBackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScreenPress = () => {
    setShowBack(true);
    if (hideBackTimeout.current) clearTimeout(hideBackTimeout.current);
    hideBackTimeout.current = setTimeout(() => setShowBack(false), 2500);
  };

  // Téléchargement du PDF en local
  useEffect(() => {
    const downloadPdf = async () => {
      setDownloading(true);
      setPdfError(null);
      try {
        const encodedUrl = encodeURI(remoteUri);
        const fileName = `qassaid_${params.id || Date.now()}.pdf`;
        const localPath = `${FileSystem.cacheDirectory}${fileName}`;
        const downloadRes = await FileSystem.downloadAsync(encodedUrl, localPath);
        setLocalUri(downloadRes.uri);
        setDownloading(false);
        // Tracking event via Supabase (table durus)
        if (params.id) {
          const alreadyDownloaded = await DataService.isQassaidDownloaded(params.id);
          if (!alreadyDownloaded) {
            await DataService.downloadQassaid(params.id);
          }
        }
      } catch (err: any) {
        setPdfError(err.message || 'Erreur lors du téléchargement du PDF');
        setDownloading(false);
      }
    };
    if (remoteUri) downloadPdf();
  }, [remoteUri, params.id]);

  if (!remoteUri) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert" size={40} color="red" />
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'red', fontSize: 16 }}>Aucune URL PDF reçue</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Enlève l'affichage des infos techniques */}
      <Pressable style={styles.fullscreen} onPress={handleScreenPress}>
        {localUri && !downloading && (
          <Pdf
            source={{ uri: localUri }}
            style={styles.pdf}
            singlePage={false}
            horizontal={false}
            onLoadComplete={(numberOfPages) => {
              console.log('Pages détectées:', numberOfPages);
            }}
            onError={error => {
              let msg = '';
              if (typeof error === 'string') {
                msg = error;
              } else if (error && typeof error === 'object' && 'message' in error) {
                msg = (error as any).message;
              } else {
                msg = JSON.stringify(error);
              }
              setPdfError(msg);
            }}
          />
        )}
        {showBack && (
          <View style={styles.backOverlay}>
            <TouchableOpacity style={styles.backButtonOverlay} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
      {downloading && (
        <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#02701e" />
          <Text style={{ color: '#02701e', marginTop: 8 }}>Téléchargement du PDF...</Text>
        </View>
      )}
      {pdfError && (
        <View style={{ position: 'absolute', top: 80, left: 20, right: 20, padding: 8, backgroundColor: '#ffeaea', borderRadius: 8 }}>
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Erreur lors du chargement du PDF</Text>
          <Text style={{ color: '#b71c1c', marginTop: 4 }}>{pdfError}</Text>
        </View>
      )}
    </View>
  );
}
