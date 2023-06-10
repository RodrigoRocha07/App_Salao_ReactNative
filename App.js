import * as React from 'react';
import {NavigationContainer} from'@react-navigation/native';
import{createNativeStackNavigator} from'@react-navigation/native-stack';
import firebase from 'firebase';
import firebaseConfig from './bd/firebase'


import TelaLogin from './paginas/login';
import Agendamento from './paginas/agendamento';
import TelaCadastro from './paginas/cadastro'
import Senha from './paginas/senha'

const Stack = createNativeStackNavigator();

function Ini(){
  return(
    <Stack.Navigator initialRouteName='TelaLogin' screenOptions={
      {
        headerTitleAlign: 'center',
        headerStyle:{backgroundColor: '#B8860B'},
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight:'bold'
        }
        }}>
      <Stack.Screen name="TelaLogin" component={TelaLogin} options={{title:'Tela de Login'}}/>
      <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{title:'Tela de Cadastro'}}/>
      <Stack.Screen name="Agendamento" component={Agendamento} options={{title:'Agendamento'}}/>
      <Stack.Screen name="Senha" component={Senha} options={{title:'Tela de Redefinição de Senha'}}/>
    </Stack.Navigator>
  );
}
export default function App(){
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  return (
    <NavigationContainer>
      <Ini/>
    </NavigationContainer>
  )
}