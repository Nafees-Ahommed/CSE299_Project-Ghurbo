import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser,useAuth } from '@clerk/clerk-react';
import {toast} from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || '৳';
    const navigate = useNavigate();
    const { user } = useUser();
    const {getToken} = useAuth();

    const[isOwner, setIsOwner] = useState(false);
    const[showPackageReg, setShowPackageReg] = useState(false);
    const[searchedCities, setSearchedCities] = useState([]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user', {headers: { Authorization: `Bearer ${await getToken()}` }})
            if (data.success){
                setIsOwner(data.role === "packageOwner");
                setSearchedCities(data.recentSearchedCities);
            }else {
                // Retry fetching the user details after a short delay
                setTimeout(() => {
                    fetchUser();
                }, 2000); // Retry after 2 seconds
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if (user) {
            fetchUser();
        }
    }, [user]);

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
        setSearchedCities
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

