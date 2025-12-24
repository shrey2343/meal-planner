// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { CartContext } from '../context/CartContext.jsx';
// import { Toaster } from 'react-hot-toast';
// import OrderConfirmationWrapper from './OrderConfirmation.jsx';
// import { FaDumbbell, FaSignOutAlt, FaUserCircle, FaBars, FaShoppingCart } from 'react-icons/fa';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
  
  
//   const { cart } = useContext(CartContext);
//   const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);


//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-emerald-600 flex items-center space-x-2">
//           <FaDumbbell className="text-3xl" />
//           <span className="tracking-tight">AI Fit</span>
//         </Link>

//         {/* Hamburger */}
//         <button
//           className="md:hidden text-gray-600 hover:text-emerald-600 focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <FaBars className="text-xl" />
//         </button>

//         {/* Nav Links */}
//         <div
//           className={`${
//             isMenuOpen ? 'block' : 'hidden'
//           } md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 p-6 md:p-0`}
//         >
//           {user ? (
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <Link to="/profile" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//                 <FaUserCircle />
//                 <span>Profile</span>
//               </Link>
//               <Link to="/meal-plan" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//                 <FaDumbbell />
//                 <span>Meal Plan</span>
//               </Link>
//               <Link to="/shop" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//                 Shop
//               </Link>
//               <Link to="/exercises" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//                 Exercises
//               </Link>

              

//               <Link to="/cart" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//   🛒 Cart
//   {cartCount > 0 && (
//     <span className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//       {cartCount}
//     </span>
//   )}
// </Link>
//              <Link to="/saved" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//   💛 Saved
// </Link>

// {user && (
//   <Link to="/my-orders" className="text-gray-700 hover:text-emerald-600 font-medium flex items-center gap-2">
//     My Orders
//   </Link>
// )}
//               <button
//                 onClick={logout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center gap-2"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
//               <Link to="/login" className="text-gray-700 hover:text-emerald-600 font-medium">
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 text-center"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;









import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import toast, { Toaster } from 'react-hot-toast';
import {
  FaDumbbell,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaShoppingCart,
  FaHeart,
  FaBoxOpen,
  FaRunning,
  FaUtensils,
  FaClipboardList,
  FaHome
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully 👋', {
      icon: '🚪',
      style: {
        borderRadius: '8px',
        background: '#fef3c7',
        color: '#92400e',
        fontWeight: '500'
      }
    });
    navigate('/');
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <nav className="bg-white/10 backdrop-blur-xl shadow-xl sticky top-4 z-50 border border-white/20 mx-4 rounded-3xl overflow-hidden px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-2">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2 drop-shadow-lg">
          <FaDumbbell className="text-2xl md:text-3xl animate-pulse text-green-400" />
          <span className="tracking-tight">Health1st</span>
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white hover:text-green-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Nav Links - Direct rendering without wrapper */}
        {user ? (
          <>
            <Link to="/" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaHome />
              <span className="hidden xl:inline">Home</span>
            </Link>
            <Link to="/meal-plan" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaUtensils />
              <span className="hidden xl:inline">Meal Plan</span>
            </Link>
            <Link to="/exercises" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaRunning />
              <span className="hidden xl:inline">Exercises</span>
            </Link>
            <Link to="/my-plan" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaClipboardList />
              <span className="hidden xl:inline">My Plan</span>
            </Link>
            <Link to="/shop" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaBoxOpen />
              <span className="hidden xl:inline">Shop</span>
            </Link>

            {/* Cart with badge */}
            <Link to="/cart" className={`nav-link-compact relative ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaShoppingCart />
              <span className="hidden xl:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/saved" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaHeart className="text-pink-400" />
              <span className="hidden xl:inline">Saved</span>
            </Link>

            <Link to="/my-orders" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaBoxOpen className="text-blue-400" />
              <span className="hidden xl:inline">Orders</span>
            </Link>

            <Link to="/profile" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaUserCircle className="text-yellow-400" />
              <span className="hidden xl:inline">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className={`bg-gradient-to-r from-red-500/90 to-pink-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 ${isMenuOpen ? 'flex' : 'hidden'} lg:flex items-center gap-2 shadow-xl border-2 border-white/30 hover:scale-105 font-semibold text-sm`}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/exercises" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaRunning />
              <span>Exercises</span>
            </Link>
            <Link to="/shop" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              <FaBoxOpen />
              <span>Shop</span>
            </Link>
            <Link to="/login" className={`nav-link-compact ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
              Login
            </Link>
            <Link
              to="/register"
              className={`bg-emerald-500/80 backdrop-blur-md text-white px-5 py-2 rounded-full hover:bg-emerald-600 transition duration-300 text-center shadow-lg border border-white/20 hover:scale-105 font-semibold text-sm ${isMenuOpen ? 'flex' : 'hidden'} lg:flex items-center`}
            >
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Tailwind utility class for nav links */}
      <style>{`
        .nav-link-compact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 9999px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          font-size: 0.875rem;
          white-space: nowrap;
        }
        .nav-link-compact:hover {
          color: #10b981;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transform: translateY(-2px);
        }
        @media (max-width: 1279px) {
          .nav-link-compact span {
            display: inline;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
