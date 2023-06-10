import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';

import firebase from 'firebase';

export default class Cadastro extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
      errorMessage: ''
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  cadastrarUsuario = () => {
    if (this.state.email === '' && this.state.password === '') {
      alert('Favor inserir dados válidos para o cadastro!');
    } else {
      this.setState({ isLoading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({ displayName: this.state.displayName });

          alert('Usuário cadastrado com sucesso!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
            displayName: ''
          });
          this.props.navigation.navigate('Login');
        })
        .catch((error) => this.setState({ errorMessage: error.message, isLoading: false }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.containerLogin}>
        <Text style={styles.titulo}>Registre-se</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Nome"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={this.cadastrarUsuario}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('TelaLogin')}>
          Já tem conta? Clique aqui para entrar
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#000'
  },
  inputStyle: {
    height: 50,
    width: '95%',
    borderWidth: 1,
    borderColor: 'white',
    margin: 15,
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  loginText: {
    color: '#B8860B',
    textAlign: 'center'
  },
  titulo: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 30,
    color: '#B8860B',
    fontWeight: 'bold'
  },

  button: {
    width: '70%',
    height: '10%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#B8860B',

},

  loginButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
  },

});
