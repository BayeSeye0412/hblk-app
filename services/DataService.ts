import { create } from 'zustand';
import { DurusItem, getUserOrDeviceId, QassaidItem, SoundItem, supabase } from '../lib/supabase';

interface Book {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  content: string;
}

interface Audio {
  id: string;
  title: string;
  duration: number;
  url: string;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  category: string;
  level: number;
}

interface ContentState {
  books: Book[];
  audios: Audio[];
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  fetchAudios: () => Promise<void>;
  fetchLessons: () => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
  books: [],
  audios: [],
  lessons: [],
  loading: false,
  error: null,
  fetchBooks: async () => {
    set({ loading: true });
    try {
      // TODO: Implémenter l'API pour récupérer les livres
      const books: Book[] = [];
      set({ books, error: null });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des livres' });
    } finally {
      set({ loading: false });
    }
  },
  fetchAudios: async () => {
    set({ loading: true });
    try {
      // TODO: Implémenter l'API pour récupérer les audios
      const audios: Audio[] = [];
      set({ audios, error: null });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des audios' });
    } finally {
      set({ loading: false });
    }
  },
  fetchLessons: async () => {
    set({ loading: true });
    try {
      // TODO: Implémenter l'API pour récupérer les leçons
      const lessons: Lesson[] = [];
      set({ lessons, error: null });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des leçons' });
    } finally {
      set({ loading: false });
    }
  },
}));

export class DataService {
  // Récupérer et mettre à jour dynamiquement le nombre de pages d'un Qassaid (mobile only)
  static async getQassaidPages(qassaidId: string, pdfUrl?: string): Promise<number> {
    try {
      let pages = 0;
      if (pdfUrl) {
        // Utilisation de react-native-pdf pour obtenir le nombre de pages
        // Cette logique doit être appelée dans un composant React Native, car react-native-pdf ne fonctionne pas en dehors du rendu
        // Ici, on propose une fonction utilitaire à appeler dans le composant qui affiche le PDF
        // Exemple d'utilisation :
        // <Pdf source={{ uri: pdfUrl }} onLoadComplete={(numberOfPages) => ... } />
        // Tu dois appeler DataService.setQassaidPages(qassaidId, numberOfPages) dans le callback onLoadComplete
        pages = 0; // Valeur par défaut, à mettre à jour dans le composant
      }

      // Mettre à jour la colonne 'pages' dans Supabase
      const { error: updateError } = await supabase
        .from('qassaid')
        .update({ pages })
        .eq('id', qassaidId);
      if (updateError) {
        console.error('❌ Erreur update pages:', updateError.message);
      }
      return pages;
    } catch (error) {
      console.error('❌ Erreur catch getQassaidPages:', error);
      return 0;
    }
  }

  // Méthode à appeler dans le composant PDF pour stocker le nombre de pages réel
  static async setQassaidPages(qassaidId: string, pages: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('qassaid')
        .update({ pages })
        .eq('id', qassaidId);
      if (error) {
        console.error('❌ Erreur setQassaidPages:', error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error('❌ Erreur catch setQassaidPages:', error);
      return false;
    }
  }
  
  // ================================================
  // QASSAID - Lecture seule (public)
  // ================================================
  static async getQassaid(): Promise<QassaidItem[]> {
    try {
      console.log('📚 Récupération des Qassaid...');
      
      const { data, error } = await supabase
        .from('qassaid')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur getQassaid:', error.message);
        return [];
      }
      
      console.log(`✅ ${data?.length || 0} Qassaid récupérés`);
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch getQassaid:', error);
      return [];
    }
  }

  // Recherche dans les Qassaid
  static async searchQassaid(query: string): Promise<QassaidItem[]> {
    try {
      const { data, error } = await supabase
        .from('qassaid')
        .select('*')
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur searchQassaid:', error.message);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch searchQassaid:', error);
      return [];
    }
  }

  // ================================================
  // DURUS - Téléchargements utilisateur/appareil
  // ================================================
  static async getDurus(): Promise<DurusItem[]> {
    try {
      console.log('📖 Récupération des Durus...');
      
      const { user_id, device_id } = await getUserOrDeviceId();
      
      let query = supabase
        .from('durus')
        .select(`
          *,
          qassaid (
            id,
            title,
            pdf_url,
            created_at
          )
        `)
        .order('downloaded_at', { ascending: false });
      
      // Filtrer selon l'utilisateur connecté ou l'appareil
      if (user_id) {
        query = query.eq('user_id', user_id);
      } else if (device_id) {
        query = query.eq('device_id', device_id);
      } else {
        return []; // Cas d'erreur
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('❌ Erreur getDurus:', error.message);
        return [];
      }
      
      console.log(`✅ ${data?.length || 0} Durus récupérés`);
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch getDurus:', error);
      return [];
    }
  }

  // Télécharger un Qassaid (connecté ou anonyme)
  static async downloadQassaid(qassaidId: string): Promise<boolean> {
    try {
      console.log('⬇️ Téléchargement Qassaid...', { qassaidId });
      
      const { user_id, device_id } = await getUserOrDeviceId();
      
      const insertData: any = {
        qassaid_id: qassaidId
      };
      
      if (user_id) {
        insertData.user_id = user_id;
      } else if (device_id) {
        insertData.device_id = device_id;
      } else {
        console.error('❌ Impossible de déterminer l\'identifiant');
        return false;
      }
      
      const { data, error } = await supabase
        .from('durus')
        .insert(insertData)
        .select();
      
      if (error) {
        console.error('❌ Erreur downloadQassaid:', error.message);
        return false;
      }
      
      // Incrémenter le compteur permanent de téléchargements
      await this.incrementDownloadCount(qassaidId);
      
      console.log('✅ Qassaid téléchargé:', data);
      return true;
    } catch (error) {
      console.error('❌ Erreur catch downloadQassaid:', error);
      return false;
    }
  }

  // Supprimer un téléchargement
  static async removeDurus(qassaidId: string): Promise<boolean> {
    try {
      const { user_id, device_id } = await getUserOrDeviceId();
      
      let query = supabase
        .from('durus')
        .delete()
        .eq('qassaid_id', qassaidId);
      
      if (user_id) {
        query = query.eq('user_id', user_id);
      } else if (device_id) {
        query = query.eq('device_id', device_id);
      } else {
        return false;
      }
      
      const { error } = await query;
      
      if (error) {
        console.error('❌ Erreur removeDurus:', error.message);
        return false;
      }
      
      console.log('✅ Durus supprimé');
      return true;
    } catch (error) {
      console.error('❌ Erreur catch removeDurus:', error);
      return false;
    }
  }

  // Vérifier si un qassaid est déjà téléchargé
  static async isQassaidDownloaded(qassaidId: string): Promise<boolean> {
    try {
      const { user_id, device_id } = await getUserOrDeviceId();
      
      let query = supabase
        .from('durus')
        .select('id')
        .eq('qassaid_id', qassaidId);
      
      if (user_id) {
        query = query.eq('user_id', user_id);
      } else if (device_id) {
        query = query.eq('device_id', device_id);
      } else {
        return false;
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('❌ Erreur isQassaidDownloaded:', error.message);
        return false;
      }
      
      return (data && data.length > 0);
    } catch (error) {
      console.error('❌ Erreur catch isQassaidDownloaded:', error);
      return false;
    }
  }

  // Compter les téléchargements d'un qassaid spécifique (compteur global permanent)
  static async getQassaidDownloadCount(qassaidId: string): Promise<number> {
    try {
      // Option 1: Utiliser une table séparée "download_stats" si elle existe
      const { data: statsData, error: statsError } = await supabase
        .from('download_stats')
        .select('download_count')
        .eq('qassaid_id', qassaidId)
        .single();
      
      if (!statsError && statsData) {
        return statsData.download_count || 0;
      }
      
      // Option 2 (fallback): Si pas de table stats, utiliser un compteur basé sur l'historique
      // Ici on peut compter TOUS les téléchargements historiques, même supprimés
      // Pour l'instant, on retourne le compteur actuel mais on pourrait faire différemment
      const { count, error } = await supabase
        .from('durus')
        .select('*', { count: 'exact', head: true })
        .eq('qassaid_id', qassaidId);
      
      if (error) {
        console.error('❌ Erreur getQassaidDownloadCount:', error.message);
        return 0;
      }
      
      console.log(`✅ ${count || 0} téléchargements actuels pour qassaid ${qassaidId}`);
      return count || 0;
    } catch (error) {
      console.error('❌ Erreur catch getQassaidDownloadCount:', error);
      return 0;
    }
  }

  // Méthode pour incrémenter le compteur permanent lors d'un téléchargement
  static async incrementDownloadCount(qassaidId: string): Promise<boolean> {
    try {
      // Essayer d'insérer ou mettre à jour le compteur dans download_stats
      const { data: existingStats, error: selectError } = await supabase
        .from('download_stats')
        .select('download_count')
        .eq('qassaid_id', qassaidId)
        .single();
      
      if (selectError && selectError.code !== 'PGRST116') {
        // Erreur autre que "pas trouvé"
        console.error('❌ Erreur select download_stats:', selectError.message);
        return false;
      }
      
      if (existingStats) {
        // Mettre à jour le compteur existant
        const { error: updateError } = await supabase
          .from('download_stats')
          .update({ download_count: existingStats.download_count + 1 })
          .eq('qassaid_id', qassaidId);
        
        if (updateError) {
          console.error('❌ Erreur update download_stats:', updateError.message);
          return false;
        }
      } else {
        // Créer un nouveau compteur
        const { error: insertError } = await supabase
          .from('download_stats')
          .insert({ qassaid_id: qassaidId, download_count: 1 });
        
        if (insertError) {
          console.error('❌ Erreur insert download_stats:', insertError.message);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erreur catch incrementDownloadCount:', error);
      return false;
    }
  }

  // ================================================
  // SOUNDS - Lecture seule (public)
  // ================================================
  static async getSounds(): Promise<SoundItem[]> {
    try {
      console.log('🎵 Récupération des Sons...');
      
      const { data, error } = await supabase
        .from('sounds')
        .select(`
          *,
          qassaid (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur getSounds:', error.message);
        return [];
      }
      
      console.log(`✅ ${data?.length || 0} Sons récupérés`);
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch getSounds:', error);
      return [];
    }
  }

  // Sons par type
  static async getSoundsByType(type: 'kourel' | 'radiass' | 'waxtane' | 'zikr'): Promise<SoundItem[]> {
    try {
      const { data, error } = await supabase
        .from('sounds')
        .select(`
          *,
          qassaid (
            id,
            title
          )
        `)
        .eq('type', type)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur getSoundsByType:', error.message);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch getSoundsByType:', error);
      return [];
    }
  }

  // Recherche dans les Sons
  static async searchSounds(query: string): Promise<SoundItem[]> {
    try {
      const { data, error } = await supabase
        .from('sounds')
        .select(`
          *,
          qassaid (
            id,
            title
          )
        `)
        .or(`title.ilike.%${query}%, auteur.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur searchSounds:', error.message);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('❌ Erreur catch searchSounds:', error);
      return [];
    }
  }

  // ================================================
  // RECHERCHE GLOBALE
  // ================================================
  static async globalSearch(query: string) {
    const [qassaid, sounds] = await Promise.all([
      this.searchQassaid(query),
      this.searchSounds(query)
    ]);

    return {
      qassaid,
      sounds,
      total: qassaid.length + sounds.length
    };
  }
}
