
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import { firebase } from './config';

import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import HomeScreen from './components/HomeScreen';
import TabNavigator from './components/TabNavigator';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, []);

  if (initializing) return null;
return(<NavigationContainer>
  {!user ?( <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        // option={{
        //   headerTitle: () => <Header name="MilkyWay"/>
        // }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        // option={{
        //   headerTitle: () => <Header name="MilkyWay"/>
        // }}

        />
      </Stack.Navigator>):(<Stack.Navigator>
     
      <Stack.Screen
        name="MainTab"
        component={TabNavigator}
        options={{ headerShown: false }}
      // option={{
      //   headerTitle: () => <Header name="MilkyWay"/>
      // }}

      />
    </Stack.Navigator>)}
</NavigationContainer>)

}

  

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
