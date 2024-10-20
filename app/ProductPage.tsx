import {View, Text, Image,TouchableOpacity,Button} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // For MaterialIcons
import { useState } from 'react';

export default function ProductPage(){
    const {id,source,name,price,desc} = useLocalSearchParams();
    const [sizecolor, setSizeColor] = useState('');
    const [productcount, setProductCount] = useState(0);
    
    return (
    <>
    <View className='flex-1 justify-center items-center'>
    <Image source={{uri:source}} className=' rounded-lg w-[250px] h-[250px]'></Image>
    <Text className='text-2xl font-bold'>{name}</Text>
    <Text className='text-2xl font-bold'>{price}</Text>
    <Text className='text-2xl font-bold'>{desc}</Text>

    <View className='flex-row mt-10 space-x-9'>
     
     <TouchableOpacity onPress={()=>{setSizeColor('s')}}>
    <MaterialIcon name='lens' size={60} color={sizecolor ==='s'?'white':'black'} ></MaterialIcon>
        </TouchableOpacity>   

     <TouchableOpacity onPress={()=>{setSizeColor('m')}}>
    <MaterialIcon name='lens' size={60} color={sizecolor ==='m'?'white':'black'} ></MaterialIcon>
        </TouchableOpacity>  

     <TouchableOpacity onPress={()=>{setSizeColor('l')}}>
    <MaterialIcon name='lens' size={60} color={sizecolor ==='l'?'white':'black'} ></MaterialIcon>
        </TouchableOpacity>   

     <TouchableOpacity onPress={()=>{setSizeColor('xl')}}>
    <MaterialIcon name='lens' size={60} color={sizecolor ==='xl'?'white':'black'} ></MaterialIcon>
        </TouchableOpacity> 
        </View>  
   
   <View className='flex-row space-x-14 mt-9'>
    
    <TouchableOpacity onPress={()=>{setProductCount(productcount > 0 ? productcount-1 : 0)}}>
   <MaterialIcon name="indeterminate-check-box" size={40} color={'red'}></MaterialIcon>
    </TouchableOpacity>

   <Text className='font-bold text-2xl'>{productcount}</Text>
   
   <TouchableOpacity onPress={()=>{setProductCount(productcount+1)}}>
   <MaterialIcon name="add-box" size={40} color={'red'}></MaterialIcon>
   </TouchableOpacity>
   </View>
     
   <View className='mt-20 w-32'>
        <Button title='Checkout' color={'green'}></Button>
      </View>

    


    </View>
    </>);
}