import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="justify-center items-center">
        <Text className="font-bold text-lg">Profile Screen</Text>
      </View>
    </SafeAreaView>    
  );
}
