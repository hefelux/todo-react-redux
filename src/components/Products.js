import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions de Redux
import { getProductsAction } from "../actions/productsActions";
import Product from "./Product";

const Products = () => {
    //Acceder al state del Store
    const loading = useSelector((state) => state.products.loadingProducts);
    const error = useSelector((state) => state.products.errorProducts);
    const products = useSelector((state) => state.products.products);
    // Utilizar use dispatch y te crea una función que utiliza el action
    const dispatch = useDispatch();

    // LLamando al action de producto Action
    const getProducts = () => {
        dispatch(getProductsAction());
    };
    useEffect(() => {
        
        getProducts();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {loading ? (
                <p className="font-weight-bold alert alert-dark text-center">
                    Cargando Productos...
                </p>
            ) : null}
            {error ? (
                <p className="font-weight-bold alert alert-danger text-center">
                    Hubo un error al cargar productos
                </p>
            ) : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay productos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Products;
