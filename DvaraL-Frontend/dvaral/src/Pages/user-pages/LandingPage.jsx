import React from 'react';
import Navbar from "../../Web/Navbar";

import LandingPageContent from './LandingPageContent';
import Footer from './Footer';

import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';


import LandingPageImg from '/src/assets/images/LP2.avif';
import { Button } from '@mui/material';

const LandingPage = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
                <section className="mb-10 sm:mb-16 md:mb-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
                        <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-5">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight font-josefin-sans">
                                Your Vision, Our Spaces: <br />
                                <span className="text-blue-900">Perfect Events Await</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 font-poppin">
                                Looking for a space that fits your vision?
                                Relax, we've got you covered with top-notch options.
                            </p>
                            <Link to="/explore-page">
                            <div className='mt-6'>
                                <Button
                                style={{ color: "#fff" , backgroundColor: "#1E3A8A"}}
                                className=" hover:bg-blue-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 ease-in-out"
                                >
                                    Explore Venues <MoveRight className="ml-2" />
                                </Button>
                                    </div>
                            </Link>
                        </div>
                        <div className="w-full lg:w-2/4 mt-6 lg:mt-0 pr-5">
                            <img
                                src={LandingPageImg}
                                alt="Elegant Event Space"
                                className="rounded-xl shadow-2xl object-cover w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[80vh]"
                            />
                        </div>
                    </div>
                </section>

                <LandingPageContent />
                <Footer />
            </main>
        </div>
    );
}

export default LandingPage;