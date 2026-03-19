"use client";

import { useEffect, useState } from "react";

export default function Home() {
  type MenuItem = {
    id: number;
    name: string;
    price: number;
    category: string;
  };

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/item")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMenu(data);
      });
    }, []);

  // add ke keranjang
  const handleOrder = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
  };

  // hitung total 
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // checkout
  const handleCheckout = () => {
    setMessage("Pesanan sedang disiapkan...");
    setShowPopup(true);
    setCart([]);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-orange-500">🍽️ RestoByte</h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <button className="hover:text-orange-500">Home</button>
          <button className="hover:text-orange-500">Menu</button>
          <button className="hover:text-orange-500">About</button>

          {/* icon cart */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="hover:etxt-orange-500"
          >
            🛒 ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-12 bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <h2 className="text-4xl font-bold mb-2">Delicious Food, Fast Service</h2>
        <p className="opacity-90">Order your favorite meals easily</p>
      </section>

      {/* MENU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {menu.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {item.name}
            </h2>

            <p className="text-sm text-gray-400">{item.category}</p>

            <p className="text-orange-500 font-semibold mt-2 text-lg">
              Rp {item.price}
            </p>

            <button 
              onClick={() => handleOrder(item)}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/*SIDEBAR CART*/}
      {showCart && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-5 z-50">

          <div className="flex justifity-between item-center mb-4">
            <h2 className="text-xl font-bols mb-4">Keranjang</h2>
            <button onClick={() => setShowCart(false)}>❌</button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Keranjang Kosong</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="border-b py-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price}
                  </p>
                </div>
              ))}

              <p className="mt-4 font-bold text-lg">
                Total: Rp {totalPrice}
              </p>

              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2">
                  Order
                </button>
            </>
          )}

          {message && (
            <p className="mt-4 text-green-600 font-medium">
              {message}
            </p>
          )}
        </div>
      )}

      {/*POP UP*/}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white px-8 py-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-600 mb-2">
            ✅ Berhasil!
            </h2>
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
      )}

      {/* FOOTER IDENTITAS */}
      <footer className="bg-white mt-10 py-6 border-t text-center text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-2">
          Kelompok RSI - RestoByte
        </p>

        <div className="space-y-1">
          <p>Lois Ryannareta (L0224006)</p>
          <p>Rambat Ungu Ariyati (L0224010)</p>
          <p>Yoeke Sekti Pertiwi (L0224027)</p>
          <p>Adeliya Putri Hapsari (L0224029)</p>
          <p>Rafah Taqy (L0224047)</p>
        </div>
      </footer>

    </main>
  );
}
