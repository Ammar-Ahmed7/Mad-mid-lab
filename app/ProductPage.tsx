import { View, Text, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function ProductPage() {
  const { id, source, name, category, inStock } = useLocalSearchParams(); // Data from params
  const [productData, setProductData] = useState({}); // Store product details
  const [sizeColor, setSizeColor] = useState('');
  const [productCount, setProductCount] = useState(0);
  
  useEffect(() => {
    // Check for internet connectivity
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        // If offline, get product details from AsyncStorage
        getProductDetailsFromStorage();
      } else {
        // If online, use the navigation params data
        setProductData({
          id,
          source,
          name,
          category,
          inStock,
        });
      }
    });
  }, [id, source, name, category, inStock]);

  // Function to get product details from AsyncStorage
  const getProductDetailsFromStorage = async () => {
    try {
      const storedProduct = await AsyncStorage.getItem(`product_${id}`);
      if (storedProduct !== null) {
        setProductData(JSON.parse(storedProduct)); // Parse and set the product data from storage
      } else {
        Alert.alert("Error", "No product data available offline");
      }
    } catch (error) {
      console.error("Error loading product from storage", error);
    }
  };

  const loadCartState = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cartState');
      if (storedCart) {
        const { productCount, sizeColor } = JSON.parse(storedCart);
        setProductCount(productCount);
        setSizeColor(sizeColor);
      }
    } catch (error) {
      console.error('Error loading cart state', error);
    }
 };
 
 useEffect(() => {
    loadCartState();  // Load on component mount
 }, []);

 
 const saveCartState = async () => {
    try {
      await AsyncStorage.setItem('cartState', JSON.stringify({ productCount, sizeColor }));
    } catch (error) {
      console.error('Error saving cart state', error);
    }
 };
 
 useEffect(() => {
    saveCartState();  // Save on state change
 }, [productCount, sizeColor]);
 

  return (
    <View className='flex-1 justify-center items-center'>
      <Image source={{ uri: productData.source }} className='rounded-lg w-[250px] h-[250px]' />
      <Text className='text-2xl font-bold'>{productData.name}</Text>
      <Text className='text-2xl font-bold'>{productData.category}</Text>
      <Text className='text-2xl font-bold'>{productData.inStock}</Text>

      {/* Size selection */}
      <View className='flex-row mt-10 space-x-9'>
        <TouchableOpacity onPress={() => setSizeColor('s')}>
          <MaterialIcon name='lens' size={60} color={sizeColor === 's' ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSizeColor('m')}>
          <MaterialIcon name='lens' size={60} color={sizeColor === 'm' ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSizeColor('l')}>
          <MaterialIcon name='lens' size={60} color={sizeColor === 'l' ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSizeColor('xl')}>
          <MaterialIcon name='lens' size={60} color={sizeColor === 'xl' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      {/* Quantity selection */}
      <View className='flex-row space-x-14 mt-9'>
        <TouchableOpacity onPress={() => setProductCount(productCount > 0 ? productCount - 1 : 0)}>
          <MaterialIcon name="indeterminate-check-box" size={40} color={'red'} />
        </TouchableOpacity>
        <Text className='font-bold text-2xl'>{productCount}</Text>
        <TouchableOpacity onPress={() => setProductCount(productCount + 1)}>
          <MaterialIcon name="add-box" size={40} color={'red'} />
        </TouchableOpacity>
      </View>

      {/* Checkout button */}
      <View className='mt-20 w-32'>
        <Button title='Checkout' color={'green'} />
      </View>
    </View>
  );
}
