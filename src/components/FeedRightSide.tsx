import Avatar from "../assets/images/Avatar.png";

type Friend = {
    name: string;
    role: string;
    avatar: string;
    online: boolean;
};

type Props = {
    search: string;
    setSearch: (value: string) => void;
    filteredFriends: Friend[];
};

const FeedRightSide = ({ search, setSearch, filteredFriends }: Props) => {
    return (
        <aside className="col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-semibold">You Might Like</h4>
                        <span className="cursor-pointer text-sm text-[#1b8fff]">
                            See All
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={Avatar}
                                alt="avatar"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">Radovan SkillArena</p>
                                <p className="text-xs text-gray-500">
                                    Founder & CEO at Trophy
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="rounded-lg border px-3 py-1 text-xs text-gray-500 hover:bg-gray-100">
                                Ignore
                            </button>
                            <button className="rounded-lg bg-[#1b8fff] px-3 py-1 text-xs text-white hover:bg-[#0f7ae5]">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-semibold">Your Friends</h4>
                        <span className="cursor-pointer text-sm text-[#1b8fff]">
                            See All
                        </span>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
                            <span className="mr-2 text-sm text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="input search text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredFriends.map((friend) => (
                            <div
                                key={friend.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={friend.avatar}
                                        alt={friend.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{friend.name}</p>
                                        <p className="text-xs text-gray-400">{friend.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {friend.online ? (
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            5 minute ago
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FeedRightSide;