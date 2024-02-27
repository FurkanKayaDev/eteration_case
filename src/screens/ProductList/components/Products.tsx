import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenWidth} from '../../../utils/uiHelpers';

const Products = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.priceText}>{item.price} ₺ </Text>
        <Text style={styles.name} numberOfLines={2} adjustsFontSizeToFit>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - 40,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    width: screenWidth / 2 - 55,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  imageContainer: {
    width: screenWidth / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: screenWidth / 2 - 55,
    height: 140,
  },
  name: {
    fontSize: 12,
  },
  priceText: {
    fontSize: 14,
    color: 'blue',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: screenWidth / 2 - 55,
    padding: 10,
    borderRadius: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
});
