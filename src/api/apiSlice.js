import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Quiz'],
    endpoints: builder => ({
        getQuiz: builder.query({
            query: () => `/quiz`,
            providesTags: ['Quiz']
        }),
        getTest: builder.query({
            query: (id = '') => `/quiz/${id}`,
            providesTags: ['Quiz']
        }),
        createQuiz: builder.mutation({
            query: test => ({
                url: '/quiz',
                method: "POST",
                body: test
            }),
            invalidatesTags: ['Quiz']
        })
    })
});

export const {useGetQuizQuery, useGetTestQuery, useCreateQuizMutation} = apiSlice;