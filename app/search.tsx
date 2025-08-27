import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { ActivityIndicator } from 'react-native';

export default function SearchScreen() {
  const theme = useResolvedTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<{ qassaid: any[]; duruss: any[]; audio: any[] }>({ qassaid: [], duruss: [], audio: [] });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setErrorMsg(null);
    if (!query) {
      setResults({ qassaid: [], duruss: [], audio: [] });
      return;
    }
    setLoading(true);
    try {
      // Appels API réels
      const [qassaid, duruss, audio] = await Promise.all([
        import('@/services/DataService').then(m => m.DataService.searchQassaid(query)),
        import('@/services/DataService').then(m => m.DataService.getDurus()),
        import('@/services/DataService').then(m => m.DataService.searchSounds(query)),
      ]);
      // Exclure les Qassaid déjà téléchargés
      const downloadedIds = new Set(duruss.map((d: any) => d.qassaid_id));
      const filteredQassaid = qassaid.filter((item: any) => !downloadedIds.has(item.id));
      // Tri alphabétique
      const sortByTitle = (arr: any[]) => arr.slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      setResults({
        qassaid: sortByTitle(filteredQassaid),
        duruss: sortByTitle(duruss),
        audio: sortByTitle(audio),
      });
      if (filteredQassaid.length === 0 && duruss.length === 0 && audio.length === 0) {
        setErrorMsg('Aucun résultat trouvé pour votre recherche.');
      }
    } catch (err: any) {
      setErrorMsg('Erreur lors de la recherche. Vérifiez votre connexion.');
      setResults({ qassaid: [], duruss: [], audio: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }] }>
      <View style={[styles.content, { backgroundColor: Colors[theme].background }] }>
        <View style={[styles.searchContainer, { backgroundColor: Colors[theme].surface }] }>
          <View style={[styles.searchInputContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].border }] }>
            <Ionicons name="search" size={20} color={Colors[theme].icon} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: Colors[theme].text }]}
              placeholder="Rechercher dans Qassaid, Duruss..."
              placeholderTextColor={Colors[theme].textSecondary}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color={Colors[theme].icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={[styles.resultsContainer, { backgroundColor: Colors[theme].background }] }>
          {searchQuery.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={60} color={Colors[theme].border} />
              <Text style={[styles.emptyText, { color: Colors[theme].textSecondary }]}>Saisissez votre recherche</Text>
              <Text style={[styles.emptySubtext, { color: Colors[theme].textSecondary }]}>Recherchez dans les Qassaid, Duruss et plus encore</Text>
            </View>
          ) : loading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator size="large" color={Colors[theme].accent} />
              <Text style={[styles.emptyText, { color: Colors[theme].textSecondary }]}>Recherche en cours...</Text>
            </View>
          ) : errorMsg ? (
            <View style={styles.emptyState}>
              <Ionicons name="alert" size={60} color={Colors[theme].error} />
              <Text style={[styles.emptyText, { color: Colors[theme].error }]}>{errorMsg}</Text>
            </View>
          ) : (
            <View style={styles.suggestions}>
              {results.qassaid.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: Colors[theme].accent }]}>Qassaid</Text>
                  {results.qassaid.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.suggestionItem, { borderBottomColor: Colors[theme].border }]}
                      onPress={() => router.push({ pathname: '/pdf', params: { id: item.id, title: item.title, uri: item.pdf_url } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="book" size={20} color={Colors[theme].accent} />
                        <Text style={[styles.suggestionLabel, { color: Colors[theme].text }]}>{item.title}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={Colors[theme].icon} />
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {results.duruss.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: Colors[theme].accent }]}>Duruss</Text>
                  {results.duruss.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.suggestionItem, { borderBottomColor: Colors[theme].border }]}
                      onPress={() => item.qassaid?.pdf_url && router.push({ pathname: '/pdf', params: { id: item.qassaid.id, title: item.qassaid.title, uri: item.qassaid.pdf_url } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="reader" size={20} color={Colors[theme].accent} />
                        <Text style={[styles.suggestionLabel, { color: Colors[theme].text }]}>{item.qassaid?.title || 'Durus'}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={Colors[theme].icon} />
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {results.audio.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: Colors[theme].accent }]}>Audio</Text>
                  {results.audio.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.suggestionItem, { borderBottomColor: Colors[theme].border }]}
                      onPress={() => router.push({ pathname: '/(tabs)/sounds', params: { id: item.id, title: item.title } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="musical-notes" size={20} color={Colors[theme].accent} />
                        <Text style={[styles.suggestionLabel, { color: Colors[theme].text }]}>{item.title}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={Colors[theme].icon} />
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  suggestions: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  suggestionLabel: {
    fontSize: 16,
    marginLeft: 15,
  },
});