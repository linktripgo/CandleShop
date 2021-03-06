import PRODUCTS from '../../data/dummy-data';
import { 
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} from '../actions/products';
import Product from '../../models/products';

const initialState = {
    allProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            );
            return {
                ...state,
                allProducts: state.allProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
            case UPDATE_PRODUCT:
                const productIndex = state.userProducts.findIndex(
                    prod => prod.id === action.pid
                );
                const updatedProduct = new Product(
                    action.pid,
                    state.userProducts[productIndex].ownerId,
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price
                );
                const updatedUserProducts = [...state.userProducts];
                updatedUserProducts[productIndex] = updatedProduct;
                const avalProductIndex = state.allProducts.findIndex(
                    prod=> prod.id === action.pid
                );
                const updatedAvalProducts = [...state.allProducts];
                updatedAvalProducts[avalProductIndex] = updatedProduct;
                return {
                    ...state,
                    allProducts: updatedAvalProducts,
                    userProducts: updatedUserProducts
                };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                allProducts: state.allProducts.filter(
                    product => product.id !== action.pid
                ),
            }
    }
    return state;
}