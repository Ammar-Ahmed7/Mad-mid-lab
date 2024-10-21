import { useEffect,useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';


export const useFetchProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check network status
                const netInfo = await NetInfo.fetch();
                if (!netInfo.isConnected) {
                    setIsOffline(true);
                    // If offline, load data from AsyncStorage
                    const storedData = await AsyncStorage.getItem('products');
                    if (storedData) {
                        setData(JSON.parse(storedData));
                    }
                    setLoading(false);
                    return;
                }

                // If online, fetch from API
                const response = await fetch('https://simple-grocery-store-api.online/products');
                const result = await response.json();

                // Store data in AsyncStorage for offline access
                await AsyncStorage.setItem('products', JSON.stringify(result));
                setData(result);

            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error, isOffline };
};