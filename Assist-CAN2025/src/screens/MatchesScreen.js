import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import Header from '../components/common/Header';
import MatchCard from '../components/matches/MatchCard';
import SkeletonMatchCard from '../components/common/SkeletonMatchCard';
import { colors, spacing, typography, borderRadius } from '../styles/theme';
import { getAfconFixtures } from '../services/apiSports';
import { AFRICA_TOP_SPORTS_URLS } from '../services/africaTopSports';
import {
    filterMatchesByCity,
    filterMatchesByTeam,
    getUniqueCities,
    getUniqueTeams,
    sortMatchesByDate,
} from '../utils/filters';
import { getFavoriteMatches, saveFavoriteMatch, removeFavoriteMatch } from '../utils/storage';

const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Toutes');
    const [selectedTeam, setSelectedTeam] = useState('Toutes');
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedCity, selectedTeam, searchQuery]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const apiMatches = await getAfconFixtures({ season: 2025 });
            const sortedMatches = sortMatchesByDate(apiMatches);
            setMatches(sortedMatches);
            setFilteredMatches(sortedMatches);
            setCities(getUniqueCities(sortedMatches));
            setTeams(getUniqueTeams(sortedMatches));

            const favs = await getFavoriteMatches();
            setFavorites(favs);
        } catch (e) {
            setError(e?.message || 'Erreur lors du chargement des matchs');
            setMatches([]);
            setFilteredMatches([]);
            setCities(['Toutes']);
            setTeams(['Toutes']);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...matches];

        result = filterMatchesByCity(result, selectedCity);
        result = filterMatchesByTeam(result, selectedTeam);

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (match) =>
                    match.equipe1.toLowerCase().includes(query) ||
                    match.equipe2.toLowerCase().includes(query) ||
                    match.ville.toLowerCase().includes(query)
            );
        }

        setFilteredMatches(result);
    };

    const handleToggleFavorite = async (matchId) => {
        if (favorites.includes(matchId)) {
            await removeFavoriteMatch(matchId);
            setFavorites(favorites.filter((id) => id !== matchId));
        } else {
            await saveFavoriteMatch(matchId);
            setFavorites([...favorites, matchId]);
        }
    };

    const renderCityFilter = () => (
        <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Ville</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterChips}>
                    {cities.map((city) => (
                        <TouchableOpacity
                            key={city}
                            style={[
                                styles.filterChip,
                                selectedCity === city && styles.filterChipActive,
                            ]}
                            onPress={() => setSelectedCity(city)}
                        >
                            <Text
                                style={[
                                    styles.filterChipText,
                                    selectedCity === city && styles.filterChipTextActive,
                                ]}
                            >
                                {city}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header
                title="Matchs CAN 2025"
                subtitle={`${filteredMatches.length} match${filteredMatches.length > 1 ? 's' : ''}`}
            />

            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher une équipe ou ville..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={colors.neutral.gray400}
                />
            </View>

            {renderCityFilter()}

            <TouchableOpacity
                style={styles.atsBanner}
                onPress={() => Linking.openURL(AFRICA_TOP_SPORTS_URLS.CAN_GUIDE)}
            >
                <Text style={styles.atsBannerTitle}>Infos pratiques (Africa Top Sports)</Text>
                <Text style={styles.atsBannerSub}>Billets • stades • transports →</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredMatches}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MatchCard
                        match={item}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    loading ? (
                        <View style={styles.emptyContainer}>
                            <SkeletonMatchCard />
                            <SkeletonMatchCard />
                            <SkeletonMatchCard />
                            <SkeletonMatchCard />
                        </View>
                    ) : error ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>⚠️</Text>
                            <Text style={styles.emptyText}>Impossible de charger les matchs</Text>
                            <Text style={styles.emptySubtext}>{error}</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={loadData}>
                                <Text style={styles.retryText}>Réessayer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>⚽</Text>
                            <Text style={styles.emptyText}>Aucun match trouvé</Text>
                            <Text style={styles.emptySubtext}>
                                Essayez de modifier vos filtres
                            </Text>
                        </View>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.white,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        fontSize: typography.fontSize.lg,
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray900,
    },
    filterSection: {
        paddingVertical: spacing.md,
    },
    filterLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: '600',
        color: colors.neutral.gray700,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    filterChips: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    filterChip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    filterChipActive: {
        backgroundColor: colors.primary.green,
        borderColor: colors.primary.green,
    },
    filterChipText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    filterChipTextActive: {
        color: colors.neutral.white,
    },
    atsBanner: {
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    atsBannerTitle: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray900,
        fontWeight: '800',
        marginBottom: spacing.xs,
    },
    atsBannerSub: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    listContent: {
        paddingVertical: spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: spacing['3xl'],
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: spacing.md,
    },
    emptyText: {
        fontSize: typography.fontSize.xl,
        fontWeight: '600',
        color: colors.neutral.gray700,
        marginBottom: spacing.xs,
    },
    emptySubtext: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray500,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: spacing.md,
        backgroundColor: colors.primary.green,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.full,
    },
    retryText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.white,
        fontWeight: '600',
    },
});

export default MatchesScreen;
