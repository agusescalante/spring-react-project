/**
 * 
 * uses GET /users 
 */

import axios from "axios"
import { PORT, SERVER } from "./serverConfig"

const USER_PATH = SERVER+':'+PORT+'/users';
export const findAll = async() => {

    try {
        const response = await axios.get(USER_PATH);
        return response;
    } catch (error) {
        throw error.code;
    }
}

/**
 * 
 * uses POST /users 
 */
export const save = async({username, email, password}) => {

    try {
        const response = await axios.post(USER_PATH, {username, email, password});
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * uses PUT /users 
 */
export const update = async({id, username, email}) => {

    try {
        const response = await axios.put(`${USER_PATH}/${id}`, {username, email});
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
        await axios.delete(`${USER_PATH}/${id}`);
    } catch (error) {
        throw error;
    }
}
