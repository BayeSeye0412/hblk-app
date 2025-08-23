import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const openMenu = () => router.push('/menu');
  const openSearch = () => router.push('/search');

  // Header avec SafeAreaView, sans height/minHeight, padding vertical seulement
  const CustomHeader = () => (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <TouchableOpacity 
          onPress={openMenu}
          activeOpacity={0.7}
          style={{ width: 44, alignItems: 'flex-start' }}
        >
          <Ionicons name="menu" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          color: '#000000',
        }}>
          Hizbul Lahi Li Khidmatil Khadim
        </Text>
        <TouchableOpacity 
          onPress={openSearch}
          activeOpacity={0.7}
          style={{ width: 44, alignItems: 'flex-end' }}
        >
          <Ionicons name="search" size={26} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <CustomHeader />,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#eee',
          backgroundColor: '#fff',
          // Utilise le safe area bottom, mais ajoute un espace pour le menu Android
          paddingBottom: Platform.OS === 'android'
            ? insets.bottom + 10 // espace supplémentaire pour Android
            : insets.bottom,
          height: Platform.OS === 'ios'
            ? 85 + insets.bottom
            : 60 + insets.bottom + 10, // espace supplémentaire pour Android
          paddingTop: 5,
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: 'transparent',
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: Platform.OS === 'ios' ? 5 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 5 : 0,
        },
        tabBarButton: ({ children, onPress, style }) => (
          <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            style={style} // <-- OK si style est pour TouchableOpacity
          >
            {children}
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Qassaid',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Duruss',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="reader" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sounds"
        options={{
          title: 'Sons',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Apprendre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
     
    </Tabs>
  );
}
