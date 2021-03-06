import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => { 
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.allProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();

    return(<ScrollView>
    <Image style={styles.image} source={{ uri: selectedProduct.imageUrl}}/>
        <View style={styles.action}>
            <TouchableOpacity style={styles.addCartBtn} title="Add to cart" onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct))
            }}>
                <Text style={styles.addText}>Add to cart</Text>
            </TouchableOpacity> 
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>);
}

ProductDetailScreen.navigationOptions = navData => {
       return { 
           headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'source-pro-semi'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'source-pro-semi',
        paddingHorizontal: 15,
    },
    action: {
        marginVertical: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    addText: {
        fontFamily: 'source-pro-semi',
        color: 'white',
    },
    addCartBtn: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    }
});

export default ProductDetailScreen;