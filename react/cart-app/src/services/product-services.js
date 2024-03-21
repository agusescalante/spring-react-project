import { PORT, SERVER } from "../serverConfig";

export const getData = async() => {

    const response = await fetch('http://'+SERVER+':'+PORT+'/products');
    const products = await response.json();
    return products;
}

export const calculateTotal = (items) => {
    return   items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0)
}