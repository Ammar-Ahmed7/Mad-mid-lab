import { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";

const TopBar =  () => {
    const [changecolor, setChangeColor] = useState('');
    return (
        <>
        <View className="flex-row justify-between items-center border-2 border-black h-14 p-2">
            
            <TouchableOpacity onPress={()=>{setChangeColor('books')}}>
             {changecolor==='books'? (
               <Text className="text-lg text-blue-500">Books</Text>
             ) : (
               <Text className="text-lg">Books</Text>
             )}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setChangeColor('dinner')}}>
            {changecolor==='dinner'? (
               <Text className="text-lg text-blue-500">Dinner</Text>
             ) : (
               <Text className="text-lg">Dinner</Text>
             )}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setChangeColor('socks')}}>
            {changecolor==='socks'? (
               <Text className="text-lg text-blue-500">Socks</Text>
             ) : (
               <Text className="text-lg">Socks</Text>
             )}
            </TouchableOpacity>

        </View>
        </>
    );
}

export default TopBar;