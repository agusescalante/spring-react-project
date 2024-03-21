import PropTypes from 'prop-types';

export const RowItemView = ({id, product, price, quantity, removeFunction}) => {
    return <>
        <tr key={id}>
            <td>{ product }</td>
            <td>{ price }</td>
            <td>{ quantity }</td>
            <td><button className='btn btn-danger btn-sm' onClick={ () => removeFunction(id)  }> Remove </button></td>
        </tr>
    </>
} 
RowItemView.propTypes = {
    product: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity:PropTypes.number.isRequired
}