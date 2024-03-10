import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constant/back";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: 30,
  tagTypes: ["me"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/local",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/local/register",
        method: "POST",
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
      query: () => "protected",
    }),
    getPops: builder.query({
      query: (params) => ({
        url: `/api/pops?${params}`,
        method: "GET",
        // body: credentials,
      }),
      providesTags: ["me"],
    }),
    getConversations: builder.query({
      query: (params) => ({
        url: `/api/conversations?${params}`,
        method: "GET",
      })
    }),
    createConversations: builder.mutation({
      query: (data) => ({
        url: `/api/conversations`,
        method: "POST",
        body: data,
      }),
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/api/messages`,
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query({
      query: (params) => ({
        url: `/api/messages?${params}`,
        method: "GET",
      }),
    }),
    getSeries: builder.query({
      query: (params) => ({
        url: `/api/series?${params}`,
        method: "GET",
      }),
    }),
    createPop: builder.mutation({
      query: (data) => {
        return {
          url: "/api/pops",
          method: "POST",
          body: data,
          formData: true,
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        };
      },
      invalidatesTags: ["me"],
    }),
    createSuggestion: builder.mutation({
      query: (data) => {
        return {
          url: "/api/suggestions",
          method: "POST",
          body: data,
        };
      },
    }),
    createReport: builder.mutation({
      query: (data) => {
        return {
          url: "/api/reports",
          method: "POST",
          body: data,
        };
      },
    }),
    createMsg: builder.mutation({
      query: (data) => {
        return {
          url: "/api/messages",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["me"],
    }),
    updateUser: builder.mutation({
      query: (params) => {
        return {
          url: `/api/users/${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
    }),
    updatePop: builder.mutation({
      query: (params) => {
        return {
          url: `/api/pops/${params.id}`,
          method: "PUT",
          body: params.data,
          formData: true,
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        };
      },
      invalidatesTags: ["me"],
    }),
    removePop: builder.mutation({
      query: (params) => ({
        url: `/api/pops/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["me"],
    }),
    uploadFile: builder.mutation({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: (params) => ({
        url: `/api/users/me?${params}`,
        method: "GET",
      }),
      providesTags: ["me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetPopsQuery,
  useCreatePopMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useGetSeriesQuery,
  useUpdateUserMutation,
  useUploadFileMutation,
  useCreateSuggestionMutation,
  useRemovePopMutation,
  useUpdatePopMutation,
  useCreateMsgMutation,
  useGetConversationsQuery,
  useLazyGetConversationsQuery,
  useCreateConversationsMutation,
  useCreateMessageMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useCreateReportMutation,
} = api;
