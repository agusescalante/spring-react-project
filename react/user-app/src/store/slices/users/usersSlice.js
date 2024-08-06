import { createSlice } from "@reduxjs/toolkit";


export const initialUserForm =  {
    id: 0,
    username: '',
    password: '',
    admin: false,
    email: ''
};

const initialErrors =  {
    username: null,
    password: null,
    email: null
};

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userSelected : initialUserForm,
        visibleForm: false,
        errors : initialErrors
    },
    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ];
            state.userSelected = initialUserForm; // cuando se agrega user se reinicia
            state.visibleForm = false; // cuando se agrega user se reinicia
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload); // u user
        },
        updateUser: (state, action) => {
            state.users = state.users.map(u => {
                if(u.id === action.payload.id)
                    return {
                    ...action.payload
                    }
                return u;
            });
            state.userSelected = initialUserForm; // cuando se agrega user se reinicia
            state.visibleForm = false; // cuando se agrega user se reinicia
        },
        loadingUser: (state, action) => {
            state.users = action.payload;
        },
        onUserSelectedForm: (state, action) => {
            state.userSelected = action.payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        loadingError: (state, {payload}) => {
            state.errors = payload;
        }
    }
});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUser,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError
} = usersSlice.actions;