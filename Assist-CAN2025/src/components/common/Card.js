import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';

// Card = conteneur UI réutilisable.
// - Si onPress est fourni, la carte devient cliquable (Pressable).
// - Si elevated=true, on applique une ombre (shadows.lg).
const Card = ({ children, onPress, style, elevated = true }) => {
    // Style final de la carte (styles de base + ombre optionnelle + style custom).
    // On filtre les valeurs falsy pour éviter l'erreur "expected dynamic type 'boolean'"
    const cardStyle = [
        styles.card,
        elevated ? shadows.lg : null,
        style,
    ].filter(Boolean);

    // Si onPress est défini, on renvoie un Pressable pour gérer l'appui.
    if (onPress) {
        return (
            <Pressable
                style={({ pressed }) => [
                    ...cardStyle,
                    pressed ? styles.pressed : null,
                ].filter(Boolean)}
                onPress={onPress}
            >
                {children}
            </Pressable>
        );
    }

    // Sinon, on renvoie une View simple (non interactive).
    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.neutral.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    pressed: {
        opacity: 0.92,
        transform: [{ scale: 0.99 }],
    },
});

export default Card;
