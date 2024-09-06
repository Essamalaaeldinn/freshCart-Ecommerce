import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextprovider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };
  const [items, setitems] = useState(null);
  const [whish, setwhish] = useState(null);
  const [loading, setloading] = useState(false);
  const [fav, setfav] = useState(false);

  async function addtocart(id) {
    try {
      setloading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        { headers: headers }
      );
      toast.success(data.message);
      setitems(data || {});
      setloading(false);
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  }
  async function getcart() {
    setloading(true);
    try {
      let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setitems(data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }
  
  async function update(count, id) {
    if (count > 0) {
      try {
        setloading(true);
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: count },
          { headers: headers }
        );
        setitems(data);
        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
  }
  async function delet(id) {
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: headers }
      );
      setitems(data);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }
  async function deletall() {
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: headers }
      );
      setitems(null);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }

  async function addtowish(id) {
    try {
      setfav(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        { headers}
      );
      toast.success(data.message);
      setwhish(data);
    } catch (err) {
      setfav(false);
      console.log(err);
    }
    finally {
      setfav(false); 
    }
  }
  async function getwhish() {
    try {
      setloading(true);
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: headers,
        }
      );
      setwhish(data);
      console.log(data);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }
  async function deletwhish(id) {
    try {
      setfav(false);
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: headers }
      );
      setwhish(data);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (whish?.data?.length) {
      setWishlistCount(whish.data.length);
    } else {
      setWishlistCount(0);
    }
  }, [whish]);
  async function checkout(shippingAddress) {
    try {
      setloading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${items.data._id}?url=https://fresh-cart-ecommerce-bay.vercel.app/`,
        {
          shippingAddress,
        },
        { headers: headers }
      );
      window.location.href = data.session.url;
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }
  
  useEffect(() => {
    getcart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addtocart,
        getcart,
        items,
        setitems,
        update,
        loading,
        delet,
        deletall,
        addtowish,
        getwhish,
        whish,
        deletwhish,
        fav,
        checkout,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
