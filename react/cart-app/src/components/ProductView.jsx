import { useNavigate } from "react-router-dom";

export const ProductView = ({handlerAdd, id, name, description, price}) => {
  
  const navegate = useNavigate();
  
  const onAddItem = (product) => {
    handlerAdd(product);
    navegate('/cart');
  }
  return (
    <>
     <div className="card">
          <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text">$ {price}</p>
              <button className="btn btn-primary" onClick={() => onAddItem({id, name, description, price})}>Add</button>
          </div>
      </div>
    </>
  )
}
