
// import React, { useState } from 'react';
// import { PackageOpen, Menu, X } from 'lucide-react';


// import { Link } from 'react-router-dom';
// import Login from '../Pages/user-pages/Login';

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const navItems = [
//         { label: 'Home', href: '/' },
//         { label: 'Venues', href: '/explore-page' },
//         { label: 'Services', href: '/services' },
//         { label: 'About', href: '/about' },
//         { label: 'Contact', href: '/contact' },
//     ];

//     return (
//         <nav className="sticky top-0 z-50 bg-white shadow-md h-[9vh]">
//             <div className="container mx-auto px-4">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <PackageOpen className="h-8 w-8 text-blue-600" />
//                         <Link to="/">
//                             <span className="ml-2 text-3xl font-bold text-blue-600 font-['Dancing_Script']">
//                                 DvaraL
//                             </span>
//                         </Link>
//                     </div>

//                     {/* Desktop menu */}
//                     <div className="hidden md:flex space-x-4">
//                         {navItems.map((item, index) => (
//                             <a
//                                 key={index}
//                                 href={item.href}
//                                 className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium font-['Poppins']"
//                             >
//                                 {item.label}
//                             </a>
//                         ))}
//                     </div>

//                     <div className="flex items-center">
//                         <button
//                             onClick={() => setIsModalOpen(true)}
//                             className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-['Poppins']"
//                         >
//                             Sign In
//                         </button>

//                         {/* Mobile menu button */}
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                         >
//                             {isMenuOpen ? (
//                                 <X className="block h-6 w-6" aria-hidden="true" />
//                             ) : (
//                                 <Menu className="block h-6 w-6" aria-hidden="true" />
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile menu */}
//             {isMenuOpen && (
//                 <div className="md:hidden">
//                     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                         {navItems.map((item, index) => (
//                             <a
//                                 key={index}
//                                 href={item.href}
//                                 className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium font-['Poppins']"
//                             >
//                                 {item.label}
//                             </a>
//                         ))}
//                         <button
//                             onClick={() => setIsModalOpen(true)}
//                             className="w-full text-left text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium font-['Poppins']"
//                         >
//                             Sign In
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Sign In Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//                         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//                         <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                             <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                                         <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                                             <button
//                                                 type="button"
//                                                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                                                 onClick={() => setIsModalOpen(false)}
//                                             >
//                                                 Close
//                                             </button>
//                                         </div>
//                                         <Login />

//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;


import React, { useState } from 'react';
import { PackageOpen, Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Pages/user-pages/Login';

  

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { isAuthenticated, user, logout } = useAuth();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Venues', href: '/explore-page' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const handleLogout = () => {
        navigate('/');
        localStorage.clear("token");
        logout();
        
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md h-[9vh]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <PackageOpen className="h-8 w-8 text-blue-600" />
                        <Link to="/">
                            <span className="ml-2 text-3xl font-bold text-blue-600 font-['Dancing_Script']">
                                DvaraL
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium font-['Poppins']"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center">
                        {token != null ? (
                            <div className="relative group">
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-['Poppins']">
                                    <User className="mr-2 h-5 w-5" />
                                    Profile
                                </button>
                                <div className="absolute right-0 w-40 mt-1 py-1 bg-red-500 border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-white font-bold font-[Poppins] text-center">Logout</button>
                            </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-['Poppins']"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium font-['Poppins']"
                            >
                                {item.label}
                            </a>
                        ))}
                        {!isAuthenticated && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full text-left text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium font-['Poppins']"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Sign In Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                        <Login onClose={() => setIsModalOpen(false)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;