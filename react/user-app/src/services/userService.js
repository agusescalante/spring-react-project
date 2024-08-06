/**
 * 
 * uses GET /users 
 */

import usersApi from "../apis/usersApi";

const USER_PATH = `${import.meta.env.VITE_SERVER_BACKEND}`+':'+`${import.meta.env.VITE_API_PORT}`+'/users';

/* esto esta config en usersApi.js
const config = () => {
    return { 
        headers: {
            "Authorization": sessionStorage.getItem("token"),
            "Content-Type": "application/json"}
    };
}
*/
export const findAll = async() => {

    try {
        const response = await usersApi.get(USER_PATH);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * uses POST /users 
 */
export const save = async({username, email, password, admin}) => {

    try {
        const response = await usersApi.post(USER_PATH, {username, email, password, admin});
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * uses PUT /users 
 */
export const update = async({id, username, email, admin}) => {

    try {
        const response = await usersApi.put(`${USER_PATH}/${id}`, {username, email, admin});
        return response;
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * uses DELETE /users 
 */
export const remove = async(id) => {

    try {
        await usersApi.delete(`${USER_PATH}/${id}`);
    } catch (error) {
        throw error;
    }
}
