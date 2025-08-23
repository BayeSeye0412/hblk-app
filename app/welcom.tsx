import { ThemedText } from '@/components/ThemedText';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Rect, Svg } from 'react-native-svg';

export default function HomeScreen() {
    // Référence au son
    const sound = useRef<Audio.Sound | null>(null);

    // Fonction pour charger et jouer le son
    const playSound = async () => {
        try {
            const { sound: soundObject } = await Audio.Sound.createAsync(
                require('@/assets/sons/entree.mp3'),
                { shouldPlay: true }
            );
            sound.current = soundObject;
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    // Fonction pour arrêter le son
    const stopSound = async () => {
        if (sound.current) {
            await sound.current.stopAsync();
        }
    };

    // Nettoyer le son quand on quitte la page
    useEffect(() => {
        playSound();
        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    // Animation du contour progressif
    const svgWidth = 195;
    const svgHeight = 250;
    const perimeter = 2 * (svgWidth + svgHeight);
    const [dashOffset, setDashOffset] = React.useState(perimeter);

    useEffect(() => {
        const dashOffsetAnim = new Animated.Value(perimeter);
        const id = dashOffsetAnim.addListener(({ value }) => setDashOffset(value));
        
        Animated.loop(
            Animated.timing(dashOffsetAnim, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: false,
            })
        ).start();

        return () => dashOffsetAnim.removeListener(id);
    }, [perimeter]);

    return (
        <TouchableWithoutFeedback onPress={stopSound}>
            <View style={styles.container}>
                <ThemedText type="title" style={styles.titre}>Dalal ak Jamm</ThemedText>
                <View style={[styles.animatedBorder, { width: svgWidth, height: svgHeight }]}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <View style={StyleSheet.absoluteFill} pointerEvents="none">
                        <Svg width={svgWidth} height={svgHeight}>
                            <Rect
                                x={4}
                                y={4}
                                width={svgWidth - 8}
                                height={svgHeight - 8}
                                rx={20}
                                stroke="#4CAF50"
                                strokeWidth={4}
                                fill="none"
                                strokeDasharray={perimeter}
                                strokeDashoffset={dashOffset}
                            />
                        </Svg>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.orange]}
                        onPress={() => router.push('/(tabs)')}
                    >
                        <ThemedText style={styles.buttonText}>Commencer</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.green]}>
                        <ThemedText style={styles.buttonText}>Partager</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    titre: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEA625',
        marginBottom: 60,
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 0,
        marginTop: 75,
        marginBottom: 20,
    },
    animatedBorder: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
    
    },
    buttonRow: {
        gap: 16,
        marginTop: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        textAlign: 'center',
        alignItems: 'center',
    },
    orange: {
        backgroundColor: '#EEA625',
    },
    green: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});