import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useResolvedTheme();

  const openMenu = () => router.push('/menu');
  const openSearch = () => router.push('/search');

  // Header avec SafeAreaView, sans height/minHeight, padding vertical seulement
  const CustomHeader = () => (
    <SafeAreaView edges={['top']} style={{ backgroundColor: Colors[theme].headerBackground }}>
      <StatusBar style={Colors[theme].statusBarStyle} backgroundColor={Colors[theme].headerBackground} />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors[theme].border,
      }}>
        <TouchableOpacity 
          onPress={openMenu}
          activeOpacity={1}
          style={{ width: 44, alignItems: 'flex-start' }}
        >
          <Ionicons name="menu" size={30} color={Colors[theme].accent} />
        </TouchableOpacity>
        <Text style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 15,
          color: Colors[theme].headerForeground,
        }}>
          Hizbul Lahi Li Khidmatil Khadim
        </Text>
        <TouchableOpacity 
          onPress={openSearch}
          activeOpacity={1}
          style={{ width: 44, alignItems: 'flex-end' }}
        >
          <Ionicons name="search" size={26} color={Colors[theme].accent} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        header: () => <CustomHeader />,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors[theme].border,
          backgroundColor: Colors[theme].surface,
          paddingBottom: Platform.OS === 'android'
            ? insets.bottom + 10
            : insets.bottom,
          height: Platform.OS === 'ios'
            ? 85 + insets.bottom
            : 60 + insets.bottom + 10,
          paddingTop: 5,
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: 'transparent',
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: theme === 'dark' ? '#4CAF50' : Colors[theme].tabIconSelected,
        tabBarInactiveTintColor: Colors[theme].tabIconDefault,
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
            activeOpacity={1}
            style={style} 
          >
            {children}
          </TouchableOpacity>
        ),
      })}
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
  name="durus"
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
