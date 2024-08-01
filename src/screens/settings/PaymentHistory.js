import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ViewIcon } from "../../assets/icons"; // Update the path and import as per your project structure
import AppHeader from "../../components/AppHeader";
import LinearBackground from "../../components/LinearBackground";

const PaymentHistory = ({ navigation }) => {

  const [selectedYear, setSelectedYear] = useState(null);


  const handleYearPress = (year) => {
    setSelectedYear(year);
    // Additional logic if needed on year selection
  };

  const handleViewBill = () => {
    // Replace with your actual PDF URL or logic to open PDF
    const pdfUrl = "https://example.com/your-pdf-url.pdf";
    Linking.openURL(pdfUrl);
  };

  return (
    <LinearBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader title="Payment History" showDrawerIcon={false} showNotificationIcon={false} />
          {/* Year selection */}
          <Text style={styles.selectYearText}>Select Year</Text>
          <View style={styles.yearContainer}>
            {[2024, 2023, 2022, 2021, 2020].map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearItem,
                  selectedYear === year && styles.selectedYearItem,
                ]}
                onPress={() => handleYearPress(year)}
              >
                <Text
                  style={[
                    styles.yearText,
                    selectedYear === year && styles.selectedYearText,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Centered container group */}
          <View style={styles.containerGroup}>
            {/* White container with text overlay */}
            <View style={styles.whiteContainer}>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayText}>$69.5</Text>
                <Text style={styles.paymentText}>Last Payment Amount</Text>
              </View>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayDateText}>03-15-2024</Text>
                <Text style={styles.paymentText}>Last Payment Date</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBillButton}
                onPress={handleViewBill}
              >
                <View style={styles.buttonContent}>
                  <Image source={ViewIcon} style={styles.buttonIcon} />
                  <Text style={styles.viewBillButtonText}>View Bill</Text>
                </View>
              </TouchableOpacity>
            </View>


            {/* Repeat this block for additional white containers */}
            <View style={styles.whiteContainer}>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayDateText}>$106.95</Text>
                <Text style={styles.paymentText}> Payment Amount</Text>
              </View>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayDateText}>02-13-2024</Text>
                <Text style={styles.paymentText}>Payment Date</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBillButton}
                onPress={handleViewBill}
              >
                <View style={styles.buttonContent}>
                  <Image source={ViewIcon} style={styles.buttonIcon} />
                  <Text style={styles.viewBillButtonText}>View Bill</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.whiteContainer}>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayDateText}>$106.95</Text>
                <Text style={styles.paymentText}>Payment Amount</Text>
              </View>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayDateText}>01-10-2024</Text>
                <Text style={styles.paymentText}>Payment Date</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBillButton}
                onPress={handleViewBill}
              >
                <View style={styles.buttonContent}>
                  <Image source={ViewIcon} style={styles.buttonIcon} />
                  <Text style={styles.viewBillButtonText}>View Bill</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  selectYearText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    marginTop: 20,
    marginLeft: 23,
  },
  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  yearItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    marginLeft: 8,
    borderColor: "#d2d1d1",
    borderRadius: 8,
  },
  yearText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "gray",
  },
  selectedYearItem: {
    backgroundColor: "#2E3C9E",
  },
  selectedYearText: {
    color: "white",
  },
  containerGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
  },
  whiteContainer: {
    height: 70, // Adjust height as needed based on content
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 9,
    width: '100%'
  },
  overlayContent: {
    flex: 0.4,
    flexDirection: "column",
    alignItems: "flex-start", // Align items to the start
    justifyContent: "center",
    paddingHorizontal: 8, // Add some padding for better spacing
  },
  overlayText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  overlayDateText: {
    fontSize: 15, // Adjusted font size to 14
    fontWeight: "500",
    color: "black", // Text color changed to black
    textAlign: "left", // Align text to the left
  },
  paymentText: {
    fontSize: 10,
    fontWeight: "500",
    color: "gray",
    textAlign: "left", // Align text to the left
  },
  viewBillButton: {
    backgroundColor: "#77838F",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 5,
  },
  viewBillButtonText: {
    color: "white",
    fontSize: 14, // Adjusted font size to 14
    fontWeight: "500",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: "white", // Adjust the icon color if needed
  },
});

export default PaymentHistory;
