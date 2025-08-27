import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { useThemeStore, saveThemePreference, ThemePreference } from '@/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const theme = useResolvedTheme();
  const { preference, setPreference } = useThemeStore();

  const applyPreference = async (pref: ThemePreference) => {
    await saveThemePreference(pref);
    setPreference(pref);
  };

  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[theme].accent,
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
      borderBottomColor: Colors[theme].border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      marginLeft: 15,
      color: Colors[theme].text,
    },
    settingValue: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingValueText: {
      fontSize: 14,
      color: Colors[theme].textSecondary,
      marginRight: 8,
    },
  });

  return (
    <View style={themedStyles.container}>
      <View style={{ alignItems: 'center', paddingTop: 0, paddingBottom: 10 }}>
        <TouchableOpacity onPress={() => router.replace('/menu')} activeOpacity={0.7}>
          
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
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color={Colors[theme].accent} />
              <Text style={styles.settingLabel}>Apparence</Text>
            </View>
            <View style={styles.settingValue}>
              <TouchableOpacity onPress={() => applyPreference('system')} style={{ marginRight: 12 }}>
                <Text style={{ color: preference === 'system' ? Colors[theme].accent : Colors[theme].textSecondary }}>Système</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyPreference('light')} style={{ marginRight: 12 }}>
                <Text style={{ color: preference === 'light' ? Colors[theme].accent : Colors[theme].textSecondary }}>Clair</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => applyPreference('dark')}>
                <Text style={{ color: preference === 'dark' ? Colors[theme].accent : Colors[theme].textSecondary }}>Sombre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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