import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || '৳';
    const navigate = useNavigate();
    const { user, isLoaded } = useUser(); // Use isLoaded if available
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showPackageReg, setShowPackageReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [tours, setTours] = useState([]);

    // New: Loading & Retry logic for user fetch
    const [userLoading, setUserLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 5;

    const fetchTours = async () => {
        try {
            const { data } = await axios.get('/api/tours');
            if (data.success) {
                setTours(data.tours);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchUser = async () => {
        if (retryCount >= MAX_RETRIES) {
            toast.error("Unable to fetch user after multiple attempts.");
            setUserLoading(false);
            return;
        }
        try {
            setUserLoading(true);
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) {
                setIsOwner(data.role === "packageOwner");
                setSearchedCities(data.recentSearchedCities);
                setUserLoading(false);
            } else {
                // Retry fetching after 2s, increment retryCount
                setRetryCount(count => count + 1);
                setTimeout(fetchUser, 2000);
            }
        } catch (error) {
            setRetryCount(count => count + 1);
            toast.error(error.message);
            setUserLoading(false);
        }
    };

    // Use isLoaded from Clerk if available, else fallback to user
    useEffect(() => {
        if ((typeof isLoaded === "undefined" && user) || (isLoaded && user)) {
            setRetryCount(0); // reset on new user
            fetchUser();
        }
    }, [isLoaded, user]);

    useEffect(() => {
        fetchTours();
    }, []);

    const value = {
        currency,
        user,
        isOwner,
        setIsOwner,
        axios,
        showPackageReg,
        setShowPackageReg,
        navigate,
        getToken,
        searchedCities,
        setSearchedCities,
        tours,
        setTours,
        userLoading, // Expose for UI/logic gating
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
