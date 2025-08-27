import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 32, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => router.replace('/menu')} activeOpacity={0.7}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('@/assets/images/icone.png')} style={{ width: 60, height: 60, borderRadius: 16, marginBottom: 8 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#4CAF50' }}>Paramètres</Text>
          </View>
        </TouchableOpacity>
      </View>
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