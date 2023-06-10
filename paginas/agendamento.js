import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList ,TextInput} from 'react-native';
import firebase from 'firebase';

function Agendamento({navigation}){
  const [diaDigitado, setDiaDigitado] = React.useState('');
  const [buttonColor, setButtonColor] = useState('#B8860B');
  const [nome, setNome] = React.useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const servicesData = [
  { id: 1, servico: 'Cabelo', preco: 40,nome },
  { id: 2, servico: 'Manicure', preco: 30,nome },
  { id: 3, servico: 'Sobrancelha', preco: 20,nome },
  { id: 4, servico: 'Depilação', preco: 40,nome},
  { id: 5, servico: 'Cílios', preco: 60,nome},
  { id: 6, servico: 'Maquiagem', preco: 70,nome },
];

  const addToCart = (service) => {
    setCartItems([...cartItems, service]);
    setTotalPrice(totalPrice + service.preco);
  
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem} onPress={() => addToCart(item)}>
      <Text style={styles.serviceItemText}>{item.servico}</Text>
      <Text style={styles.serviceItemText}>R${item.preco.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.serviceItemText}>{item.name}</Text>
      <Text style={styles.serviceItemText}>R${item.preco.toFixed(2)}</Text>
    </View>
  );

  const handleCheckout = () => {
    console.log('Compra finalizada!');
    setCartItems([]);
    setTotalPrice(0);
  };

  const salvarDb = ()=>{
    
    db = firebase.firestore();
    db.collection(diaDigitado).add({cartItems})
      alert(nome +", seu serviço foi agendado para "+ diaDigitado);
  };
    


  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.jpg')} style={styles.image} />
      <TextInput
          style={styles.inputStyle}
          placeholder="Nome do cliente"
          onChangeText={(text) => setNome(text)}
        />
      <TextInput
          style={styles.inputStyle}
          placeholder="Dia da Semana"
          onChangeText={(text) => setDiaDigitado(text)}
        />
      
      <FlatList
        data={servicesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.heading}>Carrinho</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: R${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={salvarDb}>
          <Text  style={styles.checkoutButtonText}> Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#B8860B',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  serviceItemText: {
    color: 'black',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#B8860B',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#B8860B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
   inputStyle: {
    height: 50,
    width: '95%',
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: 'white'
  },
};

export default Agendamento;