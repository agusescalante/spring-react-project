import axios from "axios"
import {PORT, SERVER} from "../../services/serverConfig"

export const loginUser = async ({username, password}) => {

    const path = SERVER+':'+PORT+'/login';
    console.log(path);
    try {
        return await axios.post(path, {username, password})
    } catch (error) {
        throw error;
    }
}