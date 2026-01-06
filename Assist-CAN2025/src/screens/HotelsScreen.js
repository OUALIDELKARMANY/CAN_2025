import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { colors, spacing, typography } from '../styles/theme';
import hotelsData from '../data/hotels.json';

// HotelsScreen = page "Hotels".
// Rôle:
// - afficher une liste d'hébergements (cartes)
// - au clic: afficher une vue détails de l'hôtel sélectionné
// Les données viennent de src/data/hotels.json (mode offline).
const HotelsScreen = () => {
    // hotels: liste chargée depuis le JSON.
    const [hotels] = useState(hotelsData.hotels);
    // selectedHotel: si non null => on affiche la vue détails.
    const [selectedHotel, setSelectedHotel] = useState(null);

    // Helper: détecte si une valeur ressemble à une URL d'image.
    const hasImageUrl = (value) => typeof value === 'string' && value.startsWith('http');

    // Mode "détails".
    if (selectedHotel) {
        return (
            <View style={styles.container}>
                <Header
                    title={selectedHotel.nom}
                    subtitle={`${selectedHotel.ville} • ${selectedHotel.type}`}
                    onBackPress={() => setSelectedHotel(null)}
                />

                <ScrollView style={styles.detailsContainer}>
                    {hasImageUrl(selectedHotel.image) ? (
                        <Image
                            source={{ uri: selectedHotel.image }}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.heroImagePlaceholder}>
                            <Text style={styles.heroPlaceholderIcon}>🏨</Text>
                        </View>
                    )}

                    <View style={styles.detailsContent}>
                        <Text style={styles.description}>{selectedHotel.description}</Text>

                        <Card style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Adresse</Text>
                                <Text style={styles.infoValue}>{selectedHotel.adresse}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Prix</Text>
                                <Text style={styles.infoValue}>{selectedHotel.prixNuit}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Note</Text>
                                <Text style={styles.infoValue}>{selectedHotel.note}/5</Text>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Mode "liste".
    return (
        <View style={styles.container}>
            <Header title="Hotels" subtitle={`${hotels.length} hébergement${hotels.length > 1 ? 's' : ''}`} />

            <FlatList
                data={hotels}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Card onPress={() => setSelectedHotel(item)} style={styles.card}>
                        {hasImageUrl(item.image) ? (
                            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                        ) : (
                            <View style={styles.cardImagePlaceholder}>
                                <Text style={styles.cardIcon}>🏨</Text>
                            </View>
                        )}

                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.nom}</Text>
                            <Text style={styles.meta}>{item.ville} • {item.type}</Text>
                            <Text style={styles.price}>{item.prixNuit}</Text>
                        </View>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    listContent: {
        paddingVertical: spacing.md,
    },
    card: {
        marginHorizontal: spacing.md,
        padding: 0,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#F0F0F0',
    },
    cardImagePlaceholder: {
        width: '100%',
        height: 160,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 56,
    },
    cardContent: {
        padding: spacing.md,
        gap: spacing.xs,
    },
    name: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: colors.neutral.gray800,
    },
    meta: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
        fontWeight: 'bold',
    },
    price: {
        fontSize: typography.fontSize.base,
        color: '#8B1538',
        fontWeight: 'bold',
        marginTop: spacing.xs,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    heroImage: {
        width: '100%',
        height: 240,
        backgroundColor: '#F0F0F0',
    },
    heroImagePlaceholder: {
        width: '100%',
        height: 240,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroPlaceholderIcon: {
        fontSize: 72,
    },
    detailsContent: {
        padding: spacing.md,
    },
    description: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray600,
        lineHeight: 24,
        marginBottom: spacing.lg,
    },
    infoCard: {
        gap: spacing.md,
        borderRadius: 16,
    },
    infoRow: {
        gap: spacing.xs,
    },
    infoLabel: {
        fontSize: typography.fontSize.xs,
        fontWeight: 'bold',
        color: colors.neutral.gray500,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray800,
        fontWeight: 'bold',
    },
});

export default HotelsScreen;
