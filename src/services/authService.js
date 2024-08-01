import { Alert } from "react-native";
import urlConstants from "../constants/urlConstants";
import useAPI from "../utils/useAPI";

const authService = () => {
    const { secureAPI, publicAPI } = useAPI();

    const login = async (idToken) => {
        try {
            const response = await publicAPI.post(urlConstants.login, { idToken });
            return response.data;
        } catch (error) {
            console.log("Error Login", error);
            throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const signup = async (username, password) => {
        try {
            const response = await publicAPI.post('/signup', { username, password });
            return response.data;
        } catch (error) {
            throw new Error('Signup failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const signIn = async (token) => {
        try {
            const response = await secureAPI.get('/sign-in', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Sign-in failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const setUserType = async (id, userTypeId) => {
        try {
            const response = await publicAPI.post(urlConstants.userUpdate, { id, userTypeId });
            return response.data;
        } catch (error) {
            console.log("Error updating user type", error);
            throw new Error('User type update failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const uploadProfilePicture = async (profilePicData) => {
        try {
            const response = await secureAPI.post(urlConstants.profilePicture, profilePicData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Profile picture upload failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const addTenant = async (tenantData) => {
        try {
            const response = await secureAPI.post('/add-tanent', tenantData);
            console.log('add tenant--->',response);
            return response.data;
            
        } catch (error) {
            console.log("Error adding tenant", error);
            throw new Error('Add tenant failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const getTenant = async (landlordId) => {
        try {
            const response = await secureAPI.post('/get-tanent', { landlord_id: landlordId });
            // Check the structure of the response
        console.log('API Response:', response.data);
            // Extract tenants from response
            const tenants = response.data.data.map((tenant) => `${tenant.first_name} ${tenant.last_name}`);

            console.log('Tenants:', tenants);

            return tenants;
            
        } catch (error) {
            console.log("Error getting tenant", error);
            throw new Error('getting tenant failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return { login, signup, signIn, setUserType, uploadProfilePicture, addTenant, getTenant };
};

export default authService;
