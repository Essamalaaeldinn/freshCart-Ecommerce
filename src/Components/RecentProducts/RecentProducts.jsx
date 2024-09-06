import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./RecentProducts.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Import the CartContext

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null); // Track the loading state for adding to cart
  const [message, setMessage] = useState(""); // State for success message
  const { addtocart, addtowish } = useContext(CartContext);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products`
        );
        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    getProducts();

    const savedFavoriteProductIds =
      JSON.parse(localStorage.getItem("favoriteProductIds")) || [];
    setFavoriteProductIds(savedFavoriteProductIds);
  }, []);

  const handleAddToCart = async (id) => {
    setAddingToCart(id);
    await addtocart(id);
    setAddingToCart(null);
    setMessage("Product added to cart!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleFavoriteClick = (productId) => {
    let updatedFavoriteProductIds;
    if (favoriteProductIds.includes(productId)) {
      updatedFavoriteProductIds = favoriteProductIds.filter(
        (id) => id !== productId
      );
    } else {
      updatedFavoriteProductIds = [...favoriteProductIds, productId];
    }
    setFavoriteProductIds(updatedFavoriteProductIds);
    localStorage.setItem(
      "favoriteProductIds",
      JSON.stringify(updatedFavoriteProductIds)
    );
    addtowish(productId);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-center text-[40px] text-[#4FA74F]">All products</h1>
      <div className="row mx-6">
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/4 rounded-md p-2 border border-[#4FA74F] my-3 mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mx-4">
        {loading ? (
          <span className="loader"></span>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="p-1 bg-white shadow-md rounded">
              <div className="product p-1 my-2 text-black">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.name}
                  />
                  <h3 className="text-emerald-500">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-300"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <i
                  onClick={() => handleFavoriteClick(product.id)}
                  className={`fa-solid fa-heart mb-6 ${
                    favoriteProductIds.includes(product.id)
                      ? "text-red-600"
                      : "text-black"
                  }`}
                ></i>
                <button
                  className="btn"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart === product.id} // Disable the button while adding
                >
                  {addingToCart === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No products available</p>
        )}
      </div>
      {message && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
