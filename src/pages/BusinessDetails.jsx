import { Link, useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
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

  const [bookings, setBookings] = useState([]);

  // Function to handle form submission
  async function handleBookingSubmit(event) {
    event.preventDefault();

    if(!selectedService || !business) {
      alert("Please select a service first.");
      return;
    }
    
    try{
    const bookingData = {
      businessId: business.id,
      businessName: business.name,
      ownerId: business.ownerId,
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
    alert("An error occurred while submitting the booking. Please try again.");
  }
  }

  // Function to update the booking status
  function updateBookingStatus(bookingId, newStatus) {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
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
                type="button"
                onClick={() => {
                  setSelectedService(service);
                  setBookingSubmitted(false);
                }}
                className="w-full border border-green-700 text-green-800 py-2 px-4 rounded-lg mt-4 hover:bg-green-600 hover:text-white"
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <section className="mt-10 bg-white border rounded-xl p-5">
          <h2 className="text-2xl font-bold mb-5">
            Book {selectedService.name}
          </h2>

          <p>
            You selected: <strong>{selectedService.name}</strong>
            for KSh {selectedService.price.toLocaleString()}
          </p>

          {bookingSubmitted ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="text-green-800 font-semibold mt-2">
                Booking submitted successfully!
              </h3>
              <p className="text-green-800">
                Thank you, {customerName}! Your booking has been confirmed.
              </p>

              <p className="text-green-800">
                Date: {bookingDate} . Time: {bookingTime}.
              </p>

              <p className="text-green-800">We look forward to serving you!</p>

              <button
                type="button"
                onClick={() => {
                  setBookingSubmitted(false);
                  setCustomerName("");
                  setPhone("");
                  setBookingDate("");
                  setBookingTime("");
                }}
                className="w-full border border-green-700 text-green-800 py-2 px-4 rounded-lg mt-4 hover:bg-green-600 hover:text-white"
              >
                Book Another Service
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Booking Date
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Booking Time
                </label>
                <input
                  type="time"
                  id="bookingTime"
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full border border-green-700 text-green-800 py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white"
                >
                  Submit Booking
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null);
                    setBookingSubmitted(false);
                  }}
                  className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Booking Request</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No booking requests yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-300 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
                <p className="text-gray-600">Business:{booking.businessName}</p>
                <p className="text-gray-600">
                  Customer Name: {booking.customerName}
                </p>
                <p className="text-gray-600">Phone Number: {booking.phone}</p>
                <p className="text-gray-600">Booking Date: {booking.date}</p>
                <p className="text-gray-600">Booking Time: {booking.time}</p>
                <p className="font-semibold text-green-800 mt-2">
                  KSH {booking.price.toLocaleString()}
                </p>
                <p className="text-gray-600">Status: {booking.status}</p>
                {booking.status === "Pending" && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Accepted")
                      }
                      className="w-full border border-green-700 text-green-800 py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Declined")
                      }
                      className="w-full border border-red-700 text-red-800 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white mt-2"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <p>{selectedService?.description}</p>
      </section>
    </main>
  );
}

export default BusinessDetails;
