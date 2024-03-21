import PropTypes from 'prop-types';
import { Title } from './components/Title';
import { UserDetails } from './components/UserDetails';
import { Book } from './components/Book';


export const HelloWorldApp = ({user, id, title, book}) => {
    return (
        <>
           <Title title = 'Como componente'/>
           <UserDetails user = {user}/>
           <Book book = {book}/>
        </>
        );
}
HelloWorldApp.propType = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
}

HelloWorldApp.defaultProps = {
    title : 'Un nombre por defecto!!!!',
    book: {name: 'Default name book', date: '13/09/2009'}
}

