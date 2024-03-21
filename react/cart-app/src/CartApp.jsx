import { useItems } from "./hooks/useItems";
import { NavBar } from "./components/NavBar";
import { CartRoute } from "./routes/CartRoute";

// Structure

// product: {
//     id:0,
//     name:'Keyboard',
//     description:'This would be a descripcion, test with description extra longger',
//     price: 12331},
// quantity : 0,

export const CartApp = () => {

    //const [cartItems, setCartItems] = useState(initialCartItem);
    
    const {cartItems, handlerAddProduct, handlerRemoveProduct} = useItems();

    return(
        <>
            <NavBar/>
            <div className="container my-4">
                <h3>Cart App</h3>
                <CartRoute 
                    cartItems={cartItems} 
                    handlerAddProduct = {handlerAddProduct} 
                    handlerRemoveProduct = {handlerRemoveProduct} 
                />
            </div>
    </>);
}