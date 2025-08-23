import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

let storage: any = undefined

if (Platform.OS !== 'web' || typeof window !== 'undefined') {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default
  storage = AsyncStorage
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// ================================================
// Types TypeScript
// ================================================
export interface QassaidItem {
  id: string;
  title: string;
  pdf_url: string;
  size?: number;
  pages?: number; // <-- Ajout pour compatibilité TS
  created_at: string;
  localUri?: string; // <-- Ajoute cette ligne
}

export interface DurusItem {
  id: string;
  user_id: string | null;     // Peut être null
  device_id: string | null;   // Nouveau champ
  qassaid_id: string;
  downloaded_at: string;
  qassaid?: QassaidItem;
}

export interface SoundItem {
  id: string;
  qassaid_id?: string;
  title: string;
  audio_url: string;
  type: 'kourel' | 'radiass' | 'waxtane' | 'zikr';
  auteur?: string;
  duree?: number;
  created_at: string;
  qassaid?: QassaidItem;
}

// ================================================
// Fonctions utilitaires
// ================================================

// Obtenir l'utilisateur actuel (version propre)
export const getCurrentUser = async () => {
  try {
    // Vérifier d'abord s'il y a une session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Pas de session = utilisateur non connecté (normal, pas d'erreur)
      return null;
    }
    
    // Il y a une session, récupérer l'utilisateur
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Erreur récupération utilisateur:', error.message);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Erreur catch getCurrentUser:', error);
    return null;
  }
};

// Test connexion Supabase (pour debug uniquement)
export const testSupabaseConnection = async () => {
  try {
    console.log('🔄 Test connexion Supabase...')
    
    const { data: testData, error: testError } = await supabase
      .from('qassaid')
      .select('count')
    
    if (testError) {
      console.error('❌ Erreur table:', testError.message)
      return false
    }
    
    console.log('✅ Connexion réussie')
    return true
  } catch (error) {
    console.error('❌ Erreur catch:', error)
    return false
  }
}

// Générer un ID unique d'appareil
export const getDeviceId = async (): Promise<string> => {
  try {
    let deviceId = await AsyncStorage.getItem('device_id');
    
    if (!deviceId) {
      // Générer un nouvel ID unique
      deviceId = `device_${Platform.OS}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem('device_id', deviceId);
    }
    
    return deviceId;
  } catch (error) {
    console.error('Erreur getDeviceId:', error);
    // Fallback si AsyncStorage échoue
    return `device_${Platform.OS}_${Date.now()}`;
  }
};

// Obtenir l'identifiant utilisateur (user_id ou device_id)
export const getUserOrDeviceId = async (): Promise<{ user_id: string | null, device_id: string | null }> => {
  const user = await getCurrentUser();
  
  if (user?.id) {
    // Utilisateur connecté
    return { user_id: user.id, device_id: null };
  } else {
    // Utilisateur anonyme
    const deviceId = await getDeviceId();
    return { user_id: null, device_id: deviceId };
  }
};