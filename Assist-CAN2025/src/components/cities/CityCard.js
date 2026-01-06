import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, typography } from '../../styles/theme';

// Dimensions écran (utile pour calculer des largeurs si besoin).
const { width } = Dimensions.get('window');

// CityCard = carte UI pour afficher une ville dans une liste.
// Props:
// - city: objet ville (nom, population, description, image, lieuxTouristiques...)
// - onPress: callback lorsque l'utilisateur sélectionne la ville
const CityCard = ({ city, onPress }) => {
    // Détecte si l'image est une URL (http...) ou une data URI.
    const hasImageUrl =
        typeof city?.image === 'string' &&
        (city.image.startsWith('http') || city.image.startsWith('data:image'));

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                {/* Si on a une URL valide, on affiche l'image, sinon un placeholder */}
                {hasImageUrl ? (
                    <Image
                        source={{ uri: city.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.cityIcon}>🏙️</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{city.nom}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.icon}>👥</Text>
                    <Text style={styles.population}>Population: {city.population}</Text>
                </View>

                <Text style={styles.description} numberOfLines={3}>
                    {city.description}
                </Text>

                <View style={styles.attractionsContainer}>
                    <Text style={styles.attractionsTitle}>
                        🎯 {city.lieuxTouristiques.length} lieux à visiter
                    </Text>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: spacing.md,
        overflow: 'hidden',
        padding: 0,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        marginBottom: spacing.md,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityIcon: {
        fontSize: 56,
    },
    content: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.sm,
    },
    name: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray800,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        fontSize: typography.fontSize.sm,
    },
    population: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray600,
        fontWeight: 'bold',
    },
    description: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: 20,
    },
    attractionsContainer: {
        backgroundColor: '#8B1538',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: spacing.sm,
    },
    attractionsTitle: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CityCard;
