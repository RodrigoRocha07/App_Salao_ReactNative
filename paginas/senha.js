import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default function Senha(props) {
  const [userMail, setUserMail] = useState('');

  function replacePass() {
    if (userMail !== '') {
      firebase
        .auth()
        .sendPasswordResetEmail(userMail)
        .then(() => {
          alert("Foi enviado um email para: " + userMail + ". Verifique seu email.");
          props.navigation.navigate('TelaLogin');
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Algo deu errado!   " + errorMessage + ". Tente novamente ou pressione: Voltar ao login");
          return;
        });
    } else {
      alert("É preciso informar um e-mail válido para efetuar a redefinição de senha");
      return;
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Redefinição de Senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="Informe o email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        onChangeText={setUserMail}
      />

      <TouchableOpacity style={estilos.button} onPress={replacePass}>
        <Text style={estilos.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.voltarButton}
        onPress={() => props.navigation.navigate('TelaLogin')}>
        <Text style={estilos.voltarText}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    margin: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B8860B'
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: 'black',
    fontSize: 15,
    borderRadius: 10,
    padding: 15,
  },
  button: {
    width: '50%',
    height: '10%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#B8860B',
  },
  buttonText: {
    color: '#FFF',
    alignSelf: 'center'
  },
  voltarButton: {},
  voltarText: {
    color: '#B8860B',
  },
});
