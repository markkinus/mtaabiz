import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeBookings = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Stop listening to the previous user's bookings
      if (unsubscribeBookings) {
        unsubscribeBookings();
        unsubscribeBookings = null;
      }

      if (!user) {
        setBookings([]);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      const bookingsQuery = query(
        collection(db, "bookings"),
        where("customerId", "==", user.uid),
      );

      unsubscribeBookings = onSnapshot(
        bookingsQuery,
        (snapshot) => {
          const customerBookings = snapshot.docs.map((bookingDoc) => ({
            id: bookingDoc.id,
            ...bookingDoc.data(),
          }));

          setBookings(customerBookings);
          setLoading(false);
        },
        (error) => {
          console.error("Error listening to bookings:", error);
          setError("Could not load your bookings. Please try again.");
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeBookings) {
        unsubscribeBookings();
      }
    };
  }, []);

  if (loading) {
    return <main className="p-8 text-center">Loading your bookings...</main>;
  }

  if (!auth.currentUser) {
    return (
      <main className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">Login Required</h1>
        <p className="text-gray-600 mb-5">
          Please log in to view your bookings.
        </p>
        <Link
          to="/login"
          className="inline-block bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-600 mb-8">
        Track your service booking requests and their status.
      </p>

      {error && (
        <p className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">{error}</p>
      )}

      {bookings.length === 0 ? (
        <section className="bg-gray-50 border rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-gray-600 mb-5">
            Find a local business and book a service to get started.
          </p>
          <Link to="/" className="text-green-700 underline">
            Explore businesses
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start gap-3 mb-4">
                <h2 className="text-xl font-bold">{booking.businessName}</h2>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="text-gray-700">
                <strong>Service:</strong> {booking.serviceName}
              </p>

              <p className="text-gray-700 mt-2">
                <strong>Price:</strong> KSh {booking.price}
              </p>

              <p className="text-gray-700 mt-2">
                <strong>Date:</strong> {booking.date}
              </p>

              <p className="text-gray-700 mt-2">
                <strong>Time:</strong> {booking.time}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;
