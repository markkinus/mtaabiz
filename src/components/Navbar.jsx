import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Navbar() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Could not log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <nav className="bg-green-800 text-white px-6 py-4">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold">
          MtaaBiz
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/" className="hover:text-green-200">
            Home
          </Link>

          <Link to="/#businesses" className="hover:text-green-200">
            Businesses
          </Link>

          {user && (
              <Link to="/my-bookings" className="hover:text-green-200">
                My Bookings
              </Link>
          )}

          <Link
            to="/owner/auth"
            className="bg-white text-green-800 py-2 px-4 rounded-lg font-semibold hover:bg-green-100"
          >
            List Your Business
          </Link>

          {user ? (
            <button onClick={handleLogout} disabled={loggingOut} className="hover:bg-green-700 text-white py-2 px-4 font-semibold">
              {loggingOut ? "Logging out..." : "Logout"}
              </button>
          ) : (
            <Link to="/login" className="hover:text-green-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
