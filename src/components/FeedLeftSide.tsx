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

import Avatar from "../assets/images/Avatar.png";

const EXPLORE_ITEMS = [
    { icon: FiPlay, label: "Learning", badge: "New" },
    { icon: FiBarChart2, label: "Insights" },
    { icon: FiUserPlus, label: "Find friends" },
    { icon: FiBookmark, label: "Bookmarks" },
    { icon: FiUsers, label: "Group" },
    { icon: MdOutlineSportsEsports, label: "Gaming", badge: "New" },
    { icon: FiSettings, label: "Settings" },
    { icon: FiSave, label: "Save post" },
];

const SUGGESTED_PEOPLE = [
    { name: "Steve Jobs", role: "CEO of Apple" },
    { name: "Ryan Roslansky", role: "CEO of LinkedIn" },
    { name: "Dylan Field", role: "CEO of Figma" },
];

const FeedLeftSideBar = () => {
    return (
        <aside className="col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="mb-6 text-lg font-semibold">Explore</h4>

                    <ul className="space-y-5 text-gray-600">
                        {EXPLORE_ITEMS.map(({ icon: Icon, label, badge }) => (
                            <li
                                key={label}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="text-lg text-gray-500" />
                                    <span className="text-sm font-medium">{label}</span>
                                </div>

                                {badge && (
                                    <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                                        {badge}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Suggested People</h4>
                        <span className="cursor-pointer text-sm text-[#1b8fff]">
                            See All
                        </span>
                    </div>

                    <div className="space-y-5">
                        {SUGGESTED_PEOPLE.map((person) => (
                            <div
                                key={person.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={Avatar}
                                        alt={person.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{person.name}</p>
                                        <p className="text-xs text-gray-500">{person.role}</p>
                                    </div>
                                </div>

                                <button className="rounded-lg border px-4 py-1 text-sm text-gray-500 hover:bg-gray-100">
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FeedLeftSideBar;