import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { colors, spacing, typography, borderRadius } from '../styles/theme';
import { getProfile, saveProfile, getFavoriteMatches } from '../utils/storage';
import matchesData from '../data/matches.json';

// ProfileScreen = page "Mon Profil".
// Rôle:
// - afficher/modifier les infos utilisateur (nom, prénom, pays, équipe favorite)
// - afficher la liste des matchs favoris (à partir des IDs stockés en local)
// Note: la liste des matchs est lue depuis src/data/matches.json (mode offline).
const ProfileScreen = () => {
    // profile: informations utilisateur persistées dans AsyncStorage.
    const [profile, setProfile] = useState({
        nom: '',
        prenom: '',
        pays: '',
        equipe: '',
    });

    // favoriteMatches: objets match correspondant aux IDs favoris (résolus via matches.json).
    const [favoriteMatches, setFavoriteMatches] = useState([]);

    // isEditing: true => affiche le formulaire, false => affiche la vue lecture.
    const [isEditing, setIsEditing] = useState(false);

    // loadingFavorites/favoritesError: états d'affichage de la section favoris.
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favoritesError, setFavoritesError] = useState(null);

    // Au montage: charger profil + favoris.
    useEffect(() => {
        loadProfile();
        loadFavorites();
    }, []);

    // Charge le profil depuis AsyncStorage.
    // Si aucun profil n'existe, on passe directement en mode édition.
    const loadProfile = async () => {
        const savedProfile = await getProfile();
        if (savedProfile) {
            setProfile(savedProfile);
        } else {
            setIsEditing(true);
        }
    };

    // Charge les IDs favoris depuis AsyncStorage puis reconstitue les objets match
    // depuis le JSON local (matches.json).
    const loadFavorites = async () => {
        try {
            setLoadingFavorites(true);
            setFavoritesError(null);

            const favIds = await getFavoriteMatches();
            if (!favIds?.length) {
                setFavoriteMatches([]);
                return;
            }

            // Résolution offline: on prend la liste complète et on filtre sur les IDs favoris.
            const localMatches = Array.isArray(matchesData?.matches) ? matchesData.matches : [];
            const favMatches = localMatches.filter((m) => favIds.includes(m.id));
            setFavoriteMatches(favMatches);
        } catch (e) {
            setFavoritesError(e?.message || 'Erreur lors du chargement des favoris');
            setFavoriteMatches([]);
        } finally {
            setLoadingFavorites(false);
        }
    };

    // Validation minimale + sauvegarde du profil.
    const handleSave = async () => {
        if (!profile.nom || !profile.prenom) {
            Alert.alert('Erreur', 'Veuillez remplir au moins votre nom et prénom');
            return;
        }

        const success = await saveProfile(profile);
        if (success) {
            setIsEditing(false);
            Alert.alert('Succès', 'Profil enregistré avec succès!');
        } else {
            Alert.alert('Erreur', 'Impossible de sauvegarder le profil');
        }
    };

    // Liste d'équipes proposée pour le choix "Équipe favorite".
    const teams = [
        'Maroc', 'Algérie', 'Tunisie', 'Égypte', 'Sénégal', 'Nigeria',
        'Cameroun', 'Côte d\'Ivoire', 'Ghana', 'Mali', 'Burkina Faso',
        'Guinée', 'Afrique du Sud', 'Angola', 'Zambie', 'Tanzanie'
    ];

    return (
        <View style={styles.container}>
            <Header
                title="Mon Profil"
                subtitle="Supporter CAN 2025"
                rightComponent={
                    !isEditing && (
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <Text style={styles.editButton}>✏️</Text>
                        </TouchableOpacity>
                    )
                }
            />

            <ScrollView style={styles.content}>
                <Card style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {profile.nom ? profile.nom[0].toUpperCase() : '👤'}
                            </Text>
                        </View>
                    </View>

                    {isEditing ? (
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nom *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={profile.nom}
                                    onChangeText={(text) => setProfile({ ...profile, nom: text })}
                                    placeholder="Votre nom"
                                    placeholderTextColor={colors.neutral.gray400}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Prénom *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={profile.prenom}
                                    onChangeText={(text) => setProfile({ ...profile, prenom: text })}
                                    placeholder="Votre prénom"
                                    placeholderTextColor={colors.neutral.gray400}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Pays</Text>
                                <TextInput
                                    style={styles.input}
                                    value={profile.pays}
                                    onChangeText={(text) => setProfile({ ...profile, pays: text })}
                                    placeholder="Votre pays"
                                    placeholderTextColor={colors.neutral.gray400}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Équipe favorite</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.teamChips}>
                                        {teams.map((team) => (
                                            <TouchableOpacity
                                                key={team}
                                                style={[
                                                    styles.teamChip,
                                                    profile.equipe === team ? styles.teamChipActive : null,
                                                ].filter(Boolean)}
                                                onPress={() => setProfile({ ...profile, equipe: team })}
                                            >
                                                <Text
                                                    style={[
                                                        styles.teamChipText,
                                                        profile.equipe === team ? styles.teamChipTextActive : null,
                                                    ].filter(Boolean)}
                                                >
                                                    {team}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button
                                    title="Annuler"
                                    variant="outline"
                                    onPress={() => {
                                        loadProfile();
                                        setIsEditing(false);
                                    }}
                                    style={styles.button}
                                />
                                <Button
                                    title="Enregistrer"
                                    onPress={handleSave}
                                    style={styles.button}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>
                                {profile.prenom} {profile.nom}
                            </Text>
                            {profile.pays && (
                                <Text style={styles.infoText}>📍 {profile.pays}</Text>
                            )}
                            {profile.equipe && (
                                <View style={styles.teamBadge}>
                                    <Text style={styles.teamBadgeText}>⚽ {profile.equipe}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </Card>

                <Text style={styles.sectionTitle}>
                    Mes Matchs Favoris ({favoriteMatches.length})
                </Text>

                {loadingFavorites ? (
                    <Card>
                        <View style={styles.favoritesLoading}>
                            <ActivityIndicator color={colors.primary.green} />
                            <Text style={styles.favoritesLoadingText}>Chargement des favoris...</Text>
                        </View>
                    </Card>
                ) : favoritesError ? (
                    <Card>
                        <Text style={styles.favoritesErrorText}>{favoritesError}</Text>
                    </Card>
                ) : favoriteMatches.length > 0 ? (
                    favoriteMatches.map((match) => (
                        <Card key={match.id} style={styles.matchCard}>
                            <View style={styles.matchRow}>
                                <Text style={styles.matchTeams}>
                                    {match.equipe1} vs {match.equipe2}
                                </Text>
                            </View>
                            <Text style={styles.matchInfo}>
                                📍 {match.ville} • {new Date(match.date).toLocaleDateString('fr-FR')}
                            </Text>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <Text style={styles.emptyText}>
                            Aucun match favori. Ajoutez des matchs depuis la page Matchs!
                        </Text>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    editButton: {
        fontSize: typography.fontSize.xl,
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    avatarContainer: {
        marginBottom: spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: typography.fontSize['4xl'],
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    profileInfo: {
        alignItems: 'center',
        width: '100%',
    },
    name: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginBottom: spacing.sm,
    },
    infoText: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray600,
        marginBottom: spacing.xs,
    },
    teamBadge: {
        backgroundColor: colors.primary.green,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        marginTop: spacing.sm,
    },
    teamBadgeText: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: 'bold',
        color: colors.neutral.gray700,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.neutral.gray100,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray900,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    teamChips: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    teamChip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    teamChipActive: {
        backgroundColor: colors.primary.green,
        borderColor: colors.primary.green,
    },
    teamChipText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: 'bold',
    },
    teamChipTextActive: {
        color: colors.neutral.white,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    button: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginBottom: spacing.md,
    },
    matchCard: {
        marginBottom: spacing.sm,
    },
    matchRow: {
        marginBottom: spacing.xs,
    },
    matchTeams: {
        fontSize: typography.fontSize.base,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    matchInfo: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
    },
    emptyText: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray500,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    favoritesLoading: {
        alignItems: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.sm,
    },
    favoritesLoadingText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    favoritesErrorText: {
        fontSize: typography.fontSize.sm,
        color: colors.error,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileScreen;
