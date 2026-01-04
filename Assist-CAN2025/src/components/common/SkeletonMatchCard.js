import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import { colors, spacing, borderRadius } from '../../styles/theme';

const SkeletonMatchCard = ({ style }) => {
    return (
        <Card elevated={false} style={[styles.card, style]}>
            <View style={styles.header}>
                <View style={styles.pill} />
                <View style={styles.pillSmall} />
            </View>

            <View style={styles.teamsRow}>
                <View style={styles.team}>
                    <View style={styles.logo} />
                    <View style={styles.line} />
                </View>

                <View style={styles.vs} />

                <View style={styles.team}>
                    <View style={styles.logo} />
                    <View style={styles.line} />
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.pill} />
                <View style={styles.phasePill} />
            </View>

            <View style={styles.lineShort} />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: spacing.md,
        backgroundColor: colors.neutral.white,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    teamsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    team: {
        flex: 1,
        alignItems: 'center',
        gap: spacing.xs,
    },
    logo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.neutral.gray200,
    },
    vs: {
        width: 42,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.neutral.gray200,
        marginHorizontal: spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    pill: {
        width: 120,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.neutral.gray200,
    },
    pillSmall: {
        width: 34,
        height: 22,
        borderRadius: 11,
        backgroundColor: colors.neutral.gray200,
    },
    phasePill: {
        width: 72,
        height: 20,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral.gray200,
    },
    line: {
        width: 88,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.neutral.gray200,
    },
    lineShort: {
        width: 160,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.neutral.gray200,
        marginTop: spacing.sm,
    },
});

export default SkeletonMatchCard;
