"use client";

import { useEffect, useState, useRef, useMemo } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const fetched = useRef(false);
  const menuSectionRef = useRef<HTMLElement>(null);

  // Scroll to menu section
  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simple alert handlers for promo/about (demo)
  const handlePromo = () => alert("✨ Special promotions coming soon! Stay tuned.");
  const handleAbout = () => alert("🍽️ RestoByte: Delicious food, delivered with passion.");

  // Fetch menu data
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    fetch("http://127.0.0.1:8000/item")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const result = Array.isArray(data) ? data : data?.data;
        if (!Array.isArray(result)) throw new Error("Invalid data format");

        // Remove duplicates by id
        const uniqueData = Array.from(
          new Map(result.map((item: MenuItem) => [item.id, item])).values()
        );
        setMenu(uniqueData);
        setError(null);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load menu. Please check your connection or API.");
        setMenu([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Extract unique categories from menu items
  const categories = useMemo(() => {
    const cats = menu.map((item) => item.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [menu]);

  // Filter menu based on active category
  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return menu;
    return menu.filter((item) => item.category === activeCategory);
  }, [menu, activeCategory]);

  // Handle order button click
  const handleOrder = (itemName: string) => {
    alert(`✅ "${itemName}" added to your order! Proceed to checkout.`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-sans antialiased">
      {/* NAVBAR*/}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              🍽️ RestoByte
            </h1>
            <div className="flex gap-6 text-sm font-medium">
              <button
                onClick={scrollToMenu}
                className="hover:text-orange-500 transition-colors duration-200 cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={handlePromo}
                className="hover:text-orange-500 transition-colors duration-200 cursor-pointer"
              >
                Promo
              </button>
              <button
                onClick={handleAbout}
                className="hover:text-orange-500 transition-colors duration-200 cursor-pointer"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up">
            Delicious Food, <br className="hidden sm:block" />
            Delivered Fast 🚀
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            Enjoy your favorite meals with high quality and fast delivery straight to your home.
          </p>
          <button
            onClick={scrollToMenu}
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-400"
          >
            Order Now
            <span>🍕</span>
          </button>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-12 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-gray-50/90"
            ></path>
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: "🚀", title: "Fast Delivery", desc: "Your order arrives quickly and safely" },
            { emoji: "🍽️", title: "Quality Food", desc: "Fresh ingredients and high quality meals" },
            { emoji: "💳", title: "Easy Payment", desc: "Multiple payment methods available" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>
              <h3 className="font-bold text-xl text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU SECTION*/}
      <section ref={menuSectionRef} className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            🍴 Our Menu
          </h2>
          <div className="flex flex-wrap gap-2 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-gray-200/70 text-gray-700 hover:bg-gray-300/80"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 text-xs opacity-80">
                    ({menu.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-5 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-white/50 rounded-2xl">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-orange-500 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Menu Grid */}
        {!loading && !error && (
          <>
            {filteredMenu.length === 0 ? (
              <div className="text-center py-16 bg-white/30 rounded-2xl">
                <p className="text-gray-500 text-lg">No items found in "{activeCategory}" category.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredMenu.length} item{filteredMenu.length !== 1 && "s"}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenu.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="inline-block text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-orange-500 font-bold text-2xl mt-3">
                          Rp {item.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleOrder(item.name)}
                          className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {/* FOOTER*/}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="font-bold text-gray-800 text-lg mb-4">🍽️ Group RSI</p>
          
          <div className="space-y-2 text-gray-600 text-sm">
            <p>• Lois Ryannareta (L0224006)</p>
            <p>• Rambat Ungu Ariyati (L0224010)</p>
            <p>• Yoeke Sekti Pertiwi (L0224027)</p>
            <p>• Adeliya Putri Hapsari (L0224029)</p>
            <p>• Rafah Taqy Arrahman (L0224047)</p>
          </div>
          
          <p className="mt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} RestoByte — Delicious moments, delivered.
          </p>
        </div>
      </footer>

      {/* Custom animations via Tailwind */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}