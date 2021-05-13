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
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

export function addNewProductAction(product) {
    return async (dispatch) => {
        dispatch(addProductLoading(true));
        //LLamadas a Backend o BD
        try {
            const resp = await axiosClient.post("/products", product);
            dispatch(addProductSuccess(resp.data));
            dispatch(addProductLoading(false));

            // Alerta
            Swal.fire(
                "Éxito",
                "El producto se agregó correctamente",
                "success"
            );
        } catch (error) {
            console.log(error);
            dispatch(addProductLoading(false));
            dispatch(addProductError(true));
            // Alerta
            Swal.fire({
                icon: "error",
                title: "¡Oopss!",
                text: "Hubo un error. Inténtalo nuevamente.",
            });
        }
    };
}

const addProductLoading = (status) => ({
    type: ADD_PRODUCT_LOADING,
    payload: status,
});

const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
});

const addProductError = (status) => ({
    type: ADD_PRODUCT_ERROR,
    payload: status,
});

export function getProductsAction() {
    return async (dispatch) => {
        dispatch(getProductsLoading(true));
        //LLamadas a Backend o BD
        try {
            const res = await axiosClient.get("/products");
            dispatch(getProductsSuccess(res.data));
            dispatch(getProductsLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(getProductsLoading(false));
            dispatch(getProductsError(true));
            // Alerta
            Swal.fire({
                icon: "error",
                title: "¡Oopss!",
                text: "Hubo un error al obtener productos. Recargue la página e inténtalo nuevamente.",
            });
        }
    };
}

const getProductsLoading = (status) => ({
    type: GET_PRODUCTS_LOADING,
    payload: status,
});

const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
});

const getProductsError = (status) => ({
    type: GET_PRODUCTS_ERROR,
    payload: status,
});
// ELIMINAR PRODUCTOs
export function deleteProductAction(product_id) {
    return async (dispatch) => {
        await dispatch(deleteProductSet(product_id));
        
        try {
            await axiosClient.delete(`/products/${product_id}`);
            dispatch(deleteProductSuccess());
            dispatch(deleteProductLoading(false));
            Swal.fire("Exito!", "El producto ha sido eliminado.", "success");
        } catch (error) {
            console.log(error);
            dispatch(deleteProductLoading(false));
            dispatch(deleteProductError(true));
            // Alerta
            Swal.fire({
                icon: "error",
                title: "¡Oopss!",
                text: "Hubo un error al eliminar el product. Inténtalo nuevamente.",
            });
        }
    };
}
const deleteProductSet = (product_id) => ({
    type: DELETE_PRODUCT_SET,
    payload: product_id,
});

const deleteProductLoading = (status) => ({
    type: DELETE_PRODUCT_LOADING,
    payload: status,
});

const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = (status) => ({
    type: DELETE_PRODUCT_ERROR,
    payload: status,
});

// SETEAR PRODUCTO A EDITAR
export function  setEditProductAction(product) {
    return async (dispatch) => {
        await dispatch(editProductSet(product));
    };
}

const editProductSet = (product) => ({
    type: EDIT_PRODUCT_SET,
    payload: product,
});

// EDITAR PRODUCTO SELECCIONADO
export function editProductAction(product) {
    return async (dispatch) => {
        try {
            await axiosClient.put(`/products/${product.id}`, product);
            dispatch(editProductSuccess(product));
            dispatch(editProductLoading(false));
            Swal.fire({
                title: "Éxito",
                text: "El producto ha sido editado.",
                icon: 'success'
            });
        } catch (error) {
            console.log(error);
            dispatch(editProductLoading(false));
            dispatch(editProductError(true));
            // Alerta
            Swal.fire({
                icon: "error",
                title: "¡Oopss!",
                text: "Hubo un error al editar el producto. Inténtalo nuevamente.",
            });
        }
    };
}

const editProductLoading = (status) => ({
    type: EDIT_PRODUCT_LOADING,
    payload: status,
});

const editProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});

const editProductError = (status) => ({
    type: EDIT_PRODUCT_ERROR,
    payload: status,
});