import axios from "axios"

export const loginUser = async ({username, password}) => {

    const path = `${import.meta.VITE_SERVER_BACKEND}`+':'+`${import.meta.VITE_API_PORT}`+'/login';
    try {
        return await axios.post(path, {username, password})
    } catch (error) {
        throw error;
    }
}