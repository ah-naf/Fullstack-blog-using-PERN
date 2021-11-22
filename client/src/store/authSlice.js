import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        token: null,
        user: {},
        allBlogs: []
    },
    reducers: {
        login: (state,{payload}) => {
            state.token = payload
            if(state.token) {
                state.loggedIn = true
            } else {
                state.loggedIn = false
            }
        },
        setBlog: (state, {payload}) => {
            state.allBlogs = payload
        },
        setUser: (state, {payload}) => {
            state.user = payload
        }
    }
})

export const authAction = authSlice.actions
export default authSlice