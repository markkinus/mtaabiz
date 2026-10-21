import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useState, useEffect } from "react";

function BusinessDetails() {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const businessRef = doc(db, "businesses", id);
        const businessSnap = await getDoc(businessRef);

        if (businessSnap.exists()) {
          setBusiness({
            id: businessSnap.id,
            ...businessSnap.data(),
          });
        } else {
          setBusiness(null);
        }
      } catch (error) {
        console.error("Error fetching business:", error);
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBusiness();
  }, [id]);

  const [selectedService, setSelectedService] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Function to handle form submission
  async function handleBookingSubmit(event) {
    event.preventDefault();

    if (!selectedService || !business) {
      alert("Please select a service first.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please login before making a booking.");
      return;
    }

    try {
      const bookingData = {
        businessId: business.id,
        businessName: business.name,
        ownerId: business.ownerId,
        customerId: user.uid,
        serviceName: selectedService.name,
        price: Number(selectedService.price),
        customerName,
        phone,
        date: bookingDate,
        time: bookingTime,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "bookings"), bookingData);

      setBookingSubmitted(true);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert(
        "An error occurred while submitting the booking. Please try again.",
      );
    }
  }

  if (loading) {
    return (
      <main className="p-8 text-center">
        <p>Loading Business details...</p>;
      </main>
    );
  }

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
      <Link to="/#businesses" className="text-green-700 hover:underline">
        Back to businesses
      </Link>

      <section className="mt-6 bg-white p-8 rounded-xl shadow-sm border">
        <p className="text-green-700 font-semibold">{business.category}</p>

        <h1 className="text-3xl font-bold mt-2">{business.name}</h1>

        <p className="text-gray-500 mt-2"> {business.location}</p>

        <p className="text-gray-700 mt-4">{business.description}</p>

        {business.whatsappNumber && (
          <a
            href={`https://wa.me/${business.whatsappNumber}`}
            target="_blank"
            className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Chat on WhatsApp
          </a>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {business.services?.map((service, index) => (
            <div
              key={index}
              className="border rounded-lg p-5 bg-white shadow-sm"
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>

              <p className="text-gray-600 mt-2">KSh {service.price}</p>

              <button
                onClick={() => setSelectedService(service)}
                className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              >
                Book this service
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <section className="mt-10 bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-2xl font-bold mb-2">
            Book {selectedService.name}
          </h2>

          <p className="text-gray-600 mb-6">
            Price: KSh {selectedService.price}
          </p>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Your Name</label>

              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>

              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="e.g. 0712345678"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Booking Date</label>

              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Booking Time</label>

              <input
                type="time"
                required
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
            >
              Submit Booking
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

export default BusinessDetails;
