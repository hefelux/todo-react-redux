import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// Actions de Redux
import { editProductAction } from "../actions/productsActions";

const EditProduct = ({ history }) => {
    //Acceder al state del Store
    const loading = useSelector((state) => state.products.loadingEditProducts);
    const error = useSelector((state) => state.products.errorEditProducts);
    const product = useSelector((state) => state.products.productToEdit);
    // State local del componente (No se comparte con otros)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch();

    // Setear valores del producto
    useEffect(() => {
        if (product !== null) {
            setName(product.name);
            setPrice(product.price);
        } else {
            setName("");
            setPrice(0);
        }
    }, [product]);

    const editProduct = (product) => {
        dispatch(editProductAction(product));
    };

    const submitEditProduct = (e) => {
        e.preventDefault();
        // Validar Formulario
        if (name.trim() === "" || price <= 0) {
            return;
        }
        editProduct({
            id: product.id,
            name,
            price,
        });
        history.push("/");
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form onSubmit={submitEditProduct}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="price"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                disabled={loading}
                            >
                                {loading
                                    ? "Editando producto..."
                                    : "Guardar Cambios"}
                            </button>
                        </form>
                        {error ? (
                            <p className="alert alert-danger p-2 mt-4 text-center">
                                Hubo un error al editar
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;