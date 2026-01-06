import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/common/Header';
import CityCard from '../components/cities/CityCard';
import Card from '../components/common/Card';
import { colors, spacing, typography } from '../styles/theme';
import citiesData from '../data/cities.json';

// CitiesScreen = page "Villes Hôtes".
// Rôle:
// - afficher une liste des villes (CityCard)
// - au clic sur une ville: afficher une page détails (description, lieux, conseils)
// Les données viennent de src/data/cities.json (mode offline).
const CitiesScreen = () => {
    // cities: liste des villes chargée depuis le JSON.
    const [cities] = useState(citiesData.cities);
    // selectedCity: si non null => on affiche la vue détails.
    const [selectedCity, setSelectedCity] = useState(null);

    // Helper: détecte si une valeur ressemble à une URL d'image.
    const hasImageUrl = (value) => typeof value === 'string' && value.startsWith('http');

    // Mode "détails" : si une ville est sélectionnée.
    if (selectedCity) {
        return (
            <View style={styles.container}>
                <Header
                    title={selectedCity.nom}
                    subtitle={`Population: ${selectedCity.population}`}
                    onBackPress={() => setSelectedCity(null)}
                />

                <ScrollView style={styles.detailsContainer}>
                    {hasImageUrl(selectedCity.image) ? (
                        <Image
                            source={{ uri: selectedCity.image }}
                            style={styles.cityImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.cityImagePlaceholder}>
                            <Text style={styles.cityImageIcon}>🏙️</Text>
                        </View>
                    )}

                    <View style={styles.detailsContent}>
                        <Text style={styles.description}>{selectedCity.description}</Text>

                        <Text style={styles.sectionTitle}>Lieux Touristiques</Text>
                        {selectedCity.lieuxTouristiques.map((lieu, index) => (
                            <Card key={index} style={styles.attractionCard}>
                                {hasImageUrl(lieu.image) ? (
                                    <Image
                                        source={{ uri: lieu.image }}
                                        style={styles.attractionImage}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.attractionImagePlaceholder}>
                                        <Text style={styles.attractionIcon}>📸</Text>
                                    </View>
                                )}
                                <Text style={styles.attractionName}>{lieu.nom}</Text>
                                <Text style={styles.attractionType}>{lieu.type}</Text>
                                <Text style={styles.attractionDescription}>
                                    {lieu.description}
                                </Text>
                            </Card>
                        ))}

                        <Text style={styles.sectionTitle}>Conseils Pratiques</Text>
                        <Card>
                            {selectedCity.conseils.map((conseil, index) => (
                                <View key={index} style={styles.tipRow}>
                                    <Text style={styles.tipBullet}>•</Text>
                                    <Text style={styles.tipText}>{conseil}</Text>
                                </View>
                            ))}
                        </Card>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Mode "liste" : affichage de toutes les villes.
    return (
        <View style={styles.container}>
            <Header
                title="Villes Hôtes"
                subtitle={`${cities.length} villes à découvrir`}
            />

            <FlatList
                data={cities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CityCard city={item} onPress={() => setSelectedCity(item)} />
                )}
                contentContainerStyle={styles.listContent}
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
    detailsContainer: {
        flex: 1,
    },
    cityImagePlaceholder: {
        width: '100%',
        height: 250,
        backgroundColor: colors.neutral.gray200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityImage: {
        width: '100%',
        height: 250,
        backgroundColor: colors.neutral.gray200,
    },
    cityImageIcon: {
        fontSize: 80,
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
    sectionTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    attractionCard: {
        marginBottom: spacing.md,
    },
    attractionImagePlaceholder: {
        width: '100%',
        height: 150,
        backgroundColor: colors.neutral.gray200,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    attractionImage: {
        width: '100%',
        height: 150,
        backgroundColor: colors.neutral.gray200,
        borderRadius: 8,
        marginBottom: spacing.sm,
    },
    attractionIcon: {
        fontSize: 48,
    },
    attractionName: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginBottom: spacing.xs,
    },
    attractionType: {
        fontSize: typography.fontSize.sm,
        color: colors.primary.green,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    attractionDescription: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: typography.fontSize.sm * 1.5,
    },
    tipRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    tipBullet: {
        fontSize: typography.fontSize.lg,
        color: colors.primary.green,
        marginRight: spacing.sm,
    },
    tipText: {
        flex: 1,
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray700,
        lineHeight: typography.fontSize.base * 1.5,
    },
});

export default CitiesScreen;
