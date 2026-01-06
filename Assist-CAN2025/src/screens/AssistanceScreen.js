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

// AssistanceScreen = page "Assistance & Sécurité".
// Rôle:
// - afficher des numéros d'urgence
// - afficher des conseils, règles, FAQ
// - permettre d'appeler un numéro via Linking (tel:)
// Les données viennent de src/data/emergencyContacts.json.
const AssistanceScreen = () => {
    // expandedFaq: index de la question ouverte (accordéon), null => aucune ouverte.
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Lance un appel téléphonique via l'OS.
    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    // Ouvre/ferme une entrée FAQ.
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
        backgroundColor: '#F8F9FA',
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: '#8B1538',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        paddingBottom: spacing.sm,
        borderBottomWidth: 2,
        borderBottomColor: '#D4AF37',
    },
    emergencyCard: {
        backgroundColor: '#8B1538',
        padding: spacing.md,
        borderRadius: 16,
    },
    emergencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
    },
    emergencyInfo: {
        flex: 1,
    },
    emergencyLabel: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: 'bold',
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    emergencyNumber: {
        fontSize: typography.fontSize.xl,
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    callIcon: {
        fontSize: typography.fontSize.xl,
    },
    ambassadeCard: {
        marginBottom: spacing.sm,
        borderRadius: 16,
    },
    ambassadeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    ambassadePays: {
        fontSize: typography.fontSize.base,
        fontWeight: 'bold',
        color: colors.neutral.gray800,
    },
    ambassadeVille: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray500,
    },
    phoneButton: {
        backgroundColor: '#8B1538',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        alignItems: 'center',
    },
    phoneButtonText: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.white,
        fontWeight: 'bold',
    },
    tipRow: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        alignItems: 'flex-start',
    },
    tipBullet: {
        fontSize: typography.fontSize.base,
        color: '#D4AF37',
        marginRight: spacing.sm,
        fontWeight: 'bold',
    },
    tipText: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        lineHeight: 22,
    },
    ruleRow: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        alignItems: 'flex-start',
    },
    ruleBullet: {
        fontSize: typography.fontSize.sm,
        color: colors.success,
        marginRight: spacing.sm,
        fontWeight: 'bold',
    },
    ruleText: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray700,
        lineHeight: 22,
    },
    faqCard: {
        marginBottom: spacing.sm,
        borderRadius: 16,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        fontWeight: 'bold',
        color: colors.neutral.gray800,
    },
    faqIcon: {
        fontSize: typography.fontSize.sm,
        color: '#8B1538',
        marginLeft: spacing.sm,
    },
    faqAnswer: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        lineHeight: 22,
        marginTop: spacing.sm,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.gray100,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral.gray100,
    },
    infoLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray600,
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral.gray800,
    },
    footer: {
        marginTop: spacing.xl,
        marginBottom: spacing['2xl'],
        padding: spacing.lg,
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.neutral.gray200,
    },
    footerText: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral.gray600,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default AssistanceScreen;
