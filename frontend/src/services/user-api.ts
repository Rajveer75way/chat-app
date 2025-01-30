import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens, resetTokens } from '../store/reducers/authReducer';
import { LoginRequest, LoginResponse, User } from '../types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/graphql', // Use your GraphQL endpoint here
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/graphql',
          method: 'POST',
          body: {
            query: `
              mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken)
              }
            `,
            variables: {
              refreshToken,
            },
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } = (
          refreshResult.data as LoginResponse
        ).data.tokens;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        api.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(resetTokens());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const navigate = useNavigate();
        navigate('/login'); // Redirect to login page if refresh fails
      }
    } else {
      api.dispatch(resetTokens());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      const navigate = useNavigate();
      navigate('/login'); // Redirect to login page if no refresh token found
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signup: builder.mutation<User, User>({
      query: (userData) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Signup($userData: UserInput!) {
              signup(userData: $userData) {
                id
                name
                email
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            userData,
          },
        },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Login($loginData: LoginInput!) {
              login(loginData: $loginData) {
                id
                name
                email
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            loginData: credentials,
          },
        },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data && data.data) {
            const { accessToken, refreshToken } = data.data;
            dispatch(setTokens({ accessToken, refreshToken }));
          } else {
            console.error('Tokens missing in the response');
          }
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation RefreshToken($refreshToken: String!) {
              refreshToken(refreshToken: $refreshToken)
            }
          `,
          variables: {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Logout($refreshToken: String!) {
              logout(refreshToken: $refreshToken)
            }
          `,
          variables: {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        },
      }),
    }),
    subscribe: builder.mutation({
      query: (planId) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Subscribe($planId: String!) {
              subscribe(planId: $planId) {
                id
                name
                description
              }
            }
          `,
          variables: {
            planId,
          },
        },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation,
  useSubscribeMutation, // Ensure this is exported
} = api;
