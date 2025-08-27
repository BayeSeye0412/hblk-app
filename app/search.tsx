import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default function SearchScreen() {
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
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher dans Qassaid, Duruss..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={styles.resultsContainer}>
          {searchQuery.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={60} color="#ddd" />
              <Text style={styles.emptyText}>Saisissez votre recherche</Text>
              <Text style={styles.emptySubtext}>Recherchez dans les Qassaid, Duruss et plus encore</Text>
            </View>
          ) : loading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.emptyText}>Recherche en cours...</Text>
            </View>
          ) : errorMsg ? (
            <View style={styles.emptyState}>
              <Ionicons name="alert" size={60} color="#b71c1c" />
              <Text style={styles.emptyText}>{errorMsg}</Text>
            </View>
          ) : (
            <View style={styles.suggestions}>
              {results.qassaid.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Qassaid</Text>
                  {results.qassaid.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.suggestionItem}
                      onPress={() => router.push({ pathname: '/pdf', params: { id: item.id, title: item.title, uri: item.pdf_url } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="book" size={20} color="#4CAF50" />
                        <Text style={styles.suggestionLabel}>{item.title}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#999" />
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {results.duruss.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Duruss</Text>
                  {results.duruss.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.suggestionItem}
                      onPress={() => item.qassaid?.pdf_url && router.push({ pathname: '/pdf', params: { id: item.qassaid.id, title: item.qassaid.title, uri: item.qassaid.pdf_url } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="reader" size={20} color="#4CAF50" />
                        <Text style={styles.suggestionLabel}>{item.qassaid?.title || 'Durus'}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#999" />
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {results.audio.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Audio</Text>
                  {results.audio.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.suggestionItem}
                      onPress={() => router.push({ pathname: '/(tabs)/sounds', params: { id: item.id, title: item.title } })}
                    >
                      <View style={styles.suggestionLeft}>
                        <Ionicons name="musical-notes" size={20} color="#4CAF50" />
                        <Text style={styles.suggestionLabel}>{item.title}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="#999" />
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  suggestions: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
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
    borderBottomColor: '#f0f0f0',
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  suggestionLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
});