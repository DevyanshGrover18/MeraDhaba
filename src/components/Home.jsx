import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Cart from "./Cart";

const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const FILTERS = [
  { key: "all", label: "All", dot: null },
  { key: "veg", label: "Veg", dot: "bg-green-500" },
  { key: "nonVeg", label: "Non-Veg", dot: "bg-red-500" },
];

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodItem, setFoodItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [cartView, setCartView] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("https://mera-dhaba.onrender.com/user/foodData", { method: "POST" })
      .then((r) => r.json())
      .then((data) => setFoodItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (foodItems.length > 0) setFoodItem(foodItems[0]);
  }, [foodItems]);

  const filtered = (foodItem || [])
    .filter(
      (item) =>
        filter === "all" ||
        (filter === "veg" ? item.veg === true : item.veg === false),
    )
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#040f1a]">
      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#040f1a]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#040f1a] border-b border-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto flex items-center gap-5 h-16 px-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#58ffcd] to-[#0fa8ff] flex items-center justify-center text-lg shadow-[0_0_18px_rgba(88,255,205,0.4)]">
              🍜
            </div>
            <h1 className="text-[#e0fff8] font-black text-xl tracking-tight">
              Mera <span className="text-[#58ffcd]">Dhaba</span>
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[460px] flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.09] rounded-full px-4 h-10 focus-within:border-[#58ffcd]/40 focus-within:bg-white/[0.07] transition-all duration-200">
            <span className="text-[#81FFD9]/40 flex-shrink-0 flex">
              <SearchIcon />
            </span>
            <input
              className="flex-1 bg-transparent text-[#e0fff8] text-sm placeholder-[#81FFD9]/35 focus:outline-none"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-[#81FFD9]/30 hover:text-[#81FFD9]/70 transition-colors flex-shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex-1" />

          {/* Nav actions */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setCartView(true)}
                className="relative flex items-center gap-2 bg-[#58ffcd]/[0.08] hover:bg-[#58ffcd]/[0.15] border border-[#58ffcd]/20 hover:border-[#58ffcd]/40 text-[#81FFD9] font-semibold px-4 py-2 rounded-full transition-all duration-200 text-sm"
              >
                <CartIcon />
                My Cart
              </button>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <Link
                to="/login"
                onClick={() => localStorage.removeItem("authToken")}
                className="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] text-white/55 hover:text-white/80 font-semibold px-4 py-2 rounded-full transition-all duration-200 text-sm"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="border border-white/15 text-white/65 hover:text-white hover:border-white/30 font-semibold px-5 py-2 rounded-full transition-all duration-200 text-sm"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-[#58ffcd] text-[#040f1a] hover:bg-[#7bffd9] font-bold px-5 py-2 rounded-full transition-all duration-200 text-sm shadow-[0_0_18px_rgba(88,255,205,0.35)]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative bg-gradient-to-r from-[#051726] via-[#082540] to-[#051726] border-b border-[#58ffcd]/[0.07] overflow-hidden">
        <div className="absolute top-[-60px] left-[30%] w-[400px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(88,255,205,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(15,168,255,0.05),transparent_70%)] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-[#58ffcd]/[0.08] border border-[#58ffcd]/20 rounded-full px-3 py-1 text-xs text-[#58ffcd] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58ffcd] animate-pulse inline-block" />
            Free delivery on orders above ₹299
          </div>
          <h1 className="text-[38px] font-black text-[#e0fff8] leading-[1.15] tracking-tight mb-2">
            Craving something <span className="text-[#58ffcd]">delicious?</span>
          </h1>
          <p className="text-[#81FFD9]/50 text-[15px] max-w-md">
            Fresh, hot meals delivered to your door. Browse our menu and order
            in minutes.
          </p>
        </div>
      </div>

      {/* ═══ MENU ═══ */}
      <div className="max-w-[1240px] mx-auto px-6 pt-7 pb-16">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[#e0fff8] text-xl font-extrabold tracking-tight">
              Our Menu
            </h2>
            <p className="text-[#81FFD9]/40 text-[13px] mt-0.5">
              {filtered.length} dishes available
            </p>
          </div>

          <div className="flex gap-2">
            {FILTERS.map(({ key, label, dot }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                  filter === key
                    ? "bg-[#58ffcd]/10 border-[#58ffcd]/40 text-[#58ffcd] shadow-[0_0_14px_rgba(88,255,205,0.18)]"
                    : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                {dot && (
                  <span
                    className={`w-2 h-2 rounded-full ${dot} inline-block`}
                  />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-[#58ffcd]/15 via-white/[0.04] to-transparent mb-7" />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {filtered.map((item) => (
              <Card key={item._id || item.id} food={item} price={item.price} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <span className="text-5xl">🍽️</span>
            <h3 className="text-[#e0fff8] text-lg font-bold">Nothing found</h3>
            <p className="text-[#81FFD9]/40 text-sm">
              Try a different search or filter
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-2 bg-[#58ffcd]/[0.08] border border-[#58ffcd]/25 text-[#81FFD9] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#58ffcd]/15 transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
