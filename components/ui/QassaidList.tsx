import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
});

function QassaidList({ qassaid, onDownload, onRead }: QassaidListProps) {
  return (
    <FlatList
      data={qassaid}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() =>
              item.isDownloaded
                ? (onRead && onRead(item))
                : (onDownload && onDownload(item))
            }
            activeOpacity={0.7}
          >
            {item.isDownloaded ? (
              <MaterialIcons name="menu-book" size={26} color="#4CAF50" />
            ) : (
              <MaterialIcons name="file-download" size={26} color="#4CAF50" />
            )}
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.statsRow}>
              <MaterialIcons name="description" size={16} color="#EEA625" />
                <Text style={styles.statText}>
                  {typeof item.pages === "number" && item.pages >= 0 ? item.pages : "?"} pages
                </Text>
                <MaterialIcons name="audiotrack" size={16} color="#EEA625" style={styles.statIcon} />
                <Text style={styles.statText}>
                  {typeof item.sounds_count === "number" && item.sounds_count >= 0 ? item.sounds_count : "?"}
                </Text>
                <Feather name="download-cloud" size={16} color="#EEA625" style={styles.statIcon} />
                <Text style={styles.statText}>
                  {typeof item.downloads_count === "number" && item.downloads_count >= 0 ? item.downloads_count : "?"}
                </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

export default QassaidList;
