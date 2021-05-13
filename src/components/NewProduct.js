import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions de Redux
import { addNewProductAction } from "../actions/productsActions";
// Alerta
import { showAlertAction, hideAlertAction} from "../actions/alertActions";

const NewProduct = ({history}) => {
    // State local del componente (No se comparte con otros)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    //Acceder al state del Store
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const alert = useSelector((state) => state.alert.alert);

    // Utilizar use dispatch y te crea una función que utiliza el action
    const dispatch = useDispatch();

    // LLamando al action de producto Action
    const addNewProduct = (product) => {
        dispatch(addNewProductAction(product));
    };

    // LLamando al action alerta
    const showAlert = (alertDetails) => {
        dispatch(showAlertAction(alertDetails));
    };

    const submitNewProduct = (e) => {
        e.preventDefault();
        // Validar Formulario
        if (name.trim() === "" || price <= 0) {
            const alertDetails = {
                msg: "Ambos campos son requeridos",
                classes: "alert alert-danger text-center text-uppercase p-3",
            };
            showAlert(alertDetails);
            return;
        }
        // Si no hay errores
        dispatch(hideAlertAction());
        // Crear el nuevo producto
        addNewProduct({
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
                            Agregar Nuevo Producto
                        </h2>
                        {alert ? (
                            <p className={alert.classes}>
                                { alert.msg }
                            </p>
                        ) : null}
                        <form onSubmit={submitNewProduct}>
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
                            >
                                Agregar
                            </button>
                        </form>
                        {loading ? <p>Cargando</p> : null}
                        {error ? (
                            <p className="alert alert-danger p-2 mt-4 text-center">
                                Hubo un error
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
