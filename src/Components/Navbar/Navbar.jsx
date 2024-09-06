import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/freshcart-logo.svg";

export default function Navbar() {
  let { userLogin ,setUserLogin } = useContext(UserContext);
  let { items, wishlistCount } = useContext(CartContext);  // Access cart and wishlist counts
  let navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-200 border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center">
            <NavLink to="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} width="130px" className="h-8" alt="FreshCart Logo" />
            </NavLink>
            {userLogin != null ? (
              <>
                <ul className="flex gap-4 ml-5">
                  <li>
                    <NavLink
                      to=""
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="cart"
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      Cart
                      {items?.numOfCartItems > 0 && (
                        <span className="ml-1 text-sm text-white bg-red-500 rounded-full px-2">
                          {items.numOfCartItems}
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="wishlist"
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-green-600" : ""
                      }
                    >
                      WishList
                      {wishlistCount > 0 && (
                        <span className="ml-1 text-sm text-white bg-red-500 rounded-full px-2">
                          {wishlistCount}
                        </span>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="icons flex gap-4">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
            </div>
            <div className="links flex gap-4">
              {userLogin != null ? (
                <span onClick={signout} className="text-sm cursor-pointer">
                  SignOut
                </span>
              ) : (
                <>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-green-600 text-sm" : "text-sm"
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-green-600 text-sm" : "text-sm"
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
