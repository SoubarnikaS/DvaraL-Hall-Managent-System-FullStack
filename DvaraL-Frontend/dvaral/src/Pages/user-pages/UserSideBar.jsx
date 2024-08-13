import React from "react";
import { Search, BookMarked, Heart, Mail, LayoutDashboard } from "lucide-react";


const Sidebar = () => {
    const sidebarLinks = [
        { name: "Dashboard", icon: LayoutDashboard, href : "/dashboard" },
        { name: "Explore Halls", icon: Search, href : "/explore-page" },
        { name: "Reserved Halls", icon: BookMarked, href : "/reserved-halls"},
        { name: "Favourites", icon: Heart, href : "/favourite-halls" },
        { name: "Contact Us", icon: Mail },
      ];

    return (
        <>
            <aside className="w-[75%] bg-white shadow-md hidden lg:flex flex-col">
                <nav className="flex-grow mt-10">
                    <ul>
                        {sidebarLinks.map((link, index) => (
                            <li key={index} className="mb-2 cursor-pointer">
                                <a href={link.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200">
                                    <link.icon className="h-6 w-6 mr-3" />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-6">
                    <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                        <span>Share Your Thoughts</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;