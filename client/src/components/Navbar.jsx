// // client/src/components/Navbar.jsx
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { FaDumbbell, FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';

// const Navbar = () => {
//     const { user, logout } = useContext(AuthContext);
//     const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//     return (
//         <nav className="bg-white shadow-lg sticky top-0 z-50">
//             <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                 <Link to="/" className="text-3xl font-extrabold text-blue-600 flex items-center space-x-2">
//                     <FaDumbbell className="text-4xl" />
//                     <span>AI Fit</span>
//                 </Link>
                
//                 <div className="md:hidden">
//                     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none">
//                         <FaBars className="h-6 w-6" />
//                     </button>
//                 </div>

//                 <div className={`md:flex items-center space-x-8 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 p-6 md:p-0`}>
//                     {user ? (
//                         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
//                             <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-semibold flex items-center space-x-2">
//                                 <FaUserCircle />
//                                 <span>Profile</span>
//                             </Link>
//                             <Link to="/meal-plan" className="text-gray-700 hover:text-blue-600 font-semibold flex items-center space-x-2">
//                                 <FaDumbbell />
//                                 <span>Meal Plan</span>
//                             </Link>
//                             <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2 w-full md:w-auto">
//                                 <FaSignOutAlt />
//                                 <span>Logout</span>
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
//                             <Link to="/login" className="text-gray-700 hover:text-blue-600 font-semibold">
//                                 Login
//                             </Link>
//                             <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full md:w-auto text-center">
//                                 Register
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;









import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { FaDumbbell, FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-emerald-600 flex items-center space-x-2">
                    <FaDumbbell className="text-3xl" />
                    <span className="tracking-tight">AI Fit</span>
                </Link>

                {/* Hamburger */}
                <button
                    className="md:hidden text-gray-600 hover:text-emerald-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars className="text-xl" />
                </button>

                {/* Nav Links */}
                <div
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 p-6 md:p-0`}
                >
                    {user ? (
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2"
                            >
                                <FaUserCircle />
                                <span>Profile</span>
                            </Link>
                            <Link
                                to="/meal-plan"
                                className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2"
                            >
                                <FaDumbbell />
                                <span>Meal Plan</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center gap-2"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-emerald-600 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 text-center"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
