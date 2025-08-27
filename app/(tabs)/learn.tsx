import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';

export default function LearnScreen() {
  const theme = useResolvedTheme();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    setLoading(true);
    // ...fetch logic...
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLessons();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.header}>
        <Ionicons name="school" size={30} color={Colors[theme].accent} />
        <Text style={[styles.title, { color: Colors[theme].text } ]}>Apprendre</Text>
      </View>
      <Text style={[styles.subtitle, { color: Colors[theme].textSecondary }]}>Fonctionnalités d'apprentissage à venir...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginLeft: 12 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
});
