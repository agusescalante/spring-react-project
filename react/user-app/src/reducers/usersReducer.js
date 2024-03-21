export const usersReducer = (state = [], action) => {

    switch(action.type){
        case 'A':
            return[
                ...state,
                {
                    //payload is user object
                    ...action.payload
                    
                }
                ];
        case 'U':
            return state.map(u => {
                if(u.id === action.payload.id)
                    return {
                    ...action.payload,
                    password: u.password
                    }
                return u;
            });
        case 'D':
            //state user list
            return state.filter(i => i.id !== action.payload);
        case 'loadingUsers':
            return action.payload;
        default:
            return state;
    }
};