import { useMemo, useState } from "react";

import logo from "../assets/images/logo.svg";
import card_ppl1 from "../assets/images/card_ppl1.png";
import card_ppl2 from "../assets/images/card_ppl2.png";
import card_ppl3 from "../assets/images/card_ppl3.png";
import card_ppl4 from "../assets/images/card_ppl4.png";
import Avatar from "../assets/images/Avatar.png";

import Navbar from "../components/Navbar";
import FeedLeftSideBar from "../components/FeedLeftSide";
import FeedRightSide from "../components/FeedRightSide";
import FeedMain from "../components/FeedMain";

const STORIES = [card_ppl1, card_ppl2, card_ppl3, card_ppl4];



const FRIENDS_DATA = [
  { name: "Steve Jobs", role: "CEO", avatar: Avatar, online: true },
  { name: "Elon Musk", role: "Founder", avatar: Avatar, online: true },
  { name: "Mark Zuckerberg", role: "CEO", avatar: Avatar, online: false },
  { name: "Bill Gates", role: "Co-founder", avatar: Avatar, online: true },
  { name: "Bill", role: "Co-owner", avatar: Avatar, online: true },
  { name: "Steve Jobs", role: "CEO", avatar: Avatar, online: true },
  { name: "Bill Gates", role: "Co-founder", avatar: Avatar, online: true },
  { name: "Jeff Bezos", role: "Entrepreneur", avatar: Avatar, online: false },
];

const Feed = () => {
  const [search, setSearch] = useState("");

  const filteredFriends = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return FRIENDS_DATA;

    return FRIENDS_DATA.filter((friend) =>
      friend.name.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Poppins']">
      <Navbar logo={logo} />

      <div className="pt-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          <FeedLeftSideBar />
          <FeedMain stories={STORIES}  />
          <FeedRightSide
            search={search}
            setSearch={setSearch}
            filteredFriends={filteredFriends}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;