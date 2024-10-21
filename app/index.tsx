import {Text, View} from 'react-native'
import TopBar from "@/components/TopBar"
import Page from '@/app/Page';
import Bottom from '@/components/Bottom';

export default function Menu(){
  return (
    <>
    <View className='flex-1 justify-between'> 
    <TopBar/>
    <Page/>
    <Bottom/>
    </View>
    </>
  );
}