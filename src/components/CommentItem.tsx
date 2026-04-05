import { useState } from "react";
import {
    useCreateCommentMutation,
    useGetRepliesQuery,
} from "../redux/features/comment/commentApi";
import profileImg from "../../public/profile.jpg";
import timeAgo from "./TimeAgo";
import { useGetLikeCountQuery, useGetLikesQuery, useToggleLikeMutation } from "../redux/features/like/likeApi";
import { selectCurrentUser, useAppSelector } from "../redux/hooks/redux-hook";

const groupRepliesByUser = (replies: any[] = []) => {
    const grouped: Record<string, any> = {};

    replies.forEach((reply) => {
        const userId = reply.authorId?._id;

        if (!grouped[userId]) {
            grouped[userId] = {
                user: reply.authorId,
                replies: [],
            };
        }

        grouped[userId].replies.push(reply);
    });

    return Object.values(grouped);
};


const CommentItem = ({ comment, depth = 0 }: any) => {
    const currentUserId = useAppSelector(selectCurrentUser);
    const [toggleLike] = useToggleLikeMutation();
    const { data: likeData, refetch } = useGetLikeCountQuery({
        targetId: comment._id,
        targetType: "Comment",
    });
    const likeCount = likeData?.data?.count || 0;


    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState("");

    const {
        data: repliesData,
        isLoading: isRepliesLoading,
        isFetching: isRepliesFetching,
    } = useGetRepliesQuery(comment._id, {
        skip: !showReplies,
    });

    const [createComment, { isLoading: isReplying }] =
        useCreateCommentMutation();


    const [showLikesHover, setShowLikesHover] = useState(false);
    const { data: likesUserData } = useGetLikesQuery(
        {
            targetId: comment._id,
            targetType: "Comment",
        }
    );

    const isLikedByMe = likesUserData?.data?.some(
        (like: any) => like.userId?._id === currentUserId
    );


    const handleReply = async () => {
        if (!replyText.trim()) return;

        await createComment({
            postId: comment.postId,
            text: replyText,
            parentCommentId: comment._id,
        });

        setReplyText("");
        setShowReplies(true);
    };
    const handleLike = async () => {
        try {
            await toggleLike({
                targetId: comment._id,
                targetType: "Comment",
            }).unwrap();

            // refresh like count after toggle
            refetch();
        } catch (err) {
            console.log("Like error:", err);
        }
    };
    return (
        <div className="relative flex gap-3 mt-4 group">
            {/* THREAD LINE */}
            {depth > 0 && (
                <div
                    className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-200"
                    style={{ transform: "translateX(-50%)" }}
                />
            )}

            {/* AVATAR */}
            <div style={{ marginLeft: depth * 16 }}>
                <img
                    src={profileImg}
                    className="w-9 h-9 rounded-full object-cover border"
                />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
                {/* COMMENT */}
                <div className="bg-gray-100 hover:bg-gray-200 transition rounded-2xl px-4 py-2">
                    <p className="text-sm font-semibold text-gray-800">
                        {comment.authorId?.firstName}{" "}
                        {comment.authorId?.lastName}
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                        {comment.text}
                    </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 pl-1">

                    {/* LIKE BUTTON (UI unchanged, only count added) */}
                    <button
                        onClick={handleLike}
                        onMouseEnter={() => setShowLikesHover(true)}
                        onMouseLeave={() => setShowLikesHover(false)}
                        className={`hover:underline flex items-center gap-1 cursor-pointer transition ${isLikedByMe ? "text-blue-500 font-semibold" : "text-gray-600"
                            }`}
                    >
                        {isLikedByMe ? "Liked" : "Like"}

                        {likeCount > 0 && (
                            <span className="text-gray-400">
                                ({likeCount})
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setShowReplies((prev) => !prev)}
                        className="hover:underline"
                    >
                        Reply
                    </button>

                    <span>•</span>

                    <span>{timeAgo(comment.createdAt)}</span>
                </div>

                {/* REPLY INPUT */}
                {showReplies && (
                    <div className="mt-3 flex items-center gap-2">
                        <img
                            src={profileImg}
                            className="w-7 h-7 rounded-full"
                        />

                        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1">
                            <input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 bg-transparent text-sm outline-none"
                            />

                            <button
                                onClick={handleReply}
                                disabled={isReplying}
                                className="text-blue-500 text-xs font-medium hover:text-blue-600 disabled:opacity-50"
                            >
                                {isReplying ? (
                                    <span className="flex items-center gap-1">
                                        <svg
                                            className="w-3 h-3 animate-spin"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                                className="opacity-25"
                                            />
                                            <path
                                                fill="currentColor"
                                                className="opacity-75"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Sending
                                    </span>
                                ) : (
                                    "Send"
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* 🔥 REPLIES SECTION */}
                {showReplies && (
                    <div className="mt-3">
                        {/* LOADING STATE */}
                        {(isRepliesLoading || isRepliesFetching) && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 ml-2">
                                <svg
                                    className="w-4 h-4 animate-spin"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        className="opacity-25"
                                    />
                                    <path
                                        fill="currentColor"
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Loading replies...
                            </div>
                        )}

                        {/* EMPTY STATE */}
                        {!isRepliesLoading &&
                            repliesData?.data?.length === 0 && (
                                <p className="text-xs text-gray-400 ml-2">
                                    No replies yet
                                </p>
                            )}

                        {/* REPLIES LIST */}
                        {groupRepliesByUser(repliesData?.data || []).map((group: any) => (
                            <div key={group.user?._id} className="mt-3">

                                {/* USER LABEL (not UI replacement, just grouping hint) */}
                                <div className="flex items-center gap-2 mb-2 ml-2">
                                    <img
                                        src={profileImg}
                                        className="w-7 h-7 rounded-full border"
                                    />

                                    <p className="text-xs font-semibold text-gray-700">
                                        {group.user?.firstName} {group.user?.lastName}
                                    </p>
                                </div>

                                {/* KEEP YOUR ORIGINAL COMMENT UI COMPLETELY INTACT */}
                                <div className="space-y-3 ml-2">
                                    {group.replies.map((reply: any) => (
                                        <CommentItem
                                            key={reply._id}
                                            comment={reply}
                                            depth={depth + 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showLikesHover && likeCount > 0 && (
                    <div className="absolute bottom-full mb-2 left-0 w-64 bg-white shadow-xl rounded-xl border p-3 z-50">
                        <p className="text-xs text-gray-400 mb-2">
                            Liked by
                        </p>

                        <div className="space-y-2">
                            {likesUserData?.data?.slice(0, 5).map((like: any) => (
                                <div
                                    key={like._id}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={
                                            profileImg
                                        }
                                        alt="user"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />

                                    <span className="text-sm text-gray-700 font-medium">
                                        {like.userId?.firstName} {like.userId?.lastName}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {likeCount > 5 && (
                            <p className="text-xs text-gray-400 mt-2">
                                +{likeCount - 5} more
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;