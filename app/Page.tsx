import React from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useFetchProducts } from './CustomHook';

const Page = () => {
    const { data, loading, error, isOffline } = useFetchProducts();

    const renderItem = ({ item }) => (
        <Link href={{ pathname: "/ProductPage", params: { source: "https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg", name: item.name, id: item.id, category: item.category, inStock: item.inStock } }} asChild>
            <TouchableOpacity className="border border-gray-300 p-4 m-1" style={{ width: '48%' }}>
                <View>
                    <Image source={{ uri: 'https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg' }} style={{ width: '100%', height: 100, marginBottom: 10 }} />
                    <Text className="text-lg font-bold">{item.category}</Text>
                    <Text>{item.name}</Text>
                    <Text>{item.inStock}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <>
            <View className="flex-row justify-between p-5">
                <Text className="text-center text-md bg-gray-300 p-2 rounded-2xl">Fruits</Text>
                <Text className="text-center text-md bg-gray-300 p-2 rounded-2xl">Vegetables</Text>
                <Text className="text-center text-md bg-gray-300 p-2 rounded-2xl">Bakery</Text>
                <Text className="text-center text-md bg-gray-300 p-2 rounded-2xl">Sweets</Text>
            </View>

            {isOffline && <Text style={{ color: 'red', textAlign: 'center' }}>You are offline. Showing cached data.</Text>}
            
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2} // Divide items into 2 columns
                    contentContainerStyle={{ padding: 16 }}
                />
            )}

            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        </>
    );
};

export default Page;
