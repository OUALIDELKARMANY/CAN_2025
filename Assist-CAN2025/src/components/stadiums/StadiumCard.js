import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, typography } from '../../styles/theme';

const { width } = Dimensions.get('window');

const StadiumCard = ({ stadium, onPress }) => {
    const hasImageUrl =
        typeof stadium?.image === 'string' &&
        (stadium.image.startsWith('http') || stadium.image.startsWith('data:image'));

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
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
        backgroundColor: colors.neutral.gray200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stadiumIcon: {
        fontSize: 48,
    },
    content: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.sm,
    },
    name: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        fontSize: typography.fontSize.base,
    },
    city: {
        fontSize: typography.fontSize.base,
        color: colors.primary.green,
        fontWeight: '600',
    },
    capacity: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
    },
    description: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: typography.fontSize.sm * 1.5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.gray200,
    },
    year: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
    },
    renovation: {
        fontSize: typography.fontSize.xs,
        color: colors.accent.gold,
        fontWeight: '600',
    },
});

export default StadiumCard;
