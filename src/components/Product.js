import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    deleteProductAction,
    setEditProductAction,
} from "../actions/productsActions";
import Swal from "sweetalert2";

const Product = ({ product }) => {
    const { id, name, price } = product;

    const dispatch = useDispatch();

    // Confirmar su desea eliminar producto
    const confirmDeleteProduct = (product_id) => {
        // Preguntar al usuario
        Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar!",
            cancelButtonText: "Cancelar!",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                //Pasarlo al action
                dispatch(deleteProductAction(product_id));
            }
        });
    };

    // Ir a edición
    const history = useHistory();
    const goToEditProduct = (product) => {
        dispatch(setEditProductAction(product));
        history.push(`/products/edit/${product.id}`);
    }

    return (
        <tr>
            <td>{name}</td>
            <td>
                <span className="font-weight-bold">$ {price}</span>
            </td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => goToEditProduct(product)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Product;
