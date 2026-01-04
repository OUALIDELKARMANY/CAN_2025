import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, typography } from '../../styles/theme';

const { width } = Dimensions.get('window');

const CityCard = ({ city, onPress }) => {
    const hasImageUrl =
        typeof city?.image === 'string' &&
        (city.image.startsWith('http') || city.image.startsWith('data:image'));

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
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
        backgroundColor: colors.neutral.gray200,
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
        fontSize: typography.fontSize['2xl'],
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
    population: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    description: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: typography.fontSize.sm * 1.5,
    },
    attractionsContainer: {
        backgroundColor: colors.primary.green,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        marginTop: spacing.xs,
    },
    attractionsTitle: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.white,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default CityCard;
