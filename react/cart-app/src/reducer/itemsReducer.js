import { ADD, UPDATE, REMOVE } from "./itemActions";
/**
 * 
 * @param {Array} state product array
 * @param {string} action can be U: update, A: add, D: remove
 * @returns 
 */



export const itemsReducer = (state = [], action) => {
    
    switch(action.type){
        case ADD:
            return [
                ...state,
                {
                    product: action.payload,
                    quantity: 1
                }];
        case UPDATE:
            return state.map((i) => {
                if(i.product.id === action.payload.id){
                    return {
                        ...i, 
                        quantity: i.quantity +1
                    }
                }
                return i;
            });
        case REMOVE:
            return [
                ...state.filter((i) => i.product.id !== action.payload)
            ];
            // returns same array with one less element
            // return state.filter((i) => i.product.id !== action.payload);
        default:
            return state;
    }
};