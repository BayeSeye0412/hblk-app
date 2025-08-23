import { DurusItem } from '@/lib/supabase';
import { DataService } from '@/services/DataService';
import { create } from 'zustand';

interface DurusState {
  durus: DurusItem[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export const useDurusStore = create<DurusState>((set) => ({
  durus: [],
  loading: false,
  refresh: async () => {
    set({ loading: true });
    const data = await DataService.getDurus();
    set({ durus: data, loading: false });
  },
}));
