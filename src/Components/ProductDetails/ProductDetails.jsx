import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext"; // Update the import path

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id, category } = useParams();

  // Access the CartContext
  const { addtocart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch related products:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  // Handle adding product to cart
  const handleAddToCart = () => {
    addtocart(product._id);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3">
          <Slider {...settings}>
            {product?.images.map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-full h-[300px] object-cover"
                alt=""
              />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-2/3 p-4 md:p-6">
          <h3 className="text-slate-300 font-semibold capitalize text-xl md:text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-slate-400 my-4">{product?.description}</h4>
          <h4 className="text-slate-200 my-4 font-bold">
            {product?.category.name}
          </h4>
          <div className="flex flex-col md:flex-row justify-between my-5">
            <span className="text-white text-lg">{product?.price} EGP</span>
            <span className="flex items-center">
              <i className="fas fa-star text-yellow-300 mr-1"></i> {product?.ratingsAverage}
            </span>
          </div>

          {/* Button to add to cart */}
          <button onClick={handleAddToCart} className="btn">
            Add to cart
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-slate-300 font-semibold text-lg md:text-xl mb-4 text-center">Related Products</h2>
        {loading ? (
          <div className="flex justify-center">
            <span className="loader"></span>
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="p-2">
                <div className="product p-3 bg-gray-200 text-white rounded-lg">
                  <Link to={`/productdetails/${relatedProduct._id}/${relatedProduct.category.name}`}>
                    <img
                      src={relatedProduct.imageCover}
                      className="w-full h-[200px] object-cover rounded"
                      alt={relatedProduct.name}
                    />
                    <h3 className="text-emerald-500 mt-2">{relatedProduct.category.name}</h3>
                    <h3 className="font-semibold mb-1">
                      {relatedProduct.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span>{relatedProduct.price} EGP</span>
                      <span className="flex items-center">
                        <i className="fas fa-star text-yellow-300 mr-1"></i> {relatedProduct.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  {/* Button to add related product to cart */}
                  <button onClick={() => addtocart(relatedProduct._id)} className="btn mt-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No related products available</p>
        )}
      </div>
    </>
  );
}
