import {
    ADD_PRODUCT_LOADING,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS_LOADING,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    EDIT_PRODUCT_SET,
    EDIT_PRODUCT_LOADING,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR,
    DELETE_PRODUCT_SET,
    DELETE_PRODUCT_LOADING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
} from "../types";

// CADA reducer tiene su propio state
const initialState = {
    products: [],
    error: false,
    loading: false,
    errorProducts: false,
    loadingProducts: false,
    productToDelete: null,
    errorDeleteProduct: false,
    loadingDeleteProduct: false,
    productToEdit: null,
    errorEditProduct: false,
    loadingEditProduct: false,
};

export default function globalState(state = initialState, action) {
    let stateReduced = {};
    switch (action.type) {
        // AÑADIR PRODUCTO
        case ADD_PRODUCT_LOADING:
            stateReduced = {
                ...state,
                loading: action.payload,
            };
            break;
        case ADD_PRODUCT_SUCCESS:
            stateReduced = {
                ...state,
                products: [...state.products, action.payload],
            };
            break;
        case ADD_PRODUCT_ERROR:
            stateReduced = {
                ...state,
                error: action.payload,
            };
            break;
        // OBTENER LISTADO DE PRODUCTOS
        case GET_PRODUCTS_LOADING:
            stateReduced = {
                ...state,
                loadingProducts: action.payload,
            };
            break;
        case GET_PRODUCTS_SUCCESS:
            stateReduced = {
                ...state,
                products: action.payload,
            };
            break;
        case GET_PRODUCTS_ERROR:
            stateReduced = {
                ...state,
                errorProducts: action.payload,
            };
            break;
        // ELIMINAR PRODUCTO
        case DELETE_PRODUCT_SET:
            stateReduced = {
                ...state,
                productToDelete: state.products.filter(
                    (product) => product.id === action.payload
                )[0],
            };
            break;
        case DELETE_PRODUCT_LOADING:
            stateReduced = {
                ...state,
                loadingDeleteProduct: action.payload,
            };
            break;
        case DELETE_PRODUCT_SUCCESS:
            stateReduced = {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== state.productToDelete.id
                ),
                productToDelete: null,
            };
            break;
        case DELETE_PRODUCT_ERROR:
            stateReduced = {
                ...state,
                errorDeleteProduct: action.payload,
            };
            break;
        // EDITAR PRODUCTO
        case EDIT_PRODUCT_SET:
            stateReduced = {
                ...state,
                productToEdit: action.payload,
            };
            break;
        case EDIT_PRODUCT_LOADING:
            stateReduced = {
                ...state,
                loadingEditProduct: action.payload,
            };
            break;
        case EDIT_PRODUCT_SUCCESS:
            stateReduced = {
                ...state,
                products: state.products.filter((product) =>
                    product.id === action.payload.id
                        ? {
                            ...product,
                            name: action.payload.name,
                            price: action.payload.price,
                        }
                        : product
                ),
                productToEdit: null,
            };
            break;
        case EDIT_PRODUCT_ERROR:
            stateReduced = {
                ...state,
                errorEditProduct: action.payload,
            };
            break;
        default:
            stateReduced = state;
            break;
    }
    return stateReduced;
}
