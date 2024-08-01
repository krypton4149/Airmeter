import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon, ExitIcon } from '../../assets/icons';
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';

const Notification = ({ navigation }) => {

    const [isAll, setIsAll] = useState(true); // true for "All", false for "Unread"

    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeArea}>
                <AppHeader title="Notification" showDrawerIcon={false} />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.contentContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.boxContainer}>
                                <TouchableOpacity
                                    style={[styles.allBox, isAll ? styles.boxOn : styles.boxOff]}
                                    onPress={() => setIsAll(true)}
                                >
                                    <Text style={isAll ? styles.boxTextOn : styles.boxTextOff}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.unreadBox, !isAll ? styles.boxOn : styles.boxOff]}
                                    onPress={() => setIsAll(false)}
                                >
                                    <Text style={!isAll ? styles.boxTextOn : styles.boxTextOff}>Unread</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.contentSection}>
                            {isAll ? (
                                <View>
                                    <View style={styles.innerContent}>
                                        <Image source={CheckIcon} style={styles.itemImage3} />
                                        <View>
                                            <Text style={styles.uppertext}>Tenancy agreement started</Text>
                                            <Text style={styles.lowertext}>Lorem Ipsum is simply dummy text of the {'\n'}printing and typesetting industry.</Text>
                                        </View>
                                    </View>
                                    <View style={styles.innerContent}>
                                        <Image source={CheckIcon} style={styles.itemImage3} />
                                        <View style={styles.textDotContainer}>
                                            <View>
                                                <Text style={styles.uppertext}>Device successfully added </Text>
                                                <Text style={styles.lowertext}>Lorem Ipsum is simply dummy text of the {'\n'}printing and typesetting industry.</Text>
                                            </View>
                                            <View style={styles.dot} />
                                        </View>
                                    </View>
                                    <View style={styles.innerContent}>
                                        <Image source={ExitIcon} style={styles.itemImage3} />
                                        <View style={styles.textDotContainer}>
                                            <View>
                                                <Text style={styles.uppertext}>Tenancy cancelled</Text>
                                                <Text style={styles.lowertext}>Lorem Ipsum is simply dummy text of the {'\n'}printing and typesetting industry.</Text>
                                            </View>
                                            <View style={styles.dot} />
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <View style={styles.innerContent}>
                                        <Image source={CheckIcon} style={styles.itemImage3} />
                                        <View style={styles.textDotContainer}>
                                            <View>
                                                <Text style={styles.uppertext}>Device successfully added </Text>
                                                <Text style={styles.lowertext}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            </View>
                                            <View style={styles.dot} />
                                        </View>
                                    </View>
                                    <View style={styles.innerContent}>
                                        <Image source={ExitIcon} style={styles.itemImage3} />
                                        <View style={styles.textDotContainer}>
                                            <View>
                                                <Text style={styles.uppertext}>Tenancy cancelled </Text>
                                                <Text style={styles.lowertext}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            </View>
                                            <View style={styles.dot} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearBackground>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    textContainer: {
        marginTop: 16,
    },
    boxContainer: {
        flexDirection: 'row',
        height: 31,
        gap: 10,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    allBox: {
        width: 78,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    unreadBox: {
        width: 112,
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    boxOn: {
        backgroundColor: '#2E3C9E',
    },
    boxOff: {
        borderColor: 'lightgrey',
        borderWidth: 1,
    },
    boxTextOn: {
        color: 'white',
        fontSize: 14,
    },
    boxTextOff: {
        color: 'grey',
        fontSize: 14,
    },
    contentSection: {
        flex: 1,
        marginTop: 20,
    },
    innerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'lightgrey',
        padding: 16,
        marginBottom: 10,
    },
    textDotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    uppertext: {
        fontSize: 16,
        color: 'black',
    },
    lowertext: {
        marginTop: 8,
        fontSize: 14,
        color: 'grey',
    },
    itemImage3: {
        marginRight: 10,
        height: 32,
        width: 32
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2E3C9E',
    },
});

export default Notification;
