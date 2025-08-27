import { ThemedText } from '@/components/ThemedText';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function SoundsByTypeScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [sounds, setSounds] = useState<import('@/lib/supabase').SoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useResolvedTheme();

  // Fonction pour obtenir le titre correct selon le type
  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'kourel': return 'Kourels';
      case 'radiass': return 'Radiass';
      case 'waxtane': return 'Waxtane';
      case 'zikr': return 'Zikr';
      default: return 'Sons';
    }
  };

  const fetchSounds = async () => {
    if (!type) return;
    setLoading(true);
    try {
      const soundsByType = await import('@/services/DataService').then(m => 
        m.DataService.getSoundsByType(type as any)
      );
      setSounds(soundsByType);
    } catch (e) {
      setSounds([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSounds();
    }, [type])
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: type ? getTypeTitle(type) : 'Sons',
          headerStyle: { backgroundColor: Colors[theme].headerBackground },
          headerTintColor: Colors[theme].headerForeground,
        }} 
      />
      <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
        <ScrollView style={[styles.content, { backgroundColor: Colors[theme].background }]}>
          {loading ? (
            <View style={styles.centerContent}>
              <ThemedText style={{ color: Colors[theme].textSecondary }}>Chargement...</ThemedText>
            </View>
          ) : sounds.length === 0 ? (
            <View style={styles.centerContent}>
              <Feather name="music" size={60} color={Colors[theme].border} />
              <ThemedText style={[styles.emptyText, { color: Colors[theme].textSecondary }]}>
                Aucun son disponible dans cette catégorie
              </ThemedText>
            </View>
          ) : (
            <View style={styles.soundsList}>
              {sounds.map((sound) => (
                <TouchableOpacity
                  key={sound.id}
                  style={[styles.soundItem, { borderBottomColor: Colors[theme].border }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    // Ici, vous pouvez naviguer vers un lecteur audio ou jouer le son
                    console.log('Jouer son:', sound.title);
                  }}
                >
                  <View style={styles.soundLeft}>
                    <Feather name="music" size={20} color={Colors[theme].accent} />
                    <View style={styles.soundInfo}>
                      <ThemedText style={[styles.soundTitle, { color: Colors[theme].text }]}>
                        {sound.title}
                      </ThemedText>
                      <ThemedText style={[styles.soundAuthor, { color: Colors[theme].textSecondary }]}>
                        {sound.auteur || 'Auteur inconnu'}
                      </ThemedText>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play" size={20} color={Colors[theme].accent} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  soundsList: {
    flex: 1,
  },
  soundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  soundLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  soundInfo: {
    marginLeft: 12,
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  soundAuthor: {
    fontSize: 14,
  },
  playButton: {
    padding: 8,
  },
});
