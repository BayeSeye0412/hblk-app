import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
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
        onPress={() => {
          router.replace('/menu'); // Remplace directement par le menu (pas de double navigation)
        }}
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
        Paramètres
      </Text>

      <View style={{ width: 44 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Général</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <View style={styles.settingValue}>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Audio</Text>
            </View>
            <View style={styles.settingValue}>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="language" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Langue</Text>
            </View>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>Français</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenu</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="download" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Téléchargements</Text>
            </View>
            <View style={styles.settingValue}>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="heart" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Favoris</Text>
            </View>
            <View style={styles.settingValue}>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Version</Text>
            </View>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>1.0.0</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail" size={20} color="#4CAF50" />
              <Text style={styles.settingLabel}>Contact</Text>
            </View>
            <View style={styles.settingValue}>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
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
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
});