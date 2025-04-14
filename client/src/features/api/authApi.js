import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userLoggednIn } from '../authSlice';

const USER_API="http://localhost:8080/api/v1/user/";

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({ baseUrl: USER_API ,
    credentials: 'include',

   }),
   endpoints:(builder) => ({
    registerUser: builder.mutation({
        query: (inputData) => ({
            url: 'register',
            method: 'POST',
            body: inputData,
        }),
    }),
    loginUser: builder.mutation({
        query: (inputData) => ({
            url: 'login',
            method: 'POST',
            body: inputData,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                const { result } = await queryFulfilled;
                dispatch(userLoggednIn({user:result.data.user}));
            } catch (err) {
                console.log(err);
            }
        }
    }),
    logoutUser: builder.mutation({
        query: () => ({
            url: 'logout',
            method: 'GET',
        }),
        // async onQueryStarted(_, { dispatch, queryFulfilled }) {
        //     try {
        //         await queryFulfilled;
        //         dispatch(userLoggednIn({user:{}}));
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
    }),
    loadUser: builder.query({
        query: () => ({
            url: 'profile',
            method: 'GET',
        }),
    }),
    updateUser: builder.mutation({
        query: (formData) => ({
            url: 'profile/update',
            method: 'PUT',
            body: formData,
            credentials: 'include',//The line:is used to include credentials (such as cookies, authorization headers, or TLS client certificates) in the HTTP requests made by the fetchBaseQuery function in your authApi.
        }),
    }),
   })

});
export const { useRegisterUserMutation, useLoginUserMutation ,useLogoutUserMutation,useLoadUserQuery,useUpdateUserMutation} = authApi;
