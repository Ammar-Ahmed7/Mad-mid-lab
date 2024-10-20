import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Link} from 'expo-router'

const TopBar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://foodapi-zohaib.vercel.app/products');
            const result = await response.json();
            setData(result.docs);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <Link href={{pathname: "/ProductPage", params: { source: item.image, name: item.title, id: item._id, price: item.price, desc:item.description } }} asChild>
         <TouchableOpacity className="border border-gray-300 p-4 m-1" style={{ width: '48%' }}>
        <View>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 100, marginBottom: 10 }} />
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>{item.description}</Text>
        </View>
        </TouchableOpacity>
        </Link>
    );

    return (
        <>
            <View className="">
                <Text className="text-center text-xl">Product List</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    numColumns={2} // Divide items into 2 columns
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </>
    );
};

export default TopBar;
