import { useReducer, useEffect } from "react";
import {itemsReducer} from "../reducer/itemsReducer"
import { ADD, REMOVE, UPDATE } from "../reducer/itemActions";

const initialCartItem = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useItems = () => {
    
    const [cartItems, dispatch] = useReducer(itemsReducer, initialCartItem);

    useEffect(()=>{
        //setTotal(calculateTotal(items));
        sessionStorage.setItem('cart', JSON.stringify(cartItems))
    },[cartItems]);

    const handlerAddProduct = (product) => {
        const hasItem = cartItems.find((i) => i.product.id === product.id);
        // Update
        const obj = {type: UPDATE, payload: product}
        if(!hasItem){
            // Add
            obj.type = ADD;
        }
        dispatch(obj);
    }

    const handlerRemoveProduct = (id) =>{
        // Delete
        dispatch({type: REMOVE, payload:id})
    }
    return {
        cartItems,
        handlerAddProduct,
        handlerRemoveProduct
    };

}