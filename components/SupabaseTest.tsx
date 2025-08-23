import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { testSupabaseConnection } from '../lib/supabase';

interface SupabaseTestProps {
  onConnectionTest?: (isConnected: boolean) => void;
}

export default function SupabaseTest({ onConnectionTest }: SupabaseTestProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    const connected = await testSupabaseConnection();
    setIsConnected(connected);
    setIsLoading(false);
    onConnectionTest?.(connected);
  };

  useEffect(() => {
    // Test automatique au montage du composant
    testConnection();
  }, []);

  const getStatusColor = () => {
    if (isLoading) return '#FFA500';
    if (isConnected === null) return '#999';
    return isConnected ? '#4CAF50' : '#F44336';
  };

  const getStatusText = () => {
    if (isLoading) return 'Test en cours...';
    if (isConnected === null) return 'Non testé';
    return isConnected ? 'Connecté à Supabase' : 'Erreur de connexion';
  };

  const getStatusIcon = () => {
    if (isLoading) return 'sync';
    if (isConnected === null) return 'help-circle';
    return isConnected ? 'checkmark-circle' : 'close-circle';
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Ionicons 
          name={getStatusIcon()} 
          size={20} 
          color={getStatusColor()} 
        />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={testConnection}
        disabled={isLoading}
      >
        <Ionicons name="refresh" size={16} color="#4CAF50" />
        <Text style={styles.retryText}>Retester</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  retryText: {
    marginLeft: 4,
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
});