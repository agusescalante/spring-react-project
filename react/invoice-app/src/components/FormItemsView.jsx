
import React, { useEffect, useState } from "react";

export const FormItemView = ({handler}) =>{
    const [formItemsState, setFormItemState] = useState({
        product: '',
        price:'',
        quantity:''
    });

    const {product, price, quantity} = formItemsState;

    const onSubmitInvoiceItems = (e) => {
        {   // e => event
            e.preventDefault();
            if(product.trim().length <= 1) return ;
            if(price.trim().length <= 1) return ;
            if(isNaN(price.trim())) return ;
            if(isNaN(quantity.trim())){
                alert("La cantidad deberia ser numerico");
                return ;
            } 
            if(quantity.trim().length < 1) return ;
            // hacemos el seteo del nuevo product en element array

            handler(formItemsState);
            setFormItemState({
                product: '',
                price:'',
                quantity:''
            });
        }
    }

    const onInputChange = ({ target:{name, value} }) => {
        setFormItemState({
            ...formItemsState, [name]:value
        })
    };

    return (<>
        <form className = "w-50" onSubmit={ onSubmitInvoiceItems } >
                                <input 
                onChange = { onInputChange }
                className="form-control m-3" type="text" name="product" value = {product} placeholder="Producto"/>
            <input
                onChange = { onInputChange}  // Se puede hacer de las dos formas, cuando se la llama sin parametros directamente le pasa event como parametro
                className="form-control m-3" type="text" name="price" value = {price} placeholder="Price"/>
            <input 
                className="form-control m-3" type="text" name="quantity" value = {quantity} placeholder="Quantily"
                onChange = {  event => { onInputChange(event)}} 
            />
            <button 
                type="submit" 
                className="btn btn-primary m-3">Add item
            </button>
        </form>
    </>);
}