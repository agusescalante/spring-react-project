import PropTypes from 'prop-types';
export const CompanyView = ({company, title}) => {
    return <>
    <h4>{title}</h4>
         <ul className="list-group">
            <li className="list-group-item active">{company.name}</li>
            <li className="list-group-item">{company.fiscalNumber} </li>
        </ul>
    </>
}
CompanyView.propType = {
    company : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    fiscalNumber : PropTypes.number.isRequired
}