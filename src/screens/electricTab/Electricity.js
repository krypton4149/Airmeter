import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dollarCircle, electricCircle } from '../../assets/icons';
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';
import SurfaceCard from '../../components/SurfaceCard';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const Electricity = () => {

    let screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        // backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(00, 00, 00, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional,
        propsForBackgroundLines: {
            strokeDasharray: "" // solid background lines with no dashes
        }

    };

    const data = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                data: [3.0, 3.5, 6.5, 4.0, 3.5, 4.0, 5.0],
                color: (opacity = 1) => `#3d52f1`, // optional
                strokeWidth: 2 // optional
            }
        ],
        // legend: ["Monthly"] // optional
    };

    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeAreaView}>
                <AppHeader
                    title="Electricity Consumption"
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
                    <View style={styles.body}>
                        <SurfaceCard
                            backgroundColor="#2E3C9E"
                            elevation={4}
                            iconSource={electricCircle}
                            title="Electricity Consumption"
                            subtitle="April"
                            mainValue="45"
                            mainUnit="kWh"
                            lastMonthValue="35"
                            lastMonthUnit="kWh"
                        />
                        <SurfaceCard
                            backgroundColor="#BE17E7"
                            elevation={4}
                            iconSource={dollarCircle}
                            title="Amount Due"
                            subtitle="April"
                            mainValue="$25.65"
                            lastMonthValue="$22.20"
                        />
                    </View>
                    <View style={{ paddingHorizontal: 16, marginTop: 16, backgroundColor: "#fff" }}>
                        <Text style={styles.headerTitle}>Monthly</Text>
                        <LineChart
                            data={data}
                            width={screenWidth - 32}
                            height={256}
                            verticalLabelRotation={30}
                            chartConfig={chartConfig}
                            bezier
                            renderDotContent={({ x, y, indexData }) => (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: y,
                                        left: x - 8,
                                    }}>
                                    <Text style={{ fontSize: 16 }}>
                                        {indexData}
                                    </Text>
                                </View>
                            )}
                            withHorizontalLabels={false}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 16, marginTop: 16, backgroundColor: "#fff" }}>
                        <Text style={styles.headerTitle}>Annual</Text>
                        <LineChart
                            data={data}
                            width={screenWidth - 32}
                            height={256}
                            verticalLabelRotation={30}
                            chartConfig={chartConfig}
                            bezier
                            renderDotContent={({ x, y, indexData }) => (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: y,
                                        left: x - 8,
                                    }}>
                                    <Text style={{ fontSize: 16 }}>
                                        {indexData}
                                    </Text>
                                </View>
                            )}
                            withHorizontalLabels={false}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView >
        </LinearBackground >
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    body: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 24,
    },
});

export default Electricity;
