import Navbar from "./components/Navbar"
import BusinessCard from "./components/BusinessCard"

function App() {
  const businesses = [
    {
      id: 1,
      name: "Business 1",
      category: "Category 1",
      location: "Location 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Business 2",
      category: "Category 2",
      location: "Location 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Business 3",
      category: "Category 3",
      location: "Location 3",
      description: "Description 3",
    },
  ]
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
                location={business.location}
                description={business.description}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">@ 2026 MtaaBiz. Supporting Local Businesses.

      </footer>
    </div>
  )
}

export default App