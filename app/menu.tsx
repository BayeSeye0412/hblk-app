import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const theme = useResolvedTheme();

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
    <View style={[styles.container, { backgroundColor: Colors[theme].background }] }>
      <ScrollView style={[styles.content, { paddingBottom: 80, backgroundColor: Colors[theme].background }] }>
        <View style={[styles.logoSection, { borderBottomColor: Colors[theme].border }] }>
          <View style={[styles.logoPlaceholder, { backgroundColor: Colors[theme].surface }] }>
            <Ionicons name="book" size={50} color={Colors[theme].accent} />
          </View>
          <Text style={[styles.appTitle, { color: Colors[theme].text }]}>Hizbul Lahi Li Khidmatil Khadim</Text>
          <Text style={[styles.appSubtitle, { color: Colors[theme].textSecondary }]}>Application spirituelle</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]}
            onPress={() => navigateTo('duruss')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="reader" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Duruss</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]}
            onPress={() => navigateTo('qassaid')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="book" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Qassaid</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]}
            onPress={() => navigateTo('sounds')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="musical-notes" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Sons</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]}
            onPress={() => navigateTo('learn')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="school" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Apprendre</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]} onPress={() => router.push('/settings?tab=favorites')}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Mes Favoris</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { marginTop: 16, borderBottomColor: Colors[theme].border }]} onPress={() => router.push({ pathname: '/settings' })}>
            <View style={styles.menuLeft}>
              <Ionicons name="settings" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>Paramètres</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: Colors[theme].border }]} onPress={() => router.push('/settings?tab=about')}>
            <View style={styles.menuLeft}>
              <Ionicons name="information-circle" size={24} color={Colors[theme].accent} />
              <Text style={[styles.menuLabel, { color: Colors[theme].text }]}>À propos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
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
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500',
  },
});