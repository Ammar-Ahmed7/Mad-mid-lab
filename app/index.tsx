import {Text, View} from 'react-native'
import TopBar from "@/components/TopBar"
import Page from '@/components/Page';
import Bottom from '@/components/Bottom';

export default function Menu(){
  return (
    <>
    <View className='flex-1 justify-between border-2 border-red-700'> 
    <TopBar/>
    <Page/>
    <Bottom/>
    </View>
    </>
  );
}