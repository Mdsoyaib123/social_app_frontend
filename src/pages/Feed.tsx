import logo from "../assets/images/logo.svg";
import profileImg from "../assets/images/profile.png";
import postImg from "../assets/images/post_img.png";
import timelineImg from "../assets/images/timeline_img.png";
import card_ppl1 from "../assets/images/card_ppl1.png";
import card_ppl2 from "../assets/images/card_ppl2.png";
import card_ppl3 from "../assets/images/card_ppl3.png";
import card_ppl4 from "../assets/images/card_ppl4.png";
import Avatar from "../assets/images/Avatar.png";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  FiPlay,
  FiBarChart2,
  FiUserPlus,
  FiBookmark,
  FiUsers,
  FiSettings,
  FiSave,
} from "react-icons/fi";
import { MdOutlineSportsEsports } from "react-icons/md";

const stories = [card_ppl1, card_ppl2, card_ppl3, card_ppl4];

const Feed = () => {
  const [search, setSearch] = useState("");

  const user = {
    name: "Dylan Field",
    avatar: profileImg,
  };

  const post = {
    author: "Karim Saif",
    time: "5 minute ago",
    visibility: "Public",
    text: "-Healthy Tracking App",
    likes: 198,
    comments: 12,
    shares: 122,
    image: timelineImg,
  };
  const friendsData = [
    { name: "Steve Jobs", role: "CEO", avatar: Avatar, online: true },
    { name: "Elon Musk", role: "Founder", avatar: Avatar, online: true },
    { name: "Mark Zuckerberg", role: "CEO", avatar: Avatar, online: false },
    { name: "Bill Gates", role: "Co-founder", avatar: Avatar, online: true },
    { name: "Bill ", role: "Co-owner", avatar: Avatar, online: true },
    { name: "Steve Jobs", role: "CEO", avatar: Avatar, online: true },
    { name: "Bill Gates", role: "Co-founder", avatar: Avatar, online: true },
    { name: "Jeff Bezos", role: "Entrepreneur", avatar: Avatar, online: false },
  ];
  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Poppins']">
      {/* NAVBAR */}
      <Navbar logo={logo} user={user} />

      {/* MAIN */}
      <div className="pt-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <aside className="col-span-3 hidden lg:block">
            <div className="space-y-6 sticky top-24">

              {/* EXPLORE */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h4 className="font-semibold text-lg mb-6">Explore</h4>

            <ul className="space-y-5 text-gray-600">

  <li className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <FiPlay className="text-lg text-gray-500" />
      <span className="text-sm font-medium">Learning</span>
    </div>
    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
      New
    </span>
  </li>

  <li className="flex items-center gap-3">
    <FiBarChart2 className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Insights</span>
  </li>

  <li className="flex items-center gap-3">
    <FiUserPlus className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Find friends</span>
  </li>

  <li className="flex items-center gap-3">
    <FiBookmark className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Bookmarks</span>
  </li>

  <li className="flex items-center gap-3">
    <FiUsers className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Group</span>
  </li>

  <li className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <MdOutlineSportsEsports className="text-lg text-gray-500" />
      <span className="text-sm font-medium">Gaming</span>
    </div>
    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
      New
    </span>
  </li>

  <li className="flex items-center gap-3">
    <FiSettings className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Settings</span>
  </li>

  <li className="flex items-center gap-3">
    <FiSave className="text-lg text-gray-500" />
    <span className="text-sm font-medium">Save post</span>
  </li>

</ul>
              </div>

              {/* SUGGESTED PEOPLE */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="font-semibold text-lg">Suggested People</h4>
                  <span className="text-[#1b8fff] text-sm cursor-pointer">
                    See All
                  </span>
                </div>

                <div className="space-y-5">

                  {/* PERSON */}
                  {[
                    { name: "Steve Jobs", role: "CEO of Apple" },
                    { name: "Ryan Roslansky", role: "CEO of Linkedin" },
                    { name: "Dylan Field", role: "CEO of Figma" },
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <img
                          src={Avatar}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={person.name}
                        />
                        <div>
                          <p className="text-sm font-medium">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.role}</p>
                        </div>
                      </div>

                      <button className="text-sm px-4 py-1 border rounded-lg text-gray-500 hover:bg-gray-100">
                        Connect
                      </button>

                    </div>
                  ))}

                </div>
              </div>

            </div>
          </aside>

          {/* FEED */}
          <main className="col-span-12 lg:col-span-6">
            {/* STORIES */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex gap-4 overflow-x-auto">
                <div className="min-w-[120px] h-[170px] bg-[#1b8fff] rounded-xl flex flex-col items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-white text-[#1b8fff] flex items-center justify-center text-xl font-bold mb-2">
                    +
                  </div>
                  <span className="text-sm font-medium">Your Story</span>
                </div>

                {stories.map((img, i) => (
                  <div
                    key={i}
                    className="min-w-[120px] h-[170px] rounded-xl overflow-hidden relative"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover absolute inset-0"
                      alt="story"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <img
                      src={img}
                      className="w-8 h-8 rounded-full border-2 border-white absolute top-3 right-3 object-cover"
                      alt="story user"
                    />

                    <span className="absolute bottom-3 left-3 text-white text-xs font-medium">
                      User
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CREATE POST */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <div className="flex gap-3 mb-4">
                <img src={profileImg} className="w-10 h-10 rounded-full" alt="me" />
                <input
                  placeholder="What's on your mind?"
                  className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-600">
                <div className="flex gap-6">
                  <span>Photo</span>
                  <span>Video</span>
                  <span>Event</span>
                  <span>Article</span>
                </div>

                <button className="bg-[#1b8fff] hover:bg-[#0f7ae5] text-white px-5 py-2 rounded-lg">
                  Post
                </button>
              </div>
            </div>

            {/* POST */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 flex justify-between">
                <div className="flex gap-3">
                  <img src={postImg} className="w-10 h-10 rounded-full" alt="post" />
                  <div>
                    <p className="font-medium text-sm">{post.author}</p>
                    <p className="text-xs text-gray-500">
                      {post.time} • {post.visibility}
                    </p>
                  </div>
                </div>
                <button>⋮</button>
              </div>

              <div className="px-5 pb-3 text-sm">{post.text}</div>

              <img src={post.image} alt="post" />

              <div className="px-5 py-3 flex justify-between text-sm text-gray-500 border-t">
                <span>❤️ {post.likes}</span>
                <span>
                  {post.comments} Comments • {post.shares} Shares
                </span>
              </div>

              <div className="border-t flex text-sm">
                <button className="flex-1 py-3 hover:bg-gray-50 text-[#1b8fff]">
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
          </main>

          {/* RIGHT */}
          {/* RIGHT */}
          <aside className="col-span-3 hidden lg:block">
            <div className="space-y-6 sticky top-24">

              {/* YOU MIGHT LIKE */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">You Might Like</h4>
                  <span className="text-[#1b8fff] text-sm cursor-pointer">See All</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <img
                      src={Avatar}
                      className="w-12 h-12 rounded-full object-cover"
                      alt="avatar"
                    />
                    <div>
                      <p className="text-sm font-medium">Radovan SkillArena</p>
                      <p className="text-xs text-gray-500">
                        Founder & CEO at Trophy
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs border rounded-lg text-gray-500 hover:bg-gray-100">
                      Ignore
                    </button>
                    <button className="px-3 py-1 text-xs bg-[#1b8fff] text-white rounded-lg hover:bg-[#0f7ae5]">
                      Follow
                    </button>
                  </div>
                </div>
              </div>

              {/* YOUR FRIENDS */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Your Friends</h4>
                  <span className="text-[#1b8fff] text-sm cursor-pointer">
                    See All
                  </span>
                </div>

                {/* SEARCH */}
                <div className="mb-4">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <span className="text-gray-400 text-sm mr-2">🔍</span>
                    <input
                      type="text"
                      placeholder="input search text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-transparent outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* FRIEND LIST */}
                <div className="space-y-4">
                  {filteredFriends.map((friend, index) => (
                    <div key={index} className="flex justify-between items-center">

                      {/* LEFT */}
                      <div className="flex gap-3 items-center">
                        <img
                          src={friend.avatar}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={friend.name}
                        />
                        <div>
                          <p className="font-medium text-sm">{friend.name}</p>
                          <p className="text-xs text-gray-400">
                            {friend.role}
                          </p>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="flex items-center gap-2">
                        {friend.online ? (
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
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
        </div>
      </div>
    </div>
  );
};

export default Feed;