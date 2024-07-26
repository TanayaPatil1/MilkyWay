import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../config.js';
import { COLORS } from './color.js';

const AddMenuItemScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const uid = firebase.auth().currentUser.uid;
  const menuCollectionRef = firebase.firestore().collection('users').doc(uid).collection('menu');

  useEffect(() => {
    const unsubscribe = menuCollectionRef.onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, []);

  const addMenuItem = async () => {
    try {
      await menuCollectionRef.add({
        name,
        quantity,
        price: parseFloat(price),
      });
      setName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      await menuCollectionRef.doc(itemId).delete();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          style={styles.input}
          placeholder="Price per unit"
          value={price}
          onChangeText={setPrice}
        />
        <TouchableOpacity style={styles.button} onPress={addMenuItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      {menuItems.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemText}>₹{item.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMenuItem(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.textColor,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: COLORS.listItemBackground,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    color: COLORS.textColor,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: COLORS.deleteButtonBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: COLORS.deleteButtonText,
  },
});

export default AddMenuItemScreen;
