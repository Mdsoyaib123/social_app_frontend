import { baseApi } from "../../hooks/baseApi";

export const likeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleLike: builder.mutation<
            any,
            { targetId: string; targetType: "Post" | "Comment" }
        >({
            query: (body) => ({
                url: "/like",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Like", "Post"],
        }),

        getLikeCount: builder.query<
            any,
            { targetId: string; targetType: "Post" | "Comment" }
        >({
            query: ({ targetId, targetType }) => ({
                url: `/like/count?targetId=${targetId}&targetType=${targetType}`,
                method: "GET",
            }),
            providesTags: ["Like"],
        }),

        getLikes: builder.query<
            any,
            { targetId: string; targetType: "Post" | "Comment" }
        >({
            query: ({ targetId, targetType }) => ({
                url: `/like/users?targetId=${targetId}&targetType=${targetType}`,
                method: "GET",
            }),
            providesTags: ["Like"],
        }),
    }),
});

export const {
    useToggleLikeMutation,
    useGetLikeCountQuery,
    useGetLikesQuery,
} = likeApi;