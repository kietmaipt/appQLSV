import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screnns/Login';
import Register from './Screnns/Register';
import Product from './Screnns/Product';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();
const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
          <Stack.Screen name="Product" component={Product} options={{ title: 'Product' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  }
})