import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black/90 border-t">
            <div className="mx-auto py-10 px-4 max-w-screen-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Contact Us</h3>
                        <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <li>Email: <Link href="mailto:sharibkhan939@gmail.com"  className="hover:text-black dark:hover:text-white">sharibkhan939@gmail.com</Link></li>
                            <li>Phone: <Link href="tel:+1234567890" className="hover:text-black dark:hover:text-white">+1 234 567 890</Link></li>
                            <li>
                                Address: 
                                <Link 
                                    href="https://www.google.com/maps?q=Vidyavardhini's+College+of+Engineering+and+Technology" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:underline"
                                >
                                   Vidyavardhini&apos;s College of Engineering and Technology
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Quick Links</h3>
                        <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/" className="hover:text-black dark:hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-black dark:hover:text-white">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Follow Us</h3>
                        <div className="flex mt-4 space-x-4">
                            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <FaInstagram size={24} />
                            </Link>
                            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <FaFacebook size={24} />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <FaTwitter size={24} />
                            </Link>
                            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <FaLinkedin size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 Shopyy. All rights reserved. Crafted with care and passion for a better shopping experience.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
