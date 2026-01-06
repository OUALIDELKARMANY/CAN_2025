import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

// Header = en-tête réutilisable pour les écrans.
// Props:
// - title: titre principal
// - subtitle: sous-titre optionnel
// - onBackPress: si fourni, affiche un bouton "retour" et appelle la fonction
// - rightComponent: composant optionnel à droite (ex: bouton éditer)
const Header = ({ title, subtitle, onBackPress, rightComponent }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Bouton retour optionnel */}
                {onBackPress && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                )}

                {/* Zone titres */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>

                {/* Composant à droite optionnel */}
                {rightComponent && (
                    <View style={styles.rightComponent}>{rightComponent}</View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8B1538',
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.md,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: spacing.sm,
        marginRight: spacing.sm,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
    },
    backIcon: {
        fontSize: typography.fontSize.xl,
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.white,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.8)',
        marginTop: spacing.xs,
    },
    rightComponent: {
        marginLeft: spacing.sm,
    },
});

export default Header;
