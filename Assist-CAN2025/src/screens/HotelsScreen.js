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

const HotelsScreen = () => {
    const [hotels] = useState(hotelsData.hotels);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const hasImageUrl = (value) => typeof value === 'string' && value.startsWith('http');

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
        backgroundColor: colors.neutral.gray200,
    },
    cardImagePlaceholder: {
        width: '100%',
        height: 160,
        backgroundColor: colors.neutral.gray200,
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
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    meta: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: '600',
    },
    price: {
        fontSize: typography.fontSize.base,
        color: colors.primary.green,
        fontWeight: 'bold',
        marginTop: spacing.xs,
    },
    detailsContainer: {
        flex: 1,
    },
    heroImage: {
        width: '100%',
        height: 240,
        backgroundColor: colors.neutral.gray200,
    },
    heroImagePlaceholder: {
        width: '100%',
        height: 240,
        backgroundColor: colors.neutral.gray200,
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
        color: colors.neutral.gray700,
        lineHeight: typography.fontSize.base * 1.6,
        marginBottom: spacing.lg,
    },
    infoCard: {
        gap: spacing.sm,
    },
    infoRow: {
        gap: spacing.xs,
    },
    infoLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: '700',
        color: colors.neutral.gray700,
    },
    infoValue: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray900,
        fontWeight: '600',
    },
});

export default HotelsScreen;
