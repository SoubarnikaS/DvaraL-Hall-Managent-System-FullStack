import React, { useState, useEffect } from "react";
import { LayoutDashboard, ClipboardList, Clock, Building, Edit, Trash2, Image } from "lucide-react";



const ManagerSideBar = () => {


    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const sidebarLinks = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/manager-dashboard" },
        { name: "All Requests", icon: ClipboardList, href: "/hall-requests" },
        { name: "Register Your Hall", icon: Building, href: "/add-hall" },
        { name: "Edit Hall", icon: Edit, href: "/edit-hall" },
        // { name: "Hall Images", icon: Image, href: "/hall-images" },
        // { name: "Delete Hall", icon: Trash2, onClick: () => setShowDeleteConfirmation(true) },
    ];

    const handleDelete = () => {

        console.log("Hall deleted");
        setShowDeleteConfirmation(false);
    };

    return (
        <>
            <aside className="bg-white shadow-md hidden lg:flex flex-col">
                <nav className="flex-grow mt-10">
                    <ul>
                        {sidebarLinks.map((link, index) => (
                            <li key={index} className="mb-2 cursor-pointer">
                                {link.href ? (
                                    <a href={link.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200">
                                        <link.icon className="h-5 w-5 mr-3" />
                                        <span className="text-sm font-medium">{link.name}</span>
                                    </a>
                                ) : (
                                    <button onClick={link.onClick} className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200">
                                        <link.icon className="h-5 w-5 mr-3" />
                                        <span className="text-sm font-medium">{link.name}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this hall?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManagerSideBar;