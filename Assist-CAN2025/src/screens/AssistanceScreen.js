import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { colors, spacing, typography } from '../styles/theme';
import emergencyData from '../data/emergencyContacts.json';

const AssistanceScreen = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <Header title="Assistance & Sécurité" subtitle="Informations utiles" />

            <ScrollView style={styles.content}>
                {/* Emergency Numbers */}
                <Text style={styles.sectionTitle}>🚨 Numéros d'Urgence</Text>
                <Card style={styles.emergencyCard}>
                    {Object.entries(emergencyData.urgence).map(([key, number]) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.emergencyRow}
                            onPress={() => handleCall(number)}
                        >
                            <View style={styles.emergencyInfo}>
                                <Text style={styles.emergencyLabel}>
                                    {key.replace(/_/g, ' ').toUpperCase()}
                                </Text>
                                <Text style={styles.emergencyNumber}>{number}</Text>
                            </View>
                            <Text style={styles.callIcon}>📞</Text>
                        </TouchableOpacity>
                    ))}
                </Card>

                {/* Embassies */}
                <Text style={styles.sectionTitle}>🏛️ Ambassades</Text>
                {emergencyData.ambassades.map((ambassade, index) => (
                    <Card key={index} style={styles.ambassadeCard}>
                        <View style={styles.ambassadeHeader}>
                            <Text style={styles.ambassadePays}>{ambassade.pays}</Text>
                            <Text style={styles.ambassadeVille}>{ambassade.ville}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.phoneButton}
                            onPress={() => handleCall(ambassade.telephone)}
                        >
                            <Text style={styles.phoneButtonText}>
                                📞 {ambassade.telephone}
                            </Text>
                        </TouchableOpacity>
                    </Card>
                ))}

                {/* Safety Tips */}
                <Text style={styles.sectionTitle}>🛡️ Conseils de Sécurité</Text>
                <Card>
                    {emergencyData.conseilsSecurite.map((conseil, index) => (
                        <View key={index} style={styles.tipRow}>
                            <Text style={styles.tipBullet}>•</Text>
                            <Text style={styles.tipText}>{conseil}</Text>
                        </View>
                    ))}
                </Card>

                {/* Stadium Rules */}
                <Text style={styles.sectionTitle}>🏟️ Règles des Stades</Text>
                <Card>
                    {emergencyData.reglesStades.map((regle, index) => (
                        <View key={index} style={styles.ruleRow}>
                            <Text style={styles.ruleBullet}>✓</Text>
                            <Text style={styles.ruleText}>{regle}</Text>
                        </View>
                    ))}
                </Card>

                {/* FAQ */}
                <Text style={styles.sectionTitle}>❓ Questions Fréquentes</Text>
                {emergencyData.faq.map((item, index) => (
                    <Card key={index} style={styles.faqCard}>
                        <TouchableOpacity
                            style={styles.faqHeader}
                            onPress={() => toggleFaq(index)}
                        >
                            <Text style={styles.faqQuestion}>{item.question}</Text>
                            <Text style={styles.faqIcon}>
                                {expandedFaq === index ? '▼' : '▶'}
                            </Text>
                        </TouchableOpacity>
                        {expandedFaq === index && (
                            <Text style={styles.faqAnswer}>{item.reponse}</Text>
                        )}
                    </Card>
                ))}

                {/* Useful Information */}
                <Text style={styles.sectionTitle}>ℹ️ Informations Utiles</Text>
                <Card>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Fuseau horaire</Text>
                        <Text style={styles.infoValue}>
                            {emergencyData.informationsUtiles.decalageHoraire}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Voltage</Text>
                        <Text style={styles.infoValue}>
                            {emergencyData.informationsUtiles.voltage}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Pourboire</Text>
                        <Text style={styles.infoValue}>
                            {emergencyData.informationsUtiles.pourboire}
                        </Text>
                    </View>
                </Card>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        En cas d'urgence, contactez immédiatement les services d'urgence
                        locaux ou votre ambassade.
                    </Text>
                </View>
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
    sectionTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    emergencyCard: {
        backgroundColor: colors.error,
        padding: spacing.md,
    },
    emergencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    emergencyInfo: {
        flex: 1,
    },
    emergencyLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.white,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    emergencyNumber: {
        fontSize: typography.fontSize.xl,
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    callIcon: {
        fontSize: typography.fontSize['2xl'],
    },
    ambassadeCard: {
        marginBottom: spacing.sm,
    },
    ambassadeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    ambassadePays: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: colors.neutral.gray900,
    },
    ambassadeVille: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
    },
    phoneButton: {
        backgroundColor: colors.primary.green,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    phoneButtonText: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.white,
        fontWeight: '600',
    },
    tipRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    tipBullet: {
        fontSize: typography.fontSize.lg,
        color: colors.primary.green,
        marginRight: spacing.sm,
        fontWeight: 'bold',
    },
    tipText: {
        flex: 1,
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray700,
        lineHeight: typography.fontSize.base * 1.5,
    },
    ruleRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    ruleBullet: {
        fontSize: typography.fontSize.base,
        color: colors.success,
        marginRight: spacing.sm,
        fontWeight: 'bold',
    },
    ruleText: {
        flex: 1,
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray700,
        lineHeight: typography.fontSize.base * 1.5,
    },
    faqCard: {
        marginBottom: spacing.sm,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: typography.fontSize.base,
        fontWeight: '600',
        color: colors.neutral.gray900,
    },
    faqIcon: {
        fontSize: typography.fontSize.sm,
        color: colors.primary.green,
        marginLeft: spacing.sm,
    },
    faqAnswer: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        lineHeight: typography.fontSize.sm * 1.6,
        marginTop: spacing.sm,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.gray200,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral.gray200,
    },
    infoLabel: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray700,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: typography.fontSize.base,
        color: colors.neutral.gray900,
    },
    footer: {
        marginTop: spacing.xl,
        marginBottom: spacing['2xl'],
        padding: spacing.md,
        backgroundColor: colors.neutral.gray100,
        borderRadius: 8,
    },
    footerText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        textAlign: 'center',
        lineHeight: typography.fontSize.sm * 1.5,
    },
});

export default AssistanceScreen;
