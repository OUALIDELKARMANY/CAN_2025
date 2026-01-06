import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, typography } from '../../styles/theme';

// Dimensions écran (utile pour calculer des largeurs si besoin).
const { width } = Dimensions.get('window');

// StadiumCard = carte UI pour afficher un stade.
// Props:
// - stadium: objet stade (nom, ville, capacité, description, image, etc.)
// - onPress: callback optionnel si on veut rendre la carte cliquable
const StadiumCard = ({ stadium, onPress }) => {
    // Détecte si l'image est une URL (http...) ou une data URI.
    const hasImageUrl =
        typeof stadium?.image === 'string' &&
        (stadium.image.startsWith('http') || stadium.image.startsWith('data:image'));

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                {/* Si on a une URL valide, on affiche l'image, sinon un placeholder */}
                {hasImageUrl ? (
                    <Image
                        source={{ uri: stadium.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.stadiumIcon}>🏟️</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{stadium.nom}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.icon}>📍</Text>
                    <Text style={styles.city}>{stadium.ville}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.icon}>👥</Text>
                    <Text style={styles.capacity}>
                        {/* toLocaleString() sert à afficher les milliers (ex: 60 000) */}
                        Capacité: {stadium.capacite.toLocaleString()} places
                    </Text>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                    {stadium.description}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.year}>
                        Construit en {stadium.anneeConstruction}
                    </Text>
                    {stadium.derniereRenovation && (
                        <Text style={styles.renovation}>
                            Rénové {stadium.derniereRenovation}
                        </Text>
                    )}
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
        height: 150,
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
    stadiumIcon: {
        fontSize: 56,
    },
    content: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.sm,
    },
    name: {
        fontSize: typography.fontSize.lg,
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
    city: {
        fontSize: typography.fontSize.sm,
        color: '#8B1538',
        fontWeight: 'bold',
    },
    capacity: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray600,
    },
    description: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.gray100,
    },
    year: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
    },
    renovation: {
        fontSize: typography.fontSize.xs,
        color: '#D4AF37',
        fontWeight: 'bold',
    },
});

export default StadiumCard;
