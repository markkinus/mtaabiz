import { Link, useParams } from "react-router-dom";
import businesses from "../data/Business";


function BusinessDetails() {
  const { id } = useParams();

  const business = businesses.find((item) => item.id === Number(id));

  if (!business) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Business not found</h1>
        <Link to="/" className="text-green-700 underline">
          Return home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <Link to="/" className="text-green-700 hover:underline">
      Back to businesses
      </Link>

      <section className="mt-6 bg-white p-8 rounded-xl shadow-sm border">
        <p className="text-green-700 font-semibold">{business.category}</p>

        <h1 className="text-3xl font-bold mt-2">{business.name}</h1>

        <p className="text-gray-500 mt-2"> {business.location}</p>

        <p className="text-gray-700 mt-4">{business.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Services and Prices</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {business.services.map((service) => (
            <div key={service.name} className="bg-white border rounded-xl p-5">
              <h3 className="font-bold text-lg">{service.name}</h3>

              <p className="text-green-800 font-semibold mt-2">
                KSh {service.price.toLocaleString()}
              </p>

              <button
                disabled
                className="mt-4 bg-gray-200 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                Booking coming soon
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BusinessDetails;
