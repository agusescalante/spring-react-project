import { getInvoice, calculate } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import React, { useEffect, useState } from "react";
import { FormItemView } from "./components/FormItemsView";

const initialInvoice = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0,
    },
    items: []
};

export const InvoiceApp = () => {

    const [actForm, setActForm] = useState(false);

    const [counter, setCounter] = useState(4);

    const[invoice, setInvoice] = useState(initialInvoice);

    const[total, setTotal] = useState(0);

    const [items, setItems] = useState([]);

    
    const {id, name, client, company} = invoice;

    //const {product, price, quantity} = formItemsState;

    /**
     * Busco la "data" solo una vez 
     */
    useEffect(()=>{
        try {
            const data = getInvoice();
            setInvoice(data);
            setItems(data.items);
            console.log(data);
        } catch(e) {
            console.log("No se pudo obtener la informacion del server");
        }
    }, []);

    /**
     * Se accion por cada cambio en el precio en el form
     */
    // useEffect(()=>{
    //     console.log(price);
    // }, [price]);

     /**
     * Se accion por cada cambio en el form
     */
    //  useEffect(()=>{
    //     console.log("Hubo cambio en el form!");
    // }, [formItemsState]);
    
    /** Calculamos el total por cada Update, Create, Delete sobre el form */
    useEffect(()=>{
        console.log("Hubo cambio en el form!");
       setTotal(calculate(items));
    }, [items]);

    const handlerAddItems = ({product, price, quantity}) => {
        {
        // hacemos el seteo del nuevo product en element array
        setItems([...items, 
        {
            id: counter,
            product :product, 
            // lo hacemos de strng to int
            price : parseInt(price.trim(),10), 
            quantity : parseInt(quantity.trim(),10)} 
        ]);
        
        setCounter(counter+1);
        }
    }


    const removeFunction = (id) => {
        {
        // incluye todos los elementos que sean distintos al id parameter
        setItems(items.filter(item => item.id !== id));
        }
    }


    const activeBool = () => {
        setActForm(!actForm);
    }
    return (
        <>
        <div className="container">
            <div className="card my-3">
                <div className="card-header">
                    Ejmplo invoice
                </div>
               
                <div className="card-body">
                        <InvoiceView id={id} name={name}/>
                        <div className="row my-3">

                            <div className="col">
                                <ClientView client={client} title = {"Client Data"}/>
                            </div>

                            <div className="col">
                                <CompanyView company={company} title = {"Enterprise data"}/>
                            </div>
                        </div>    
                        <ListItemsView items = {items} title={"Invoice Products"} removeFunction = {id => removeFunction(id)}/>
                        
                        <TotalView total = {total}/>
                        <button className="btn btn-secondary" onClick={ activeBool }>{actForm?  'Ocultar' : 'Agregar Item'}</button>
                        {!actForm  || <FormItemView handler = {(newItem) => handlerAddItems(newItem)}/>}
                        

                        
                </div>
            </div>
        </div>
        </>
    );
}