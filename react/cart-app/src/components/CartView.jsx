import { useState, useEffect } from "react";
import { calculateTotal } from "../services/product-services"
import { useNavigate } from "react-router-dom";

export const CartView = ({handlerRemoveProduct, items}) => {

    const navegate = useNavigate();
    const [total, setTotal] = useState(0);
    const onRemoveProduct = (id) => {
        handlerRemoveProduct(id);
    }

    useEffect(()=>{
        setTotal(calculateTotal(items));
        //sessionStorage.setItem('cart', JSON.stringify(items))
    },[items]);

    const onNavegate = () => {
        navegate('/catalog');
    }
    return (
        <>
        <div className="my-4 w-50">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Precio</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(i => (
                            <tr key={i.product.id}>
                                <td>{i.product.name}</td>
                                <td>{i.product.price}</td>
                                <td>{i.quantity}</td>
                                <td>{i.quantity * i.product.price}</td>
                                <td><button  
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onRemoveProduct(i.product.id)}>Remove</button>
                                </td>
                            </tr>
                          ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end fw-bold">Total</td>
                            <td colSpan="2" className="text-start fw-bold">{total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <button className="btn btn-success" onClick={onNavegate}>Go on</button>
        </>
    );
}