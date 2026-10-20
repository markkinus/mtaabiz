import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function BusinessOwnerDashboard() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("Beauty & Grooming");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [services, setServices] = useState([{ name: "", price: "" }]);

  const [myBusiness, setMyBusiness] = useState(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMyBusiness(null);
        setBookings([]);
        setLoadingBusiness(false);
        setLoadingBookings(false);
        console.log("No signed-in user.");
        return;
      }

      console.log("Authenticated UID:", user.uid);

      setLoadingBusiness(true);

      try {
        // Load owner's business
        const businessQuery = query(
          collection(db, "businesses"),
          where("ownerId", "==", user.uid),
        );

        const businessSnapshot = await getDocs(businessQuery);

        if (!businessSnapshot.empty) {
          const businessDoc = businessSnapshot.docs[0];

          setMyBusiness({
            id: businessDoc.id,
            ...businessDoc.data(),
          });

          console.log("Business found:", businessDoc.data());
        } else {
          setMyBusiness(null);
          console.log("No business found for this owner.");
        }

        // Load owner's bookings
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("ownerId", "==", user.uid),
        );

        const bookingsSnapshot = await getDocs(bookingsQuery);

        const ownerBookings = bookingsSnapshot.docs.map((bookingDoc) => ({
          id: bookingDoc.id,
          ...bookingDoc.data(),
        }));

        setBookings(ownerBookings);

        console.log("Bookings found:", ownerBookings.length);
      } catch (error) {
        console.error("Error loading owner's business:", error);
      } finally {
        setLoadingBusiness(false);
        setLoadingBookings(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleServiceChange(index, field, value) {
    const updatedServices = [...services];

    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };

    setServices(updatedServices);
  }

  // Function to start editing
  const startEditing = () => {
    setBusinessName(myBusiness.name);
    setCategory(myBusiness.category);
    setLocation(myBusiness.location);
    setDescription(myBusiness.description);
    setWhatsappNumber(myBusiness.whatsappNumber || "");

    setServices(
      myBusiness.services?.map((service) => ({
        name: service.name,
        price: service.price,
      })) || [],
    );
    setIsEditing(true);
  };

  function addService() {
    setServices([...services, { name: "", price: "" }]);
  }

  function removeService(index) {
    setServices(services.filter((_, serviceIndex) => serviceIndex !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in as a business owner to add a business.");
      return;
    }

    try {
      const businessData = {
        name: businessName,
        category: category,
        location: location,
        description: description,
        whatsappNumber: whatsappNumber,
        services: services.map((service) => ({
          name: service.name,
          price: service.price,
        })),
        ownerId: auth.currentUser.uid,
        published: true,
      };

      if (isEditing && myBusiness) {
        // Update an existing business
        await updateDoc(doc(db, "businesses", myBusiness.id), businessData);

        setMyBusiness({
          id: myBusiness.id,
          ...businessData,
        });

        setIsEditing(false);
        alert("Business updated successfully!");
      } else {
        // Add a new business
        const businessRef = await addDoc(
          collection(db, "businesses"),
          businessData,
        );
        setMyBusiness({
          id: businessRef.id,
          ...businessData,
        });
        alert("Business added successfully!");
      }
    } catch (error) {
      console.error("Error adding business:", error);
      alert("An error occurred while adding the business. Please try again.");
    }
  }

  // Function to confirm a booking
  async function confirmBooking(bookingId) {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "confirmed",
      });

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "confirmed" }
            : booking,
        ),
      );

      alert("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Could not confirm booking. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Business Owner Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          {isEditing ? "Edit Your Business" : "Add Your Business"}
        </p>

        {loadingBusiness ? (
          <p className="mb-6 text-gray-600">Loading your business...</p>
        ) : myBusiness ? (
          <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Your Business</h2>

            <h3 className="text-lg font-semibold">{myBusiness.name}</h3>

            <p className="text-gray-600">{myBusiness.category}</p>

            <p className="text-gray-600">{myBusiness.location}</p>

            <p className="mt-3">{myBusiness.description}</p>

            <h4 className="mt-5 font-semibold">Services and Prices</h4>

            <ul className="mt-2 space-y-2">
              {myBusiness.services?.map((service, index) => (
                <li
                  key={index}
                  className="flex justify-between rounded-lg bg-gray-50 p-3"
                >
                  <span>{service.name}</span>
                  <span className="font-medium">KES {service.price}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm">
              Status:{" "}
              <span className="font-semibold">
                {myBusiness.published ? "Published" : "Unpublished"}
              </span>
              <button
                type="button"
                onClick={startEditing}
                className="ml-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
              >
                Edit Business
              </button>
            </p>
          </div>
        ) : (
          <p className="mb-6 text-gray-600">
            You haven't created a business yet.
          </p>
        )}

        {(!myBusiness || isEditing) && (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
          >
            <div>
              <label className="mb-2 block font-medium">Business name</label>
              <input
                className="w-full rounded-lg border p-3"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="e.g. Fresh Cuts Barbershop"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Category</label>
              <select
                className="w-full rounded-lg border p-3"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option>Beauty & Grooming</option>
                <option>Automotive</option>
                <option>Home Services</option>
                <option>Photography</option>
                <option>Electronics Repair</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Business location
              </label>
              <input
                className="w-full rounded-lg border p-3"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Kasarani, Nairobi"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Business WhatsApp Number
              </label>

              <input
                type="tel"
                className="w-full rounded-lg border p-3"
                value={whatsappNumber}
                onChange={(event) => setWhatsappNumber(event.target.value)}
                placeholder="e.g. 0712345678"
                required
              />

              <p className="mt-1 text-sm text-gray-500">
                Enter the WhatsApp number customers should contact.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Business description
              </label>
              <textarea
                className="w-full rounded-lg border p-3"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tell customers about your business..."
                required
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Services and prices</h2>

                <button
                  type="button"
                  onClick={addService}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
                >
                  Add service
                </button>
              </div>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-2"
                  >
                    <input
                      className="rounded-lg border p-3"
                      placeholder="Service name"
                      value={service.name}
                      onChange={(event) =>
                        handleServiceChange(index, "name", event.target.value)
                      }
                      required
                    />

                    <div className="flex gap-2">
                      <input
                        className="min-w-0 flex-1 rounded-lg border p-3"
                        type="number"
                        placeholder="Price (KES)"
                        value={service.price}
                        onChange={(event) =>
                          handleServiceChange(
                            index,
                            "price",
                            event.target.value,
                          )
                        }
                        required
                      />

                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="rounded-lg px-3 text-red-600 hover:bg-red-50"
                          aria-label={`Remove service ${index + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {isEditing ? "Save Changes" : "Create Business"}
            </button>
          </form>
        )}

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">Booking Requests</h2>

          {loadingBookings ? (
            <p className="text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="rounded-lg border bg-white p-5 text-gray-600">
              You have no booking requests yet.
            </p>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{booking.serviceName}</h3>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                      {booking.status}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-700">
                    Customer: {booking.customerName}
                  </p>
                  <p className="text-gray-700">Phone: {booking.phone}</p>
                  <p className="text-gray-700">Date: {booking.date}</p>
                  <p className="text-gray-700">Time: {booking.time}</p>

                  <p className="mt-2 font-semibold text-green-800">
                    KSh {Number(booking.price).toLocaleString()}
                  </p>

                  {booking.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => confirmBooking(booking.id)}
                      className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default BusinessOwnerDashboard;
