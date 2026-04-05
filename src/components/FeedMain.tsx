import { useEffect, useState } from "react";
import profileImg from "../../public/profile.jpg";
import {
    useCreatePostMutation,
    useGetFeedQuery,
    useUpdatePostMutation,
    useUpdatePostVisibilityMutation,
    useDeletePostMutation,
} from "../redux/features/post/postApi";
import toast from "react-hot-toast";
import { EllipsisVertical, UserLock } from "lucide-react";
import { selectCurrentUser, useAppSelector } from "../redux/hooks/redux-hook";
import { useGetLikeCountQuery, useGetLikesQuery, useToggleLikeMutation } from "../redux/features/like/likeApi";
import { useCreateCommentMutation, useGetCommentsQuery } from "../redux/features/comment/commentApi";
import CommentItem from "./CommentItem";
import { CommentSkeleton } from "./CommentSkeleton";

/* ---------------- TYPES ---------------- */

type Story = string;

type Post = {
    _id: string;
    text?: string;
    image?: string;
    isPrivate: boolean;
    createdAt: string;
    authorId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
};

type Props = {
    stories: Story[];
};

/* ---------------- STORY ---------------- */

const StoryItem = ({ img }: { img: string }) => {
    return (
        <div className="relative min-w-[120px] h-[170px] overflow-hidden rounded-xl">
            <img
                src={img}
                alt="story"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <img
                src={img}
                alt="story user"
                className="absolute top-3 right-3 h-8 w-8 rounded-full border-2 border-white object-cover"
            />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
                User
            </span>
        </div>
    );
};

/* ---------------- POST CARD ---------------- */


const PostCard = ({ post }: { post: Post }) => {
    const currentUserId = useAppSelector(selectCurrentUser);


    const isOwner = currentUserId === post.authorId?._id;

    const [open, setOpen] = useState(false);
    const fullName = `${post.authorId?.firstName || ""} ${post.authorId?.lastName || ""
        }`;

    const time = new Date(post.createdAt).toLocaleString();
    const [updatePost] = useUpdatePostMutation();
    const [updateVisibility] = useUpdatePostVisibilityMutation();
    const [deletePost] = useDeletePostMutation();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editText, setEditText] = useState(post.text || "");
    const [editImage, setEditImage] = useState<File | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [preview, setPreview] = useState<string | null>(post.image || null);


    //like api's 
    const [toggleLike] = useToggleLikeMutation();
    const { data: likeData } = useGetLikeCountQuery({
        targetId: post._id,
        targetType: "Post",
    });
    const { data: likesUserData } = useGetLikesQuery({
        targetId: post._id,
        targetType: "Post",
    });
    // console.log("likesUserData", likesUserData);

    //like state 
    const [likeCount, setLikeCount] = useState(0);
  
    const [showLikes, setShowLikes] = useState(false);
    const currentUserLiked = likesUserData?.data || []
    const isLikedByMe = currentUserLiked?.some(
        (like: any) => like.userId?._id === currentUserId
    );

    const handleLike = async () => {
        try {
            const res = await toggleLike({
                targetId: post._id,
                targetType: "Post",
            }).unwrap();

            if (res.liked) {
               
                setLikeCount((prev) => prev + 1);
            } else {
               
                setLikeCount((prev) => Math.max(0, prev - 1));
            }
        } catch (err) {
            console.log("Like error:", err);
        }
    };

    useEffect(() => {
        if (likeData?.data?.count !== undefined) {
            setLikeCount(likeData.data.count);
        }
    }, [likeData]);


    //comment 
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [createComment] = useCreateCommentMutation();
    const { data: commentsData, isLoading: isCommentsLoading } = useGetCommentsQuery(post._id, {
        skip: !showComments,
    });

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            await createComment({
                postId: post._id,
                text: commentText,
            }).unwrap();

            setCommentText("");
        } catch (err) {
            console.log(err);
        }
    };


    //posts 
    const closeModal = () => {
        setIsEditOpen(false);
        setEditText(post.text || "");
        setEditImage(null);
        setPreview(post.image || null);
    };

    const handleToggleVisibility = async (postId: string, current: boolean) => {
        try {
            await updateVisibility({
                postId,
                isPrivate: !current,
            }).unwrap();

            toast.success("Post Visibility updated successfully");
            closeModal();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update visibility");
        }
    };

    const handleUpdatePost = async () => {
        try {
            setIsUpdating(true);

            const formData = new FormData();
            formData.append("text", editText);

            if (editImage) {
                formData.append("image", editImage);
            }

            const res = await updatePost({
                postId: post._id,
                data: formData,
            }).unwrap();

            if (res.success) {
                toast.success("Post updated successfully");

                closeModal();
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update post");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeletePost = async (postId: string) => {
        try {
            const res = await deletePost({ postId }).unwrap();
            if (res.success) {
                closeModal();
                toast.success("Post deleted successfully");
            }

        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete post");
        }
    };

    return (
        <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md relative">
            {/* HEADER */}
            <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                    <img
                        src={profileImg}
                        alt="author"
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            {fullName || "Unknown User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {time} • {post.isPrivate ? "Private" : "Public"}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={() => setOpen(true)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <EllipsisVertical />
                    </button>
                )}
            </div>

            {/* TEXT */}
            {post.text && (
                <div className="px-5 pb-3 text-sm text-gray-700 whitespace-pre-wrap">
                    {post.text}
                </div>
            )}

            {/* IMAGE */}
            {post.image && (
                <div className="w-full bg-gray-100">
                    <img
                        src={post.image}
                        alt="post"
                        className="max-h-[500px] w-full object-cover"
                    />
                </div>
            )}
            {/* ACTION STATS */}
            <div className="px-5 pt-2 text-sm text-gray-500">
                <div className="flex justify-between">
                    <button onClick={() => setShowLikes(true)} className="cursor-pointer hover:underline">{likeCount} {likeCount === 1 ? "Like" : "Likes"}</button>
                    {/* <span>{totalComments} {totalComments === 1 ? "Comment" : "Comments"}</span> */}
                </div>
            </div>



            {/* ACTION BUTTONS */}
            <div className="flex border-t text-sm mt-2">
                <button
                    onClick={handleLike}
                    className={`flex-1 cursor-pointer py-3 flex items-center justify-center gap-2 transition rounded-b-xl
    ${isLikedByMe
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "hover:bg-gray-50 text-gray-600"}`}
                >
                    <span className="text-lg">
                        {isLikedByMe ? "👍" : "👍🏻"}
                    </span>

                    Like

                    {likeCount > 0 && (
                        <span className="text-xs text-gray-500">({likeCount})</span>
                    )}
                </button>

                <button
                    onClick={() => setShowComments((prev) => !prev)}
                    className="flex-1 py-3 hover:bg-gray-50"
                >
                    💬 Comment
                </button>

                <button className="flex-1 py-3 hover:bg-gray-50">
                    🔗 Share
                </button>
            </div>


            {open && (
                <>
                    {/* overlay (click outside to close) */}
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-40"
                    />

                    {/* modal */}
                    <div className="absolute right-5 top-16 z-50 w-[260px] rounded-xl bg-white shadow-xl border py-2">


                        <button
                            onClick={() =>
                                handleToggleVisibility(post._id, post.isPrivate)
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                            <UserLock size={15} />
                            {post.isPrivate ? (
                                <span className="text-sm"> Public</span>
                            ) : (
                                <span className="text-sm"> Private</span>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                setIsEditOpen(true);
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                            ✏️ <span className="text-sm">Edit Post</span>
                        </button>

                        <button
                            onClick={() => handleDeletePost(post._id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                            🗑 <span className="text-sm">Delete Post</span>
                        </button>
                    </div>
                </>
            )}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-[500px] rounded-xl bg-white p-5 shadow-xl">

                        {/* TITLE */}
                        <h2 className="mb-4 text-lg font-semibold">Edit Post</h2>

                        {/* TEXT INPUT */}
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="mb-3 h-28 w-full rounded-lg border p-3 text-sm outline-none"
                            placeholder="Update your post..."
                        />

                        {/* IMAGE PREVIEW */}
                        {preview && (
                            <div className="relative mb-3">
                                <img
                                    src={preview}
                                    className="h-[200px] w-full rounded-lg object-cover"
                                />

                                <button
                                    onClick={() => {
                                        setPreview(null);
                                        setEditImage(null);
                                    }}
                                    className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                        {/* FILE INPUT */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    const file = e.target.files[0];
                                    setEditImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            className="mb-4"
                        />

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-lg px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdatePost}
                                disabled={isUpdating}
                                className="rounded-lg bg-[#1b8fff] px-4 py-2 text-sm text-white hover:bg-[#0f7ae5] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isUpdating ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showLikes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-[380px] max-h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden">

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h2 className="text-base font-semibold text-gray-800">
                                Likes ({currentUserLiked.length})
                            </h2>

                            <button
                                onClick={() => setShowLikes(false)}
                                className="text-gray-500 hover:text-gray-700 text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        {/* LIST */}
                        <div className="max-h-[350px] overflow-y-auto px-2 py-2 space-y-1">
                            {currentUserLiked.length > 0 ? (
                                currentUserLiked.map((like: any) => (
                                    <div
                                        key={like._id}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        <img
                                            src={profileImg}
                                            alt="user"
                                            className="w-9 h-9 rounded-full object-cover"
                                        />

                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-800">
                                                {like.userId?.firstName} {like.userId?.lastName}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                Liked this post
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-sm text-gray-500">
                                    No likes yet
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="border-t p-3">
                            <button
                                onClick={() => setShowLikes(false)}
                                className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showComments && (
                <div className="px-5 py-4 border-t space-y-4">

                    {/* ADD COMMENT */}
                    <div className="flex gap-2">
                        <img src={profileImg} className="w-8 h-8 rounded-full" />

                        <div className="flex-1 flex gap-2">
                            <input
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 px-3 py-2 rounded-full bg-gray-100 text-sm outline-none"
                            />

                            <button
                                onClick={handleAddComment}
                                className="text-blue-500 text-sm"
                            >
                                Post
                            </button>
                        </div>
                    </div>

                    {/* COMMENTS LIST */}
                    <div className="space-y-2">
                        {/* LOADING STATE */}
                        {isCommentsLoading &&
                            Array.from({ length: 3 }).map((_, i) => (
                                <CommentSkeleton key={i} />
                            ))}

                        {/* DATA */}
                        {!isCommentsLoading &&
                            commentsData?.data?.map((comment: any) => (
                                <CommentItem key={comment._id} comment={comment} />
                            ))}
                    </div>
                </div>
            )}

        </div>
    );
};

/* ---------------- FEED MAIN ---------------- */

const FeedMain = ({ stories }: Props) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileName = image ? image.name : "";

    const [createPost, { isLoading: isCreatingPost }] =
        useCreatePostMutation();

    const {
        data,
        isLoading: isFeedLoading,
    } = useGetFeedQuery({ page: 1, limit: 10 });


    const posts: Post[] = data?.data || [];

    /* ---------------- CREATE POST ---------------- */
    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleCreatePost = async () => {
        if (!text.trim() && !image) return;

        try {
            const formData = new FormData();
            formData.append("text", text);

            if (image) {
                formData.append("image", image);
            }

            const res = await createPost(formData).unwrap();

            if (res.success) {
                toast.success("Post created successfully!");
            }

            setText("");
            setImage(null);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create post");
        }
    };



    return (
        <main className="col-span-12 lg:col-span-6">
            {/* ---------------- STORIES ---------------- */}
            <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex gap-4 overflow-x-auto">
                    <div className="flex h-[170px] min-w-[120px] flex-col items-center justify-center rounded-xl bg-[#1b8fff] text-white">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#1b8fff]">
                            +
                        </div>
                        <span className="text-sm font-medium">Your Story</span>
                    </div>

                    {stories.map((img) => (
                        <StoryItem key={img} img={img} />
                    ))}
                </div>
            </div>

            {/* ---------------- CREATE POST ---------------- */}
            <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex gap-3">
                    <img
                        src={profileImg}
                        alt="me"
                        className="h-10 w-10 rounded-full"
                    />

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's on your mind?"
                        className="flex-1 rounded-full bg-gray-100 px-4 text-sm focus:outline-none"
                    />
                </div>

                <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-600">
                    <div className="flex gap-6">
                        <label className="cursor-pointer flex items-center gap-2">
                            Photo

                            {fileName && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 max-w-[120px] truncate">
                                        {fileName}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault(); // prevents file dialog
                                            handleRemoveImage();
                                        }}
                                        className="text-xs text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>

                        <button>Video</button>
                        <button>Event</button>
                        <button>Article</button>
                    </div>

                    <button
                        onClick={handleCreatePost}
                        disabled={isCreatingPost}
                        className="cursor-pointer rounded-lg bg-[#1b8fff] px-5 py-2 text-white hover:bg-[#0f7ae5]"
                    >
                        {isCreatingPost ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>

            {/* ---------------- FEED ---------------- */}

            {isFeedLoading ? (
                <div className="space-y-4">
                    <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
                </div>
            ) : (
                posts.map((item) => (
                    <PostCard key={item._id} post={item} />
                ))
            )}
        </main>
    );
};

export default FeedMain;