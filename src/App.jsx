import Navbar from "./components/Navbar"
import BusinessCard from "./components/BusinessCard"
import BusinessDetails from "./pages/BusinessDetails"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

function Home() {
  const businesses = [
    {
      id: 1,
      name: "Fresh Cuts Barbershop",
      category: "Beauty & Grooming",
      location: "Kasarani, Nairobi",
      description: "Professional haircuts and grooming services.",
    },
    {
      id: 2,
      name: "Mama Njeri Restaurant",
      category: "Food & Dining",
      location: "Roysambu, Nairobi",
      description: "Local meals prepared fresh every day.",
    },
    {
      id: 3,
      name: "SmartFix Electronics",
      category: "Electronics",
      location: "Thika Road, Nairobi",
      description: "Phone repairs and electronics services.",
    },
  ]

  // Search
  const [searchTerm, setSearchTerm] = useState("")

  // Filter
  const filteredBusinesses = businesses.filter((business) =>{
    return (
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main>
        <section className="bg-green-100 p-8 text-center">
          <p className="text-4xl font-bold text-green-700 mb-3">SUPPORT LOCAL. SHOP LOCAL</p>

          <h2 className="text-4xl font-bold text-green-700 mb-5">Discover Local Businesses <br/> 
          <span className="text-green-700">
            Near You
            </span>
            </h2>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the best local businesses near you. <br/>
            Shop locally, support local.
            </p>

            <a href="#businesses" className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-900">
              View Businesses
            </a>
        </section>

        <section id="businesses" className="mt-8 p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-700">Explore Businesses</h2>
            <p className='text-gray-600'>Find the best local businesses near you.</p>
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

          {filteredBusinesses.length > 0 ? (
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
          <p className="text-gray-600">No businesses found. Try searching again.</p>
        )}
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">@ 2026 MtaaBiz. Supporting Local Businesses.

      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/businesses/:id" element={<BusinessDetails />} />
    </Routes>
  )
}

export default App