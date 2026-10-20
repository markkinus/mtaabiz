import Navbar from "./components/Navbar";
import BusinessCard from "./components/BusinessCard";
import BusinessDetails from "./pages/BusinessDetails";
import { use } from "react";
import { Routes, Route } from "react-router-dom";
import { testFirestore } from "./firebase/testFirestore";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/config";
import BusinessOwnerDashboard from "./pages/BusinessOwnerDashboard";
import OwnerAuth from "./pages/OwnerAuth";
import ProtectedOwnerRoute from "./components/ProtectedOwnerRoute";
import CustomerAuth from "./pages/CustomerAuth";

function Home() {
  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const businessesQuery = query(
          collection(db, "businesses"),
          where("published", "==", true),
        );

        const snapshot = await getDocs(businessesQuery);

        const businessData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBusinesses(businessData);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setError("Could not load businesses. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  // Filter
  const filteredBusinesses = businesses.filter((business) => {
    return (
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Firebase
  useEffect(() => {
    testFirestore().catch((error) => {
      console.error("Firebase error:", error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main>
        <section className="bg-green-100 p-8 text-center">
          <p className="text-4xl font-bold text-green-700 mb-3">
            SUPPORT LOCAL. SHOP LOCAL
          </p>

          <h2 className="text-4xl font-bold text-green-700 mb-5">
            Discover Local Businesses <br />
            <span className="text-green-700">Near You</span>
          </h2>

          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the best local businesses near you. <br />
            Shop locally, support local.
          </p>

          <a
            href="#businesses"
            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-900"
          >
            View Businesses
          </a>
        </section>

        <section id="businesses" className="mt-8 p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-700">
              Explore Businesses
            </h2>
            <p className="text-gray-600">
              Find the best local businesses near you.
            </p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by name, category, or location..."
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  id={business.id}
                  name={business.name}
                  category={business.category}
                  location={business.location}
                  description={business.description}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No businesses found. Try searching again.
            </p>
          )}
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        @ 2026 MtaaBiz. Supporting Local Businesses.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/businesses/:id" element={<BusinessDetails />} />
      <Route path="/owner/dashboard" element={<BusinessOwnerDashboard />} />
      <Route path="/owner/auth" element={<OwnerAuth />} />
      <Route path="/owner/dashboard" element={<ProtectedOwnerRoute> <BusinessOwnerDashboard /> </ProtectedOwnerRoute>}/>
      <Route path="/login" element={<CustomerAuth />} />
    </Routes>
  );
}

export default App;
