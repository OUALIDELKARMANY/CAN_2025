import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/common/Header';
import MatchCard from '../components/matches/MatchCard';
import SkeletonMatchCard from '../components/common/SkeletonMatchCard';
import { colors, spacing, typography, borderRadius } from '../styles/theme';
import matchesData from '../data/matches.json';
import {
    sortMatchesByDate,
} from '../utils/filters';
import { getFavoriteMatches, saveFavoriteMatch, removeFavoriteMatch } from '../utils/storage';

// MatchesScreen = page "Matchs".
// Rôle:
// - charger les matchs depuis le JSON local (mode offline)
// - afficher la liste via FlatList
// - permettre de marquer/démarquer un match en favori (AsyncStorage)
const MatchesScreen = () => {
    // matches: liste des matchs (triés par date)
    const [matches, setMatches] = useState([]);
    // favorites: liste des IDs favoris stockés localement
    const [favorites, setFavorites] = useState([]);
    // loading/error: états d'affichage pendant le chargement
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Au montage: on charge les données locales et les favoris.
    useEffect(() => {
        loadData();
    }, []);

    // Charge les matchs depuis src/data/matches.json + charge les favoris depuis AsyncStorage.
    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Sécurise la lecture du JSON (si matchesData.matches est absent).
            const localMatches = Array.isArray(matchesData?.matches) ? matchesData.matches : [];

            // Tri par date pour un affichage chronologique.
            const sortedMatches = sortMatchesByDate(localMatches);
            setMatches(sortedMatches);

            // Favoris = liste d'IDs persistée dans AsyncStorage.
            const favs = await getFavoriteMatches();
            setFavorites(favs);
        } catch (e) {
            setError(e?.message || 'Erreur lors du chargement des matchs');
            setMatches([]);
        } finally {
            setLoading(false);
        }
    };

    // Toggle favori: si l'ID est déjà dans favorites => remove, sinon => add.
    const handleToggleFavorite = async (matchId) => {
        if (favorites.includes(matchId)) {
            await removeFavoriteMatch(matchId);
            setFavorites(favorites.filter((id) => id !== matchId));
        } else {
            await saveFavoriteMatch(matchId);
            setFavorites([...favorites, matchId]);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Matchs CAN 2025"
                subtitle={`${matches.length} match${matches.length > 1 ? 's' : ''}`}
            />

            <FlatList
                data={matches}
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
