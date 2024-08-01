import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import AppHeader from "../../components/AppHeader";
import LinearBackground from "../../components/LinearBackground";
import {
  dropIcon,
  nextIcon,
  plusIcon,
  CheckIcon,
  ExitIcon,
} from "../../assets/icons"; // Ensure paths are correct
import authService from "../../services/authService"; // Import authService

const SelectTenancy = ({ navigation }) => {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newTenant, setNewTenant] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Initialize tenants list as empty
  const [tenants, setTenants] = useState([]);
  const { addTenant, getTenant } = authService(); // Use the custom hook

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const landlordId = "2"; // Replace with actual landlord ID
        const tenantsList = await getTenant(landlordId);
        setTenants(tenantsList);
      } catch (error) {
        console.error("Error fetching tenants:", error.message);
        Alert.alert("Error", "Failed to fetch tenants.");
      }
    };

    fetchTenants();
  }, []);

  console.log("tenant list-->", tenants);

  useEffect(() => {
    console.log("Updated tenantName:", tenantName); // Debug log
  }, [tenantName]);

  useEffect(() => {
    console.log("Tenants fetched:", tenants);
  }, [tenants]);

  const handleSelectPress = () => {
    console.log("Selected Tenant:", selectedTenant);
  };

  const handleExitPress = () => {
    navigation.goBack(); // Example action
  };

  const handleAddTenantPress = () => {
    setPopupVisible(true); // Show the popup
  };

  const handlePopupClose = () => {
    setPopupVisible(false); // Hide the popup
  };

  const handleInputChange = (name, value) => {
    setNewTenant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveTenant = async () => {
    try {
      // Replace 'landlord_id' with the actual ID if it's coming from user context or other sources
      const landlordId = "2"; // Replace this with actual landlord ID from context or state
const tenantId= "3";
      // Call the addTenant API with the correct request body
      const response = await addTenant({
        email: newTenant.email,
        first_name: newTenant.firstName,
        last_name: newTenant.lastName,
        landlord_id: landlordId,
        user_type_id: tenantId
      });

      const newTenantName = `${newTenant.firstName} ${newTenant.lastName}`;

      // Add the new tenant to the list
      setTenants((prevTenants) => [...prevTenants, newTenantName]);

      // Log the new tenant details
      console.log("New Tenant:", response);

      // Reset the form fields
      setNewTenant({
        firstName: "",
        lastName: "",
        email: "",
      });

      // Hide the popup after saving
      setPopupVisible(false);

      // Show success message
      Alert.alert("Success", "Tenant added successfully!");
    } catch (error) {
      // Log the error for debugging
      console.error(
        "Error adding tenant:",
        error.response ? error.response.data : error.message
      );

      // Show error message
      Alert.alert("Error", error.message || "Failed to add tenant.");
    }
  };

  const handleTenantPress = (tenant) => {
    console.log("Selected Tenant:", tenant); // Debug log
    setTenantName(tenant);
    setSelectedTenant(tenant);
    setDropdownVisible(false);
  };

  const handleOutsidePress = () => {
    if (isPopupVisible) {
      setPopupVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <LinearBackground>
          <SafeAreaView style={styles.safeArea}>
            <AppHeader
              title="Select Tenant"
              showDrawerIcon={false}
              showNotificationIcon={false}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <TouchableWithoutFeedback
                onPress={() => setDropdownVisible(false)}
              >
                <View style={styles.bodyContainer}>
                  <Text style={styles.bodyTitle}>Select Tenant</Text>
                  <View style={styles.tenantContainer}>
                    <Text style={styles.tenantText}>Add Tenants</Text>
                    <TouchableOpacity
                      onPress={handleAddTenantPress}
                      style={styles.addTenantButton}
                    >
                      <Image source={plusIcon} style={styles.addTenantIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.whiteContainer}>
                    <Text style={styles.instructionText}>
                      Please select the Tenant who you wish this room to be
                      allocated to
                    </Text>
                    <View style={styles.textInputContainer}>
                      <TouchableOpacity
                        style={styles.textInput}
                        onPress={() => setDropdownVisible(!isDropdownVisible)}
                      >
                        <Text style={styles.textInputText}>
                          {tenantName || "Select Tenant"}
                        </Text>
                        <Image source={dropIcon} style={styles.inputIcon} />
                      </TouchableOpacity>
                      {isDropdownVisible && (
                        <View style={styles.dropdownContainer}>
                          <ScrollView>
                            {tenants.map((tenant, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => handleTenantPress(tenant)}
                                style={styles.dropdownItem}
                              >
                                <Text style={styles.dropdownText}>{tenant}</Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                    <View style={styles.selectButtonContainer}>
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={handleSelectPress}
                      >
                        <Text style={styles.selectButtonText}>Next</Text>
                        <Image source={nextIcon} style={styles.buttonImage} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              {isPopupVisible && (
                <TouchableWithoutFeedback onPress={handlePopupClose}>
                  <View style={styles.popupContainer}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                      <View style={styles.popupContent}>
                        <Text style={styles.popupTitle}>Add Tenants</Text>
                        <View style={styles.borderLine} />
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>First Name</Text>
                          <TextInput
                            placeholder="Enter first name"
                            value={newTenant.firstName}
                            onChangeText={(text) =>
                              handleInputChange("firstName", text)
                            }
                            style={styles.popupInput}
                            placeholderTextColor="#ccc" // Gray placeholder text color
                          />
                        </View>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Last Name</Text>
                          <TextInput
                            placeholder="Enter last name"
                            value={newTenant.lastName}
                            onChangeText={(text) =>
                              handleInputChange("lastName", text)
                            }
                            style={styles.popupInput}
                            placeholderTextColor="#ccc" // Gray placeholder text color
                          />
                        </View>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Email</Text>
                          <TextInput
                            placeholder="Enter email"
                            value={newTenant.email}
                            onChangeText={(text) =>
                              handleInputChange("email", text)
                            }
                            style={styles.popupInput}
                            placeholderTextColor="#ccc" // Gray placeholder text color
                          />
                        </View>
                        <View style={styles.PopbuttonContainer}>
                          <TouchableOpacity
                            onPress={handleSaveTenant}
                            style={styles.saveButton}
                          >
                            <Text style={styles.saveButtonText}>Save</Text>
                            <Image
                              source={CheckIcon}
                              style={styles.buttonIcon}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={handlePopupClose}
                            style={styles.closeButton}
                          >
                            <Text style={styles.closeButtonText}>Close</Text>
                            <Image
                              source={ExitIcon}
                              style={styles.buttonIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </ScrollView>
          </SafeAreaView>
        </LinearBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%", // Ensure body container covers full width
    paddingHorizontal: 20, // Add horizontal padding if needed
  },
  bodyTitle: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#2E3C9E",
    marginBottom: 60,
    marginTop: 40,
    textAlign: "center",
  },
  tenantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addTenantButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#2E3C9E",
  },
  addTenantIcon: {
    width: 18,
    height: 21,
    resizeMode: "contain",
  },
  tenantText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  whiteContainer: {
    width: "100%", // Full width
    maxWidth: 340, // Max width if needed
    height: 408,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingTop: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  instructionText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#333",
    textAlign: "center",
    marginBottom: 20, // Space for text input
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    position: "relative", // Required for absolute positioning of the icon
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
  },
  textInputText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  inputIcon: {
    width: 10,
    height: 6,
    tintColor: "#888",
  },
  selectButtonContainer: {
    width: "100%",
    alignItems: "center",
    zIndex:10,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 140, // Space above the button
  },
  selectButtonText: {
    color: "#333",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginRight: 10,

  },
  buttonImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  dropdownContainer: {
    position: "absolute",
    top: 45, // Adjust this value if needed
    width: "100%",
    maxHeight: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    zIndex: 1000, // Ensure it appears above other elements
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
    zIndex:1000,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // Ensure it appears above other elements
  },
  popupContent: {
    width: 340,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  popupInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F8F8F8",
  },
  PopbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Adjusts the spacing between the buttons
    width: "100%",
    paddingHorizontal: 20, // Optional: add padding if needed
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10, // Space above the button
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10, // Space above the button
  },
  saveButtonText: {
    color: "#333",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginRight: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginRight: 10,
  },
  buttonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});

export default SelectTenancy;
