import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    Linking,
} from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import Button from '../components/common/Button';
import MatchCard from '../components/matches/MatchCard';
import SkeletonMatchCard from '../components/common/SkeletonMatchCard';
import Card from '../components/common/Card';
import { getFavoriteMatches, saveFavoriteMatch, removeFavoriteMatch } from '../utils/storage';
import { getAfconFixtures } from '../services/apiSports';
import {
    AFRICA_TOP_SPORTS_URLS,
    AFRICA_TOP_SPORTS_PROGRAM_CITIES,
    getProgramByCity,
} from '../services/africaTopSports';

const { width } = Dimensions.get('window');

const CAN_LOGO_URL = 'https://critikmag.com/wp-content/uploads/2025/01/logo-officiel-de-la-can-2025-critikmag.jpg';

const HomeScreen = ({ navigation }) => {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProgramCity, setSelectedProgramCity] = useState(
        AFRICA_TOP_SPORTS_PROGRAM_CITIES[0]?.key || 'tanger'
    );
    const [programItems, setProgramItems] = useState([]);
    const [programError, setProgramError] = useState(null);
    const [programLoading, setProgramLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            setProgramError(null);

            const upcoming = await getAfconFixtures({ season: 2025, status: 'NS' });
            setUpcomingMatches(upcoming.slice(0, 3));

            setProgramLoading(true);
            try {
                const program = await getProgramByCity(selectedProgramCity);
                setProgramItems(Array.isArray(program) ? program.slice(0, 5) : []);
            } catch (e) {
                setProgramItems([]);
                setProgramError(e?.message || 'Impossible de charger les infos Africa Top Sports');
            } finally {
                setProgramLoading(false);
            }

            const favs = await getFavoriteMatches();
            setFavorites(favs);
        } catch (e) {
            setError(e?.message || 'Erreur lors du chargement des matchs');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectProgramCity = async (cityKey) => {
        setSelectedProgramCity(cityKey);
        setProgramLoading(true);
        setProgramError(null);

        try {
            const program = await getProgramByCity(cityKey);
            setProgramItems(Array.isArray(program) ? program.slice(0, 5) : []);
        } catch (e) {
            setProgramItems([]);
            setProgramError(e?.message || 'Impossible de charger les infos Africa Top Sports');
        } finally {
            setProgramLoading(false);
        }
    };

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
                    <Image source={{ uri: CAN_LOGO_URL }} style={styles.heroLogo} resizeMode="contain" />
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

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Infos (Africa Top Sports)</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(AFRICA_TOP_SPORTS_URLS.CAN_GUIDE)}>
                        <Text style={styles.seeAll}>Guide →</Text>
                    </TouchableOpacity>
                </View>

                <Card style={styles.atsCard}>
                    <Text style={styles.atsTitle}>Programme par ville</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.atsCitiesScroll}>
                        <View style={styles.atsCitiesRow}>
                            {AFRICA_TOP_SPORTS_PROGRAM_CITIES.map((c) => {
                                const active = c.key === selectedProgramCity;
                                return (
                                    <TouchableOpacity
                                        key={c.key}
                                        style={[styles.atsCityChip, active && styles.atsCityChipActive]}
                                        onPress={() => handleSelectProgramCity(c.key)}
                                    >
                                        <Text
                                            style={[styles.atsCityChipText, active && styles.atsCityChipTextActive]}
                                        >
                                            {c.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>

                    {programError ? (
                        <Text style={styles.atsError}>{programError}</Text>
                    ) : programLoading ? (
                        <Text style={styles.atsHint}>Chargement…</Text>
                    ) : programItems.length ? (
                        <View style={styles.atsList}>
                            {programItems.map((item, idx) => (
                                <View key={`${item.dateLabel}-${idx}`} style={styles.atsRow}>
                                    <Text style={styles.atsDate}>{item.dateLabel}</Text>
                                    <Text style={styles.atsMatch} numberOfLines={1}>
                                        {item.matchLabel}
                                    </Text>
                                    <Text style={styles.atsTime}>{item.timeLabel}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.atsHint}>Aucun match trouvé</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            const selected = AFRICA_TOP_SPORTS_PROGRAM_CITIES.find(
                                (c) => c.key === selectedProgramCity
                            );
                            if (selected?.url) Linking.openURL(selected.url);
                        }}
                        style={styles.atsSource}
                    >
                        <Text style={styles.atsSourceText}>Source</Text>
                    </TouchableOpacity>
                </Card>
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
        fontWeight: '600',
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
        fontWeight: '600',
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
        fontWeight: '600',
    },
    errorText: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        fontWeight: '600',
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
        fontWeight: '600',
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
        fontWeight: '600',
    },
    atsError: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        fontWeight: '600',
    },
});

export default HomeScreen;
