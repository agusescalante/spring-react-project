import { Navigate, Route, Routes } from "react-router-dom";
import { CatalogView } from "../components/CatalogView";
import { CartView } from "../components/CartView";
export const CartRoute = ({cartItems, handlerAddProduct, handlerRemoveProduct}) => {
    return (
        <Routes>

            <Route 
                path="catalog" 
                element={ <CatalogView handlerAdd = {product => handlerAddProduct(product) } /> }/>
            <Route 
                path="cart" 
                element={(
                    cartItems?.length <= 0 ?
                    <div className="alert alert-warning"> There is not selected elements!</div> :
                    <CartView items = {cartItems} handlerRemoveProduct = {handlerRemoveProduct}/> )}/>
            <Route path="/" element={<Navigate to={'/catalog'} />} />
        </Routes>
    );
}