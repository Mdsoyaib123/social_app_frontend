import { baseApi } from "../../hooks/baseApi";

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* ---------------- CREATE POST ---------------- */
        createPost: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: "/post/create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Post"],
        }),

        /* ---------------- GET FEED ---------------- */
        getFeed: builder.query<any, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/post/feeds?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),

        /* =================================================
           ✅ UPDATE POST (text + image)
        ================================================= */
        updatePost: builder.mutation<
            any,
            { postId: string; data: FormData }
        >({
            query: ({ postId, data }) => ({
                url: `/post/updatePost/${postId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Post"],
        }),

        /* =================================================
           ✅ UPDATE VISIBILITY (public/private)
        ================================================= */
        updatePostVisibility: builder.mutation<
            any,
            { postId: string; isPrivate: boolean }
        >({
            query: ({ postId, isPrivate }) => ({
                url: `/post/updateVisibility`,
                method: "PATCH",
                body: { postId, isPrivate },
            }),
            invalidatesTags: ["Post"],
        }),

        /* =================================================
           ✅ DELETE POST
        ================================================= */
        deletePost: builder.mutation<any, { postId: string }>({
            query: ({ postId }) => ({
                url: `/post/deletePost/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetFeedQuery,
    useUpdatePostMutation,
    useUpdatePostVisibilityMutation,
    useDeletePostMutation,
} = postApi;