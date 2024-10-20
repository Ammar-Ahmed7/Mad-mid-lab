import { View,Text,TextInput,TouchableOpacity } from "react-native";


const TopBar =  () => {
    return (
        <>
        <View className="border-2 border-black mt-7 p-2">
        <View className="flex-row justify-between  p-1">
        <TouchableOpacity>

            <Text className="font-bold text-lg text-red-900">Back</Text>
        </TouchableOpacity>

            <TouchableOpacity>

            <Text className="font-bold text-lg text-red-900">Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity>

            <Text className="font-bold text-lg text-red-900">Cart</Text>
            </TouchableOpacity>
        </View>
            <TextInput className="border-2 border-black mt-2 p-1 rounded-xl " placeholder="Enter Something"></TextInput>
        </View>
        
        </>
    );
}

export default TopBar;