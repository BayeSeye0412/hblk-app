import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';

export default function SoundsScreen() {
  const [groupedSounds, setGroupedSounds] = useState<{ [type: string]: import('@/lib/supabase').SoundItem[] }>({});
  const [loading, setLoading] = useState(true);
  const theme = useResolvedTheme();

  const fetchSounds = async () => {
    setLoading(true);
    try {
      const allSounds = await import('@/services/DataService').then(m => m.DataService.getSounds());
      // Grouper par type
      const types = ['kourel', 'radiass', 'waxtane', 'zikr'];
      const grouped: { [type: string]: any[] } = {};
      types.forEach(type => {
        grouped[type] = allSounds.filter((s: any) => s.type === type);
      });
      setGroupedSounds(grouped);
    } catch (e) {
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
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={[styles.content, { backgroundColor: Colors[theme].background }]}>
        <ThemedText style={[styles.description, { color: Colors[theme].text }]}>
          Répertoire des fichiers audio
        </ThemedText>
        
        <View style={styles.foldersGrid}>
          {Object.entries(groupedSounds).map(([type, sounds]) => {
            let iconName: string = '';
            let iconColor: string = Colors[theme].accentSecondary;
            switch (type) {
              case 'kourel': iconName = 'folder-music'; break;
              case 'radiass': iconName = 'folder-music'; break;
              case 'waxtane': iconName = 'folder-music'; break;
              case 'zikr': iconName = 'folder-music'; break;
              default: iconName = 'folder';
            }
            return (
              <TouchableOpacity
                key={type}
                style={[styles.folderItem, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}
                activeOpacity={0.7}
                onPress={() => router.push(`/sounds/${type}` as any)}
              >
                <MaterialCommunityIcons name={iconName as any} size={48} color={iconColor} />
                <ThemedText style={[styles.folderTitle, { color: Colors[theme].text }]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </ThemedText>
                <ThemedText style={[styles.folderCount, { color: Colors[theme].textSecondary }]}>
                  {sounds.length} son{sounds.length !== 1 ? 's' : ''}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folderItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  folderCount: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
