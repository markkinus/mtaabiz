import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

function CustomerAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Customer Login" : "Create Customer Account"}
        </h1>

        <p className="text-gray-500 text-center mt-2">
          {isLogin
            ? "Login to manage your bookings"
            : "Create an account to book services"}
        </p>

        {error && (
          <p className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="w-full mt-4 text-green-700 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}

export default CustomerAuth;
