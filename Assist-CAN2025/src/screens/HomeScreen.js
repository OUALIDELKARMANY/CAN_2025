import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import Button from '../components/common/Button';
import MatchCard from '../components/matches/MatchCard';
import SkeletonMatchCard from '../components/common/SkeletonMatchCard';
import Card from '../components/common/Card';
import { getFavoriteMatches, saveFavoriteMatch, removeFavoriteMatch } from '../utils/storage';
import matchesData from '../data/matches.json';

// Dimensions de l'écran (utile pour calculer des largeurs responsives).
const { width } = Dimensions.get('window');

// Logo local (assets/) pour éviter toute dépendance réseau.
const CAN_LOGO = require('../../assets/icon.png');

// HomeScreen = page d'accueil.
// Rôle:
// - afficher un "hero" CAN 2025
// - afficher des raccourcis vers les autres pages
// - afficher une liste des prochains matchs (données locales)
// - gérer les favoris (stockage local via AsyncStorage)
const HomeScreen = ({ navigation }) => {
    // upcomingMatches: les prochains matchs à afficher sur l'accueil.
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    // favorites: liste des IDs de matchs marqués en favoris.
    const [favorites, setFavorites] = useState([]);
    // loading/error: états d'UI pendant le chargement des données.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Au montage de l'écran, on charge données + favoris.
    useEffect(() => {
        loadData();
    }, []);

    // Charge les matchs depuis src/data/matches.json, puis lit les favoris depuis le storage.
    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Sécurise la lecture du JSON (au cas où le format est incorrect).
            const allMatches = Array.isArray(matchesData?.matches) ? matchesData.matches : [];

            // Tri chronologique pour obtenir les matchs les plus proches.
            const upcoming = [...allMatches].sort((a, b) => new Date(a.date) - new Date(b.date));

            // On affiche seulement les 3 premiers sur l'accueil.
            setUpcomingMatches(upcoming.slice(0, 3));

            // Favoris = IDs stockés localement.
            const favs = await getFavoriteMatches();
            setFavorites(favs);
        } catch (e) {
            setError(e?.message || 'Erreur lors du chargement des matchs');
        } finally {
            setLoading(false);
        }
    };

    // Ajoute/enlève un match des favoris.
    const handleToggleFavorite = async (matchId) => {
        if (favorites.includes(matchId)) {
            await removeFavoriteMatch(matchId);
            setFavorites(favorites.filter(id => id !== matchId));
        } else {
            await saveFavoriteMatch(matchId);
            setFavorites([...favorites, matchId]);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.hero}>
                <View style={styles.heroContent}>
                    <Image source={CAN_LOGO} style={styles.heroLogo} resizeMode="contain" />
                    <Text style={styles.heroTitle}>CAN 2025</Text>
                    <Text style={styles.heroSubtitle}>Maroc 🇲🇦</Text>
                    <Text style={styles.heroDescription}>
                        Bienvenue à la Coupe d'Afrique des Nations 2025
                    </Text>
                    <Text style={styles.heroDate}>15 Juin - 13 Juillet 2025</Text>
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Accès Rapide</Text>
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Matches')}
                    >
                        <Text style={styles.actionIcon}>⚽</Text>
                        <Text style={styles.actionTitle}>Matchs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Stadiums')}
                    >
                        <Text style={styles.actionIcon}>🏟️</Text>
                        <Text style={styles.actionTitle}>Stades</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Cities')}
                    >
                        <Text style={styles.actionIcon}>🏙️</Text>
                        <Text style={styles.actionTitle}>Villes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Assistance')}
                    >
                        <Text style={styles.actionIcon}>🆘</Text>
                        <Text style={styles.actionTitle}>Aide</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Upcoming Matches */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Prochains Matchs</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
                        <Text style={styles.seeAll}>Voir tout →</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <SkeletonMatchCard />
                        <SkeletonMatchCard />
                        <SkeletonMatchCard />
                    </View>
                ) : error ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : (
                    upcomingMatches.map((match) => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            isFavorite={favorites.includes(match.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onPress={() => navigation.navigate('Matches')}
                        />
                    ))
                )}
            </View>

            {/* Info Banner */}
            <View style={styles.infoBanner}>
                <Text style={styles.infoBannerIcon}>ℹ️</Text>
                <View style={styles.infoBannerContent}>
                    <Text style={styles.infoBannerTitle}>Besoin d'aide ?</Text>
                    <Text style={styles.infoBannerText}>
                        Consultez nos conseils de sécurité et numéros d'urgence
                    </Text>
                </View>
                <Button
                    title="Voir"
                    size="small"
                    variant="accent"
                    onPress={() => navigation.navigate('Assistance')}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    🇲🇦 Bienvenue au Maroc - Terre d'hospitalité
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    hero: {
        backgroundColor: colors.primary.green,
        paddingVertical: spacing['3xl'],
        paddingHorizontal: spacing.md,
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
    },
    heroLogo: {
        width: 110,
        height: 110,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        marginBottom: spacing.md,
    },
    heroTitle: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: 'bold',
        color: colors.neutral.white,
        marginBottom: spacing.xs,
    },
    heroSubtitle: {
        fontSize: typography.fontSize['3xl'],
        color: colors.accent.gold,
        fontWeight: 'bold',
        marginBottom: spacing.md,
    },
    heroDescription: {
        fontSize: typography.fontSize.lg,
        color: colors.neutral.white,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    heroDate: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.white,
        opacity: 0.9,
    },
    section: {
        paddingVertical: spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    seeAll: {
        fontSize: typography.fontSize.base,
        color: colors.primary.green,
        fontWeight: 'bold',
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },
    actionCard: {
        width: (width - spacing.md * 3 - spacing.md * 2) / 2,
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionIcon: {
        fontSize: 48,
        marginBottom: spacing.sm,
    },
    actionTitle: {
        fontSize: typography.fontSize.base,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: colors.accent.goldLight,
        marginHorizontal: spacing.md,
        marginBottom: spacing.lg,
        padding: spacing.md,
        borderRadius: 12,
        alignItems: 'center',
        gap: spacing.sm,
    },
    infoBannerIcon: {
        fontSize: 32,
    },
    infoBannerContent: {
        flex: 1,
    },
    infoBannerTitle: {
        fontSize: typography.fontSize.base,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginBottom: spacing.xs,
    },
    infoBannerText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
    },
    footer: {
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
    },
    footerText: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray600,
        textAlign: 'center',
    },
    loadingContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        alignItems: 'center',
        gap: spacing.sm,
    },
    loadingText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    atsCard: {
        marginHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    atsTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: '700',
        color: colors.neutral.gray900,
        marginBottom: spacing.sm,
    },
    atsCitiesScroll: {
        marginBottom: spacing.md,
    },
    atsCitiesRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    atsCityChip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 999,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    atsCityChipActive: {
        backgroundColor: colors.primary.green,
        borderColor: colors.primary.green,
    },
    atsCityChipText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '700',
    },
    atsCityChipTextActive: {
        color: colors.neutral.white,
    },
    atsList: {
        gap: spacing.sm,
    },
    atsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    atsDate: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray600,
        fontWeight: '700',
        width: 98,
    },
    atsMatch: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray800,
        fontWeight: 'bold',
    },
    atsTime: {
        fontSize: typography.fontSize.xs,
        color: colors.primary.green,
        fontWeight: '800',
        width: 52,
        textAlign: 'right',
    },
    atsSource: {
        alignSelf: 'flex-start',
        marginTop: spacing.md,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 999,
    },
    atsSourceText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray800,
        fontWeight: '700',
    },
    atsHint: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: 'bold',
    },
    atsError: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
