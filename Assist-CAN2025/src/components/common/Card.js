import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../styles/theme';

const Card = ({ children, onPress, style, elevated = true }) => {
    const cardStyle = [
        styles.card,
        elevated && shadows.lg,
        style,
    ];

    if (onPress) {
        return (
            <Pressable
                style={({ pressed }) => [
                    ...cardStyle,
                    pressed && styles.pressed,
                ]}
                onPress={onPress}
            >
                {children}
            </Pressable>
        );
    }

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
