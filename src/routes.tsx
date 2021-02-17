import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Map from './pages/MapView'

const { Navigator, Screen } = createStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        }}
      >
        <Screen name='Map' component={Map} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes
