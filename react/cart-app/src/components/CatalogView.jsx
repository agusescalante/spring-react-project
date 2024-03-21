import {useEffect, useState} from 'react';
import {getData} from '../services/product-services'
import { ProductView } from './ProductView';

export const CatalogView = ({handlerAdd}) => {
   
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const setToJson = async() =>{
        const prods = await getData();
        setProducts(prods);
        setIsLoading(false);
    }
    useEffect(
        () => {
            setToJson();
    }, []);

    return(
        <>
        {
            isLoading &&
            <div className="alert alert-info">Loading . . .</div>
        }
        <div className="row">
            {products.map(p => (
                <div className="col-4 my-2" key = {p.id}>
                   <ProductView
                        handlerAdd = { handlerAdd } 
                        id = {p.id} 
                        name = {p.name} 
                        price = {p.price} 
                        description = {p.description}
                    />
                </div>
            ))}
        </div>
        
        </>
    );
}