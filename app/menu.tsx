import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MenuScreen() {

  const navigateTo = (screen: string) => {
    router.back();
    setTimeout(() => {
      switch(screen) {
        case 'qassaid':
          router.replace('/');
          break;
        case 'duruss':
          router.replace({ pathname: '/(tabs)/durus' });
          break;
        case 'sounds':
          router.replace('/(tabs)/sounds');
          break;
        case 'learn':
          router.replace('/(tabs)/learn');
          break;
        default:
          router.replace('/');
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
  <ScrollView style={[styles.content, { paddingBottom: 80 }] }>
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Ionicons name="book" size={50} color="#4CAF50" />
          </View>
          <Text style={styles.appTitle}>Hizbul Lahi Li Khidmatil Khadim</Text>
          <Text style={styles.appSubtitle}>Application spirituelle</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('duruss')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="reader" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Duruss</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

 <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('qassaid')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="book" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Qassaid</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('sounds')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="musical-notes" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Sons</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('learn')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="school" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Apprendre</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings?tab=favorites')}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Mes Favoris</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { marginTop: 16 }]} onPress={() => router.push({ pathname: '/settings' })}>
            <View style={styles.menuLeft}>
              <Ionicons name="settings" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Paramètres</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings?tab=about')}>
            <View style={styles.menuLeft}>
              <Ionicons name="information-circle" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>À propos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '500',
  },
});