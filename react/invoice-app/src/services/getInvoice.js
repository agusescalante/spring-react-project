import { instanceOf } from "prop-types";
import { invoice } from "../data/invoice"

export const getInvoice = () => {
    // hace lo mismo que la seg opcion

    // let total = 0.0;
    // invoice.items.forEach(item => {
    //     total += item.price * item.quantity;
    // });

    const total = calculate(invoice.items);

    return {...invoice, total};
}

export const calculate = (items = []) => {
    return items
            .map(item => item.price * item.quantity)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}