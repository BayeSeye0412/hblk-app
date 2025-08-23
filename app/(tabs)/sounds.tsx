import { ThemedText } from '@/components/ThemedText';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SoundsScreen() {
  const [sounds, setSounds] = useState<import('@/lib/supabase').SoundItem[]>([]);
  const [groupedSounds, setGroupedSounds] = useState<{ [type: string]: import('@/lib/supabase').SoundItem[] }>({});
  const [loading, setLoading] = useState(true);

  const fetchSounds = async () => {
    setLoading(true);
    try {
      const allSounds = await import('@/services/DataService').then(m => m.DataService.getSounds());
      setSounds(allSounds);
      // Grouper par type
      const types = ['kourel', 'radiass', 'waxtane', 'zikr'];
      const grouped: { [type: string]: any[] } = {};
      types.forEach(type => {
        grouped[type] = allSounds.filter((s: any) => s.type === type);
      });
      setGroupedSounds(grouped);
    } catch (e) {
      setSounds([]);
      setGroupedSounds({});
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSounds();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.content}>
        <ThemedText style={styles.description}>
          Répertoire des fichiers audio
        </ThemedText>
        {Object.entries(groupedSounds).map(([type, sounds]) => {
          let iconName: string = '';
          let iconColor: string = '#EEA625';
          switch (type) {
            case 'kourel': iconName = 'folder-music'; break;
            case 'radiass': iconName = 'folder-music'; break;
            case 'waxtane': iconName = 'folder-music'; break;
            case 'zikr': iconName = 'folder-music'; break;
            default: iconName = 'folder';
          }
          return (
            <View key={type} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name={iconName as any} size={28} color={iconColor} style={{ marginRight: 8 }} />
                <ThemedText style={{ fontWeight: 'bold', fontSize: 18, color: '#4CAF50' }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </ThemedText>
              </View>
              {sounds.length === 0 ? (
                <ThemedText style={{ color: '#999', fontStyle: 'italic' }}>Aucun son disponible</ThemedText>
              ) : (
                sounds.map((sound: any) => (
                  <View key={sound.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#eee' }}>
                    <Feather name="music" size={20} color="#888" style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <ThemedText style={{ fontSize: 16, color: '#222' }}>{sound.title}</ThemedText>
                      <ThemedText style={{ fontSize: 13, color: '#666' }}>{sound.auteur || 'Auteur inconnu'}</ThemedText>
                    </View>
                  </View>
                ))
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EEA625',
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
   
    color: '#000',
    marginBottom: 20,
  },
});
