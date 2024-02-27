import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from "../constant/back";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: 30,
  tagTypes: ['me'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/local/register',
        method: 'POST',
        body: credentials,
      }),
    }),    
    // createSerie: builder.mutation({
    //   query: (name) => ({
    //     url: '/api/series',
    //     method: 'POST',
    //     body: name,
    //   }),
    // }),    
    protected: builder.mutation({
      query: () => 'protected',
    }),
    getPops: builder.query({
        query: (params) => ({
          url: `/api/pops?${params}`,
          method: 'GET',
          // body: credentials,
        }),
        providesTags: ['me'],
      }),
    getSeries: builder.query({
        query: (params) => ({
          url: `/api/series?${params}`,
          method: 'GET',
        }),
      }),
      createPop: builder.mutation({
        query: (data) =>{
          return ({
            url: '/api/pops',
            method: 'POST',
            body: data,
            formData:true,
            headers: {
              'Content-Type': 'multipart/form-data;'
            },
          })
        },
        invalidatesTags: ['me'],
      }),
      createSuggestion: builder.mutation({
        query: (data) =>{
          return ({
            url: '/api/suggestions',
            method: 'POST',
            body: data,
          })
        },
      }),
    updateUser: builder.mutation({
      query: (params) => {
        return ({
          url: `/api/users/${params.id}`,
          method: 'PUT',
          body: params.data
        })
      }
    }),
    updatePop: builder.mutation({
      query: (params) => {
        return ({
          url: `/api/pops/${params.id}`,
          method: 'PUT',
          body: params.data,
          formData:true,
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
        })
      }
    }),
    removePop: builder.mutation({
      query: (params) => ({
        url: `/api/pops/${params.id}`,
        method: 'DELETE',
      }),
    }),
    // getProjects: builder.query({
    //   query: (params) => ({
    //     url: `/api/projects?${params}`,
    //     method: 'GET',
    //     // body: credentials,
    //   }),
    // }),
    // getProject: builder.query({
    //   query: (params) => {
    //     return ({
    //     url: `/api/projects/${params}?populate=*`,
    //     method: 'GET',
    //     // body: credentials,
    //   })},
    //   transformResponse: (response, meta, arg) => response.data,
    // }),
    // updateUserInfo: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/users/${params.id}?populate=avatar`,
    //     method: 'PUT',
    //     body: params.data,
    //   }),
    // }),
    // updateProjects: builder.mutation({
    //   query: (params) => {
    //     return ({
    //       url: `/api/projects/${params.id}`,
    //       method: 'PUT',
    //       body: {data: params.data},
    //     })
    //   }
    //   ,
    // }),
    // getChats: builder.query({
    //   query: (params) => ({
    //     url: `/api/chats?${params}`,
    //     method: 'GET',
    //     // body: credentials,
    //   }),
    //   transformResponse: (response, meta, arg) => response.data,
    // }),
    // getMessages: builder.query({
    //   query: (params) => ({
    //     url: `/api/messages?${params}`,
    //     method: 'GET',
    //     // body: credentials,
    //   }),
    //   transformResponse: (response, meta, arg) => response.data,
    // }),
    // createMessage: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/messages`,
    //     method: 'POST',
    //     body: params,
    //   }),
    // }),
    // createProjectVote: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/project-votes`,
    //     method: 'POST',
    //     body: params,
    //   }),
    //   invalidatesTags: ['Votes'],
    // }),
    // updateProjectVote: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/project-votes/${params.id}`,
    //     method: 'PUT',
    //     body: params.data,
    //   }),
    //   // invalidatesTags: ['Votes'],
    // }),
    // getProjectVotes: builder.query({
    //   query: (params) => ({
    //     url: `/api/project-votes?${params}`,
    //     method: 'GET',
    //     // body: credentials,
    //   }),
    //   providesTags: ['Votes'],
    //   transformResponse: (response, meta, arg) => response.data,
    // }),
    // createInvestment: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/investments`,
    //     method: 'POST',
    //     body: params,
    //   }),
    // }),
    uploadFile: builder.mutation({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    getMe: builder.query({
      query: (params) => ({
        url: `/api/users/me?${params}`,
        method: 'GET',
      }),
      providesTags: ['me'],
    }),
    // createReport: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/reports`,
    //     method: 'POST',
    //     body: params,
    //   }),
    //   invalidatesTags: ['Reports'],
    // }),
    // getReport: builder.query({
    //   query: (params) => ({
    //     url: `/api/reports?${params}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['Reports'],
    //   transformResponse: (response, meta, arg) => response.data,
    // }),
    // removeReport: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/reports/${params}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Reports'],
    // }),
    // updateReport: builder.mutation({
    //   query: (params) => ({
    //     url: `/api/reports/${params.id}`,
    //     method: 'PUT',
    //     body: params.data,
    //   }),
    //   invalidatesTags: ['Reports'],
    // }),
  }),
})

export const { 
                useLoginMutation, useSignupMutation, useGetPopsQuery, useCreatePopMutation,
                useLazyGetMeQuery, useGetMeQuery, useGetSeriesQuery, useUpdateUserMutation,
                useUploadFileMutation, useCreateSuggestionMutation, useRemovePopMutation, useUpdatePopMutation
              } = api
