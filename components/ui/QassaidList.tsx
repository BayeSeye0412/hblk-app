import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Qassida = {
  id: string;
  title: string;
  pages: number;
  sounds_count: number;
  downloads_count: number;
  isDownloaded?: boolean;
  pdf_url?: string;
};

interface QassaidListProps {
  qassaid: Qassida[];
  onDownload?: (item: Qassida) => void;
  onRead?: (item: Qassida) => void;
  onDelete?: (item: Qassida) => void;
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  downloadButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#e8f5e9',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 13,
    marginRight: 10,
  },
  statIcon: {
    marginLeft: 10,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: '500',
  },
  downloadingText: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

function QassaidList({ qassaid, onDownload, onRead, onDelete }: QassaidListProps) {
  const theme = useResolvedTheme();
  const insets = useSafeAreaInsets();
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(new Set());
  
  const handleMenuPress = (itemId: string) => {
    setShowMenu(showMenu === itemId ? null : itemId);
  };

  const handleMenuAction = (action: 'read' | 'delete', item: Qassida) => {
    setShowMenu(null);
    if (action === 'read' && onRead) {
      onRead(item);
    } else if (action === 'delete' && onDelete) {
      onDelete(item);
    }
  };

  const handleDownload = async (item: Qassida) => {
    if (!onDownload || downloadingItems.has(item.id)) return;
    
    // Ajouter l'item à la liste des téléchargements en cours
    setDownloadingItems(prev => new Set(prev).add(item.id));
    
    try {
      await onDownload(item);
    } finally {
      // Retirer l'item de la liste des téléchargements en cours
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  return (
    <>
      <FlatList
        data={qassaid}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}
            onPress={() =>
              item.isDownloaded
                ? (onRead && onRead(item))
                : handleDownload(item)
            }
            activeOpacity={0.7}
            disabled={downloadingItems.has(item.id)}
          >
            <View
              style={[styles.downloadButton, { backgroundColor: item.isDownloaded ? 'transparent' : '#e8f5e9' }]}
            >
              {downloadingItems.has(item.id) ? (
                <ActivityIndicator size={26} color={Colors[theme].accent} />
              ) : item.isDownloaded ? (
                <MaterialIcons name="menu-book" size={26} color={Colors[theme].accent} />
              ) : (
                <MaterialIcons name="file-download" size={26} color={Colors[theme].accent} />
              )}
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.title, { color: downloadingItems.has(item.id) ? Colors[theme].textSecondary : Colors[theme].text }]}>{item.title}</Text>
              <View style={styles.statsRow}>
                {downloadingItems.has(item.id) && (
                  <Text style={[styles.downloadingText, { color: Colors[theme].accent }]}>
                    Téléchargement en cours...
                  </Text>
                )}
                {!downloadingItems.has(item.id) && (
                  <>
                    <MaterialIcons name="description" size={16} color={Colors[theme].accentSecondary} />
                      <Text style={[styles.statText, { color: Colors[theme].textSecondary }]}>
                        {typeof item.pages === "number" && item.pages >= 0 ? item.pages : "?"} pages
                      </Text>
                      <MaterialIcons name="audiotrack" size={16} color={Colors[theme].accentSecondary} style={styles.statIcon} />
                      <Text style={[styles.statText, { color: Colors[theme].textSecondary }]}>
                        {typeof item.sounds_count === "number" && item.sounds_count >= 0 ? item.sounds_count : "?"}
                      </Text>
                      <Feather name="download-cloud" size={16} color={Colors[theme].accentSecondary} style={styles.statIcon} />
                      <Text style={[styles.statText, { color: Colors[theme].textSecondary }]}>
                        {typeof item.downloads_count === "number" && item.downloads_count >= 0 ? item.downloads_count : "?"}
                      </Text>
                  </>
                )}
              </View>
            </View>
            {item.isDownloaded && (
              <TouchableOpacity
                style={styles.menuButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleMenuPress(item.id);
                }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="more-vert" size={24} color={Colors[theme].textSecondary} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
      
      {showMenu && (
        <Modal
          transparent={true}
          visible={!!showMenu}
          onRequestClose={() => setShowMenu(null)}
          animationType="slide"
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(null)}
          >
            <View style={[
              styles.menuContainer, 
              { 
                backgroundColor: Colors[theme].surface,
                paddingBottom: Math.max(insets.bottom + 20, 40)
              }
            ]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  const item = qassaid.find(q => q.id === showMenu);
                  if (item) handleMenuAction('read', item);
                }}
              >
                <MaterialIcons name="menu-book" size={24} color={Colors[theme].accent} />
                <Text style={[styles.menuText, { color: Colors[theme].text }]}>Ouvrir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  const item = qassaid.find(q => q.id === showMenu);
                  if (item) handleMenuAction('delete', item);
                }}
              >
                <MaterialIcons name="delete" size={24} color={Colors[theme].error} />
                <Text style={[styles.menuText, { color: Colors[theme].error }]}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}

export default QassaidList;
