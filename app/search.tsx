import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Header personnalisé avec SafeArea native
  const CustomHeader = () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      height: 44 + insets.top,
      paddingTop: insets.top,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    }}>
      <TouchableOpacity 
        onPress={() => router.back()}
        activeOpacity={0.7}
        style={{ width: 44, alignItems: 'flex-start' }}
      >
        <Ionicons name="arrow-back" size={28} color="#4CAF50" />
      </TouchableOpacity>

      <Text style={{
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#000000',
      }}>
        Recherche
      </Text>

      <View style={{ width: 44 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher dans Qassaid, Duruss..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
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
          ) : (
            <View style={styles.suggestions}>
              <Text style={styles.sectionTitle}>Suggestions</Text>
              
              <TouchableOpacity style={styles.suggestionItem}>
                <View style={styles.suggestionLeft}>
                  <Ionicons name="book" size={20} color="#4CAF50" />
                  <Text style={styles.suggestionLabel}>Qassida: {searchQuery}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionItem}>
                <View style={styles.suggestionLeft}>
                  <Ionicons name="reader" size={20} color="#4CAF50" />
                  <Text style={styles.suggestionLabel}>Duruss: {searchQuery}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.suggestionItem}>
                <View style={styles.suggestionLeft}>
                  <Ionicons name="musical-notes" size={20} color="#4CAF50" />
                  <Text style={styles.suggestionLabel}>Audio: {searchQuery}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#999" />
              </TouchableOpacity>
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