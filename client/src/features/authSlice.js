import { createSlice } from "@reduxjs/toolkit";//import createSlice from redux toolkit
//createSlice is a function that takes an object and returns an object with the same properties as the input object, but with some additional properties added to it.

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name:"authSlice",//name of the slice
    //initial state of the slice
    initialState,
    reducers:{  //reducers are functions that take the current state and an action as arguments and return a new state.
        userLoggednIn:(state,action)=>{
            state.user=action.payload.user;//set the user to the payload of the action
            state.isAuthenticated=true;//set the isAuthenticated to true
        },
        userLoggedOut:(state)=>{
            state.user=null;//set the user to null
            state.isAuthenticated=false;//set the isAuthenticated to false
        }
        // setUser:(state,action)=>{
        //     state.user=action.payload.user;//set the user to the payload of the action
        // },
    }
});
export const {userLoggednIn,userLoggedOut,setUser} = authSlice.actions;//export the actions of the slice
export default authSlice.reducer;//export the reducer of the slice