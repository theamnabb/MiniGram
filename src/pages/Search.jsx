
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Search as SearchIcon } from "lucide-react";
import sample1 from "../assets/sample-post-1.jpg";
import sample2 from "../assets/sample-post-2.jpg";
import sample3 from "../assets/sample-post-3.jpg";

const posts = [
  { id: 1, img: sample1 },
  { id: 2, img: sample2 },
  { id: 3, img: sample3 },
  { id: 4, img: sample1 },
  { id: 5, img: sample2 },
  { id: 6, img: sample3 },
];

const Search = ({ onLogout }) => {
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter((p) =>
    p.id.toString().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
      {/* Desktop */}
      <div className="hidden lg:flex">
        <Sidebar onLogout={onLogout} />
        <main className="flex-1 ml-64 p-6">
          {/* Search Bar */}
          <div className="flex items-center max-w-xl mx-auto bg-white shadow-lg rounded-full px-4 py-2 border mb-6">
            <SearchIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search posts, people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Grid of Posts */}
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={post.img}
                  alt="post"
                  className="object-cover w-full h-48 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white font-semibold text-sm">
                    ❤️ {Math.floor(Math.random() * 200)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <Navbar />
        <main className="pt-16 pb-20 px-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white shadow rounded-full px-4 py-2 border mb-4">
            <SearchIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={post.img}
                  alt="post"
                  className="object-cover w-full h-40 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white font-semibold text-xs">
                    ❤️ {Math.floor(Math.random() * 200)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
