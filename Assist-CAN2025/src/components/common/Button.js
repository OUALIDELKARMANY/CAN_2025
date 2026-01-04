import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}) => {
    const buttonStyles = [
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        disabled && styles.button_disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        disabled && styles.text_disabled,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? colors.neutral.white : colors.primary.green} />
            ) : (
                <>
                    {icon && icon}
                    <Text style={textStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
    },

    // Variants
    button_primary: {
        backgroundColor: colors.primary.green,
    },
    button_secondary: {
        backgroundColor: colors.neutral.white,
        borderWidth: 2,
        borderColor: colors.primary.green,
    },
    button_accent: {
        backgroundColor: colors.accent.gold,
    },
    button_danger: {
        backgroundColor: colors.error,
    },
    button_outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary.green,
    },

    // Sizes
    button_small: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
    },
    button_medium: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    button_large: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },

    // Disabled
    button_disabled: {
        opacity: 0.5,
    },

    // Text styles
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
    text_primary: {
        color: colors.neutral.white,
    },
    text_secondary: {
        color: colors.primary.green,
    },
    text_accent: {
        color: colors.neutral.gray900,
    },
    text_danger: {
        color: colors.neutral.white,
    },
    text_outline: {
        color: colors.primary.green,
    },
    text_small: {
        fontSize: typography.fontSize.sm,
    },
    text_medium: {
        fontSize: typography.fontSize.base,
    },
    text_large: {
        fontSize: typography.fontSize.lg,
    },
    text_disabled: {
        opacity: 0.7,
    },
});

export default Button;
