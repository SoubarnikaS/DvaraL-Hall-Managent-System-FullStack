// import React from 'react';
// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//     const currentYear = new Date().getFullYear();

//     return (
//         <footer className="bg-blue-900 text-white">
//             <div className="container mx-auto px-4 py-8 md:py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {/* Company Info */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-4">DvaraL</h3>
//                         <p className="text-sm mb-4">Your premier destination for event spaces and seamless planning experiences.</p>
//                         <div className="flex space-x-4">
//                             <a href="#" className="hover:text-blue-300"><Facebook size={20} /></a>
//                             <a href="#" className="hover:text-blue-300"><Twitter size={20} /></a>
//                             <a href="#" className="hover:text-blue-300"><Instagram size={20} /></a>
//                             <a href="#" className="hover:text-blue-300"><Linkedin size={20} /></a>
//                         </div>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//                         <ul className="space-y-2">
//                             <li className="text-blue-600 cursor-pointer">Home</li>
//                             <li className="text-blue-600 cursor-pointer">Venue</li>
//                             <li className="text-blue-600 cursor-pointer">Services</li>
//                             <li className="text-blue-600 cursor-pointer">Contanct Us</li>
//                             <li className="text-blue-600 cursor-pointer">Explore more</li>
                            
//                         </ul>
//                     </div>

//                     {/* Contact Info */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//                         <ul className="space-y-2">
//                             <li className="flex items-center"><Mail size={16} className="mr-2" /> info@dvaral.com</li>
//                             <li className="flex items-center"><Phone size={16} className="mr-2" /> +1 (123) 456-7890</li>
//                             <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Event St, City, Country</li>
//                         </ul>
//                     </div>

//                     {/* Newsletter */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//                         <p className="text-sm mb-4">Stay updated with our latest offers and events.</p>
//                         <form className="flex">
//                             <input
//                                 type="email"
//                                 placeholder="Your email"
//                                 className="bg-blue-800 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
//                             />
//                             <button
//                                 type="submit"
//                                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition duration-300"
//                             >
//                                 Subscribe
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Copyright */}
//                 <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm">
//                     <p>&copy; {currentYear} DvaraL. All rights reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;


import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">DvaraL</h3>
                            <p className="text-sm mb-4">Your premier destination for event spaces and seamless planning experiences.</p>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-blue-300 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-blue-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="text-blue-300 hover:text-white transition-colors">Venues</a></li>
                            <li><a href="#" className="text-blue-300 hover:text-white transition-colors">Services</a></li>
                            <li><a href="#" className="text-blue-300 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-blue-300 hover:text-white transition-colors">Explore More</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center"><Mail size={16} className="mr-2 flex-shrink-0" /> <span>info@dvaral.com</span></li>
                            <li className="flex items-center"><Phone size={16} className="mr-2 flex-shrink-0" /> <span>+1 (123) 456-7890</span></li>
                            <li className="flex items-center"><MapPin size={16} className="mr-2 flex-shrink-0" /> <span>123 Event St, City, Country</span></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm mb-4">Stay updated with our latest offers and events.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-blue-800 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-blue-800 text-center text-sm">
                    <p>&copy; {currentYear} DvaraL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;