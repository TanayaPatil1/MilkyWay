import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { firebase } from '../config';
import { COLORS } from './color';

function HomeScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    // Fetch user details
    firebase.firestore().collection('users')
      .doc(uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
          setImage(snapshot.data().imageUri);
        } else {
          console.log('user does not exist');
        }
      });

    // Fetch menu items
    const menuCollectionRef = firebase.firestore().collection('users').doc(uid).collection('menu');
    const unsubscribe = menuCollectionRef.onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, [uid]);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      // Handle successful logout (e.g., navigate to login screen)
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.mainText}>{name.firstName} {name.lastName}</Text>
            <Text style={styles.subText}>Dairy Name: <Text style={styles.italicText}>{name.dairyName}</Text></Text>
            <Text style={styles.subText}>Address: <Text style={styles.italicText}>{name.address}</Text></Text>
            <Text style={styles.subText}>Contact No: <Text style={styles.italicText}>{name.phone}</Text></Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Menu Items</Text>
        {menuItems.map((item) => (
          <View style={styles.listItem} key={item.id}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemText}>₹{item.price.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerContainer: {
    borderBottomWidth:5,
    justifyContent: 'space-between',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  noImageText: {
    color: COLORS.textColor,
    fontSize: 16,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  mainText: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    color: COLORS.textColor,
    fontSize: 16,
    marginBottom: 2,
  },
  italicText: {
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  menuContainer: {
   
    backgroundColor: COLORS.lightBackground,
    padding: 20,
  },
  menuTitle: {
    color: COLORS.textColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
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
    justifyContent:'space-between',
    flexDirection: 'row'

  },
  itemText: {
    color: COLORS.textColor,
    fontSize: 16,
  },
});
