import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dollarCircle, electricCircle } from '../../assets/icons';
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { ViewIcon, PayNowIcon } from "../../assets/icons"; // Assuming you have these icons for the buttons

const Payment = () => {
    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeAreaView}>
                <AppHeader title="Payment" />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.SurfaceCards}>
                        <SurfaceCard
                            backgroundColor="#2E3C9E"
                            elevation={4}
                            iconSource={electricCircle}
                            title="Rent"
                            subtitle="April"
                            mainValue="$45"
                        />
                        <SurfaceCard
                            backgroundColor="#BE17E7"
                            elevation={4}
                            iconSource={dollarCircle}
                            title="Electricity"
                            subtitle="April"
                            mainValue="$25.65"
                            lastMonthValue="$22.20"
                        />
                    </View>
                    <View>
                        <Text style={styles.billInformation}>Billing Information</Text>
                        <View style={styles.whiteContainers}>
                            <View style={styles.whiteContainer}>
                                <Text style={styles.whiteContainerText}>Billing Month{'\n'}<Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', textAlign: "center" }}>March</Text></Text>
                            </View>
                            <View style={styles.whiteContainer}>
                                <Text style={styles.whiteContainerText}>Billing Day{'\n'}<Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', textAlign: "center" }}> 31</Text></Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.billInformation}>Recent Bills</Text>
                    <View style={styles.BillsContainers}>
                        <View style={styles.BillContainer}>
                            <View style={styles.row}>
                                <Text style={styles.BillContainerText}>
                                    $89.55{'\n'}
                                    <Text style={styles.subText}>Amount Due</Text>
                                </Text>
                                <TouchableOpacity style={[styles.payNowButton, styles.button]}>
                                    <Image source={PayNowIcon} resizeMode='contain' style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Pay Now</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.BillContainerText}>
                                    04-15-2024{'\n'}
                                    <Text style={styles.subText}>Due Date</Text>
                                </Text>
                                <TouchableOpacity style={[styles.viewBillButton, styles.button]}>
                                    <Image source={ViewIcon} resizeMode='contain' style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>View Bill</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Duplicate for additional bills */}
                    </View>
                    <Text style={styles.TariffInformation}>Tariff</Text>
                    <View style={styles.TariffContainers}>
                        <Text style={styles.tariffText}>
                            Your Electricity Tariff Rate{'\n'}
                            <Text style={styles.tariffValue}>$0.04 per kWh</Text>
                        </Text>
                        <Text style={styles.tariffText}>
                            Typical Electricity Tariff Rate{'\n'}
                            <Text style={styles.tariffValue}>$0.041 per kWh</Text>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearBackground>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 64
    },
    SurfaceCards: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    billInformation: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 24,
    },
    whiteContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginTop: 8
    },
    whiteContainer: {
        flex: 0.5,
        height: 71,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteContainerText: {
        fontSize: 14,
        textAlign: 'center',
    },
    BillsContainers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    BillContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        justifyContent: 'center',
        gap: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    BillContainerText: {
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
    },
    subText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        color: 'gray',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    payNowButton: {
        backgroundColor: '#2E3C9E',
    },
    viewBillButton: {
        backgroundColor: '#BE17E7',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 8,
    },
    buttonIcon: {
        width: 17,
        height: 22,
    },
    TariffInformation: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 24,
    },
    TariffContainers: {
        height: 172,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    tariffText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: 'gray',
    },
    tariffValue: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'black',
        textAlign: "center"
    }
});

export default Payment;
