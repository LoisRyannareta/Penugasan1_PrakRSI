export default function Home() {
  const menu = [
    { id: 1, name: "Nasi Goreng", price: 15000, category: "Food" },
    { id: 2, name: "Mie Ayam", price: 12000, category: "Food" },
    { id: 3, name: "Es Teh", price: 5000, category: "Drink" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-orange-500">🍽️ RestoByte</h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <button className="hover:text-orange-500">Home</button>
          <button className="hover:text-orange-500">Menu</button>
          <button className="hover:text-orange-500">About</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-12 bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <h2 className="text-4xl font-bold mb-2">Delicious Food, Fast Service</h2>
        <p className="opacity-90">Order your favorite meals easily</p>
      </section>

      {/* MENU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {item.name}
            </h2>

            <p className="text-sm text-gray-400">{item.category}</p>

            <p className="text-orange-500 font-semibold mt-2 text-lg">
              Rp {item.price}
            </p>

            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>
        ))}
      </div>

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
