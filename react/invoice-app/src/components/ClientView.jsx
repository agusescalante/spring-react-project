import PropTypes from 'prop-types';
export const ClientView = ({client, title}) => {

    
    const {
        name: nameClient,
        lastName,
        address:{
            country,
            city,
            street,
            number
        }
    } = client;
    return (
        <>
        <h4>{title}</h4>
            <ul className="list-group">
                <li className="list-group-item active">{nameClient} {lastName}</li>
                <li className="list-group-item"> {country} | {city} </li>
                <li className="list-group-item">{number}</li>
            </ul>
        </>
    )
}

ClientView.propType = {
    client : PropTypes.object.isRequired,
    nameClient : PropTypes.string.isRequired,
    lastName : PropTypes.string.isRequired,
    country : PropTypes.string.isRequired,
    city : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    number : PropTypes.number.isRequired
}