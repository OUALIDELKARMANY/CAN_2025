import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const Header = ({ title, subtitle, onBackPress, rightComponent }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {onBackPress && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>

                {rightComponent && (
                    <View style={styles.rightComponent}>{rightComponent}</View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary.green,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.md,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: spacing.sm,
        marginRight: spacing.sm,
    },
    backIcon: {
        fontSize: typography.fontSize['2xl'],
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: 'bold',
        color: colors.neutral.white,
    },
    subtitle: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.white,
        opacity: 0.9,
        marginTop: spacing.xs,
    },
    rightComponent: {
        marginLeft: spacing.sm,
    },
});

export default Header;
