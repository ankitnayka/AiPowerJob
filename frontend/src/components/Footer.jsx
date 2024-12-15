import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                {/* About Us Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">About Us</h3>
                    <p className="text-sm">
                        We are a leading job portal helping you connect with top companies to find your dream job.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="hover:underline">Jobs</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:underline">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Contact</h3>
                    <p className="text-sm">1234 Job Street, Hiring City, Country</p>
                    <p className="text-sm mt-2">Email: info@jobportal.com</p>
                    <p className="text-sm">Phone: +123 456 7890</p>
                </div>

                {/* Social Media Links Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                            <FaLinkedinIn size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center mt-8">
                <p className="text-sm">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
