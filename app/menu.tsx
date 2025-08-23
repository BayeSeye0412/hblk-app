import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();

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
        <Ionicons name="close" size={28} color="#4CAF50" />
      </TouchableOpacity>

      <Text style={{
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#000000',
      }}>
        Menu
      </Text>

      <View style={{ width: 44 }} />
    </View>
  );

  const navigateTo = (screen: string) => {
    router.back();
    setTimeout(() => {
      switch(screen) {
        case 'qassaid':
          router.replace('/');
          break;
        case 'duruss':
          router.replace('/(tabs)/explore');
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
      <CustomHeader />
      
      <ScrollView style={styles.content}>
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
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Mes Favoris</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="download" size={24} color="#4CAF50" />
              <Text style={styles.menuLabel}>Téléchargements</Text>
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
    paddingVertical: 40,
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