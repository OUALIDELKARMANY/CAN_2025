import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Card from '../common/Card';
import { colors, spacing, typography } from '../../styles/theme';

const MatchCard = ({ match, onPress, isFavorite, onToggleFavorite }) => {
    const matchDate = match?.date ? new Date(match.date) : null;
    const hasValidDate = matchDate instanceof Date && !Number.isNaN(matchDate.getTime());

    const formattedDate = hasValidDate
        ? matchDate.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        })
        : '';

    const formattedTime = hasValidDate
        ? (() => {
            const hh = String(matchDate.getHours()).padStart(2, '0');
            const mm = String(matchDate.getMinutes()).padStart(2, '0');
            return `${hh}h${mm}`;
        })()
        : '';

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.header}>
                <View style={styles.dateContainer}>
                    {formattedDate ? <Text style={styles.date}>{formattedDate}</Text> : null}
                    {formattedTime ? (
                        <View style={styles.timePill}>
                            <Text style={styles.time}>{formattedTime}</Text>
                            <Text style={styles.timeHint}>heure locale</Text>
                        </View>
                    ) : null}
                </View>

                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onToggleFavorite && onToggleFavorite(match.id);
                    }}
                    style={styles.favoriteButton}
                >
                    <Text style={styles.favoriteIcon}>{isFavorite ? '★' : '☆'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.matchInfo}>
                <View style={styles.team}>
                    {match.logo1 ? (
                        <Image source={{ uri: match.logo1 }} style={styles.logo} resizeMode="contain" />
                    ) : (
                        <Text style={styles.flag}>{match.drapeau1}</Text>
                    )}
                    <Text style={styles.teamName}>{match.equipe1}</Text>
                </View>

                <View style={styles.versus}>
                    <Text style={styles.vsText}>{match.score || 'VS'}</Text>
                </View>

                <View style={styles.team}>
                    {match.logo2 ? (
                        <Image source={{ uri: match.logo2 }} style={styles.logo} resizeMode="contain" />
                    ) : (
                        <Text style={styles.flag}>{match.drapeau2}</Text>
                    )}
                    <Text style={styles.teamName}>{match.equipe2}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.location}>{match.ville}</Text>
                </View>
                <View style={styles.phaseContainer}>
                    <Text style={styles.phase}>{match.phase}</Text>
                </View>
            </View>

            <Text style={styles.stadium}>{match.stade}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    date: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: '600',
    },
    time: {
        fontSize: typography.fontSize.sm,
        color: colors.primary.green,
        fontWeight: 'bold',
    },
    timePill: {
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 999,
        alignItems: 'center',
    },
    timeHint: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
        fontWeight: '600',
    },
    favoriteButton: {
        padding: spacing.xs,
    },
    favoriteIcon: {
        fontSize: typography.fontSize['2xl'],
        color: colors.accent.gold,
    },
    matchInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    team: {
        flex: 1,
        alignItems: 'center',
    },
    flag: {
        fontSize: typography.fontSize['3xl'],
        marginBottom: spacing.xs,
    },
    logo: {
        width: 44,
        height: 44,
        marginBottom: spacing.xs,
    },
    teamName: {
        fontSize: typography.fontSize.base,
        fontWeight: '600',
        color: colors.neutral.gray900,
        textAlign: 'center',
    },
    versus: {
        paddingHorizontal: spacing.md,
    },
    vsText: {
        fontSize: typography.fontSize.sm,
        fontWeight: 'bold',
        color: colors.neutral.gray400,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    locationIcon: {
        fontSize: typography.fontSize.base,
    },
    location: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    phaseContainer: {
        backgroundColor: colors.primary.green,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    phase: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.white,
        fontWeight: '600',
    },
    stadium: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
        fontStyle: 'italic',
    },
});

export default MatchCard;
