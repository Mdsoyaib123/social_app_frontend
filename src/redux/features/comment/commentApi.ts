import { baseApi } from "../../hooks/baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<
      any,
      { postId: string; text: string; parentCommentId?: string | null }
    >({
      query: ({ postId, ...body }) => ({
        url: `/comment/create/${postId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),

    getComments: builder.query<any, string>({
      query: (postId) => ({
        url: `/comment/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    getReplies: builder.query<any, string>({
      query: (commentId) => ({
        url: `/comment/replies/${commentId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    updateComment: builder.mutation<
      any,
      { commentId: string; text: string }
    >({
      query: ({ commentId, text }) => ({
        url: `/comment/update/${commentId}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation<any, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comment/delete/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetRepliesQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;