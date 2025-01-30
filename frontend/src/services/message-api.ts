import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-tag';

const graphqlBaseQuery = (baseUrl: string) => {
  return async ({ body, ...args }: any) => {
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: body, variables: args.variables }),
    });

    return response.json();
  };
};

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: graphqlBaseQuery('http://localhost:8000/graphql'),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, { content: string, receiverId: string, media?: string }>({
      query: ({ content, receiverId, media }) => ({
        body: gql`
          mutation SendMessage($messageData: MessageInput!) {
            sendMessage(messageData: $messageData) {
              id
              senderId
              receiverId
              content
              media
              createdAt
            }
          }
        `,
        variables: {
          messageData: { content, receiverId, media },
        },
      }),
    }),

    getMessages: builder.query<any, { senderId: string, receiverId: string }>({
      query: ({ senderId, receiverId }) => ({
        body: gql`
          query GetMessages($senderId: ID!, $receiverId: ID!) {
            getMessages(senderId: $senderId, receiverId: $receiverId) {
              id
              senderId
              receiverId
              content
              media
              createdAt
            }
          }
        `,
        variables: { senderId, receiverId },
      }),
    }),

    subscribeToMessages: builder.subscription<any, { receiverId: string }>({
      query: ({ receiverId }) => ({
        body: gql`
          subscription MessageSent($receiverId: ID!) {
            messageSent(receiverId: $receiverId) {
              id
              senderId
              receiverId
              content
              media
              createdAt
            }
          }
        `,
        variables: { receiverId },
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useSubscribeToMessagesSubscription,
} = messageApi;
