// // src/App.jsx
// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./context/AuthContext.jsx";
// import { CartProvider } from "./context/CartContext.jsx";

// import Navbar from "./components/Navbar.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import OrderConfirmationWrapper from "./components/OrderConfirmation.jsx";

// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import MealPlanPage from "./pages/MealPlanPage.jsx";

// import ShopPage from "./pages/shopPage.jsx";
// import CartPage from "./pages/CartPage.jsx";
// import ExercisesPage from "./pages/ExercisesPage.jsx";
// import ProductDetailPage from "./pages/ProductDetailPage.jsx";
// import SavedPage from "./pages/SavedPage.jsx";
// import MyOrdersPage from "./pages/MyOrdersPage.jsx";

// export default function App() {
//   return (
//     <Router>
      
//         <AuthProvider>
//           <CartProvider>
//             <Navbar />

//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/product/:id" element={<ProductDetailPage />} />
//               <Route path="/saved" element={<SavedPage />} />


//               {/* Protected User Routes */}
//               <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute>
//                     <ProfilePage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/meal-plan"
//                 element={
//                   <ProtectedRoute>
//                     <MealPlanPage />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Shop & Cart */}
//               <Route path="/shop" element={<ShopPage />} />
//               <Route
//                 path="/cart"
//                 element={
//                   <ProtectedRoute>
//                     <CartPage />
//                   </ProtectedRoute>
//                 }
//               />
// <Route path="/order-confirmation" element={<OrderConfirmationWrapper />} />
// <Route path="/my-orders" element={<MyOrdersPage />} />


//               {/* Exercise Suggestions */}
//               <Route path="/exercises" element={<ExercisesPage />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
      
//     </Router>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedPage from './pages/SavedPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import MealPlanPage from './pages/MealPlanPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderConfirmationWrapper from './components/OrderConfirmation';
import ExercisesPage from './pages/ExercisesPage';
import MyPlanPage from './pages/MyPlanPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Navbar />
              <Toaster position="top-right" toastOptions={{ duration: 1000 }} />

            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/exercises" element={<ExercisesPage />} />
                <Route path="/my-plan" element={<MyPlanPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meal-plan"
                  element={
                    <ProtectedRoute>
                      <MealPlanPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-confirmation"
                  element={<OrderConfirmationWrapper />}
                />
                <Route
                  path="/my-orders"
                  element={<MyOrdersPage />}
                />
              </Routes>
            </main>

            <Footer />
            <ScrollToTop />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
