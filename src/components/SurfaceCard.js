import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';  // Assuming you are using react-native-paper for Surface
import PropTypes from 'prop-types';

const SurfaceCard = ({ backgroundColor, elevation, iconSource, title, subtitle, mainValue, mainUnit, lastMonthValue, lastMonthUnit }) => {

    return (
        <Surface style={[styles.surface, { backgroundColor, elevation }]} elevation={elevation}>
            <Image source={iconSource} style={styles.icon} />
            <View style={styles.content}>
                <View style={styles.centered}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.mainValue}>{mainValue}</Text>
                    {mainUnit ? <Text style={styles.mainUnit}>{mainUnit}</Text> : null}
                </View>
                <View style={styles.centered}>
                    <Text style={styles.subtitle}>Last Month</Text>
                    <View style={styles.row}>
                        <Text style={styles.lastMonthValue}>{lastMonthValue}</Text>
                        {lastMonthUnit ? <Text style={styles.lastMonthUnit}>{lastMonthUnit}</Text> : null}
                    </View>
                </View>
            </View>
        </Surface>
    );
};

SurfaceCard.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    elevation: PropTypes.number,
    iconSource: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    mainValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    mainUnit: PropTypes.string,
    lastMonthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    lastMonthUnit: PropTypes.string,
};

const styles = StyleSheet.create({
    surface: {
        flex: 0.47,
        borderRadius: 10,
        padding: 8,
        height: 158
    },
    icon: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    centered: {
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
    title: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "poppins",
        textAlign: "center",
        fontWeight: "500",
    },
    subtitle: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "poppins",
    },
    mainValue: {
        color: "#fff",
        fontSize: 32,
        fontFamily: "poppins",
        fontWeight: "500",
    },
    mainUnit: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppins",
        fontWeight: "500",
    },
    lastMonthValue: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppins",
        fontWeight: "500",
    },
    lastMonthUnit: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "poppins",
        fontWeight: "500",
    },
});

export default SurfaceCard;
