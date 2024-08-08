import axios from "axios"

export const loginUser = async ({username, password}) => {

    const path = `${import.meta.env.VITE_SERVER_BACKEND}`+':'+`${import.meta.env.VITE_API_PORT}`+'/login';
    try {
        return await axios.post(path, {username, password})
    } catch (error) {
        throw error;
    }
}