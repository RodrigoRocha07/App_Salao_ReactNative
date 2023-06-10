import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import firebase from 'firebase';
import TelaCadastro from './cadastro';


import { useRoute } from '@react-navigation/native';
export default class TelaLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      alert('Digite dados do usuário!');
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          alert('Usuário logado com sucesso');
          this.setState({
            email: '',
            password: '',
            isLoading: false,
          });
          this.props.navigation.navigate('Agendamento');
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem Vindo(a)!</Text>

        <Image source={require('../img/logo.jpg')} style={styles.image} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => this.props.navigation.navigate('Senha')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={this.userLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => this.props.navigation.navigate('TelaCadastro')}>
          <Text style={styles.signUpText}>Não tem uma conta? Inscreva-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#B8860B',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 15,
    borderRadius: 10,
    padding: 15,
  },
  forgotPasswordButton: {
    marginBottom: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#B8860B',
  },
  loginButton: {
    width: '75%',
    height: '10%',
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#B8860B',
    borderRadius: 5,
    justifyContent: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
  },
  signUpButton: {
    marginBottom: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#B8860B',
  },
});
