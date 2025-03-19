import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className='bg-primary p-2 rounded-b-xl'>
      <Text className='text-center font-bold text-xl'>Hangman</Text>
    </View>
  )
}

export default Header