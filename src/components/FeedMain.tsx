import profileImg from "../assets/images/profile.png";

type Story = string;

type Post = {
    author: string;
    time: string;
    visibility: string;
    text: string;
    likes: number;
    comments: number;
    shares: number;
    image: string;
    avatar?: string;
};

type Props = {
    stories: Story[];
    post: Post;
};

const StoryItem = ({ img }: { img: string }) => {
    return (
        <div className="relative min-w-[120px] h-[170px] overflow-hidden rounded-xl">
            <img src={img} alt="story" className="absolute inset-0 h-full w-full object-cover" />
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

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex justify-between p-5">
                <div className="flex gap-3">
                    <img
                        src={post.avatar || profileImg}
                        alt="author"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-gray-500">
                            {post.time} • {post.visibility}
                        </p>
                    </div>
                </div>
                <button>⋮</button>
            </div>

            <div className="px-5 pb-3 text-sm">{post.text}</div>

            <img src={post.image} alt="post" className="w-full" />

            <div className="flex justify-between border-t px-5 py-3 text-sm text-gray-500">
                <span>❤️ {post.likes}</span>
                <span>
                    {post.comments} Comments • {post.shares} Shares
                </span>
            </div>

            <div className="flex border-t text-sm">
                <button className="flex-1 py-3 text-[#1b8fff] hover:bg-gray-50">
                    Like
                </button>
                <button className="flex-1 py-3 hover:bg-gray-50">
                    Comment
                </button>
                <button className="flex-1 py-3 hover:bg-gray-50">
                    Share
                </button>
            </div>
        </div>
    );
};

const FeedMain = ({ stories, post }: Props) => {
    return (
        <main className="col-span-12 lg:col-span-6">
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

            <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex gap-3">
                    <img src={profileImg} alt="me" className="h-10 w-10 rounded-full" />
                    <input
                        placeholder="What's on your mind?"
                        className="flex-1 rounded-full bg-gray-100 px-4 text-sm focus:outline-none"
                    />
                </div>

                <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-600">
                    <div className="flex gap-6">
                        <span>Photo</span>
                        <span>Video</span>
                        <span>Event</span>
                        <span>Article</span>
                    </div>

                    <button className="rounded-lg bg-[#1b8fff] px-5 py-2 text-white hover:bg-[#0f7ae5]">
                        Post
                    </button>
                </div>
            </div>

            <PostCard post={post} />
            <PostCard post={post} />
        </main>
    );
};

export default FeedMain;