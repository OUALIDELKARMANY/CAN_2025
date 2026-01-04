import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/common/Header';
import StadiumCard from '../components/stadiums/StadiumCard';
import { colors, spacing, typography, borderRadius } from '../styles/theme';
import stadiumsData from '../data/stadiums.json';

const StadiumsScreen = () => {
    const [stadiums] = useState(stadiumsData.stadiums);
    const [selectedCity, setSelectedCity] = useState('Toutes');

    const cities = ['Toutes', ...new Set(stadiums.map(s => s.ville))];

    const filteredStadiums = selectedCity === 'Toutes'
        ? stadiums
        : stadiums.filter(s => s.ville === selectedCity);

    const renderCityFilter = () => (
        <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Filtrer par ville</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterChips}>
                    {cities.map((city) => (
                        <TouchableOpacity
                            key={city}
                            style={[
                                styles.filterChip,
                                selectedCity === city && styles.filterChipActive,
                            ]}
                            onPress={() => setSelectedCity(city)}
                        >
                            <Text
                                style={[
                                    styles.filterChipText,
                                    selectedCity === city && styles.filterChipTextActive,
                                ]}
                            >
                                {city}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header
                title="Stades CAN 2025"
                subtitle={`${filteredStadiums.length} stade${filteredStadiums.length > 1 ? 's' : ''}`}
            />

            {renderCityFilter()}

            <FlatList
                data={filteredStadiums}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <StadiumCard stadium={item} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    filterSection: {
        paddingVertical: spacing.md,
    },
    filterLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: '600',
        color: colors.neutral.gray700,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    filterChips: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    filterChip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral.gray100,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    filterChipActive: {
        backgroundColor: colors.primary.green,
        borderColor: colors.primary.green,
    },
    filterChipText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    filterChipTextActive: {
        color: colors.neutral.white,
    },
    listContent: {
        paddingVertical: spacing.md,
    },
});

export default StadiumsScreen;
