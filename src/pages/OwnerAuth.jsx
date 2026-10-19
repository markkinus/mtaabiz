import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function OwnerAuth() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/owner/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          {isRegistering ? "Create Owner Account" : "Owner Login"}
        </h1>

        <p className="text-sm text-gray-600">
          {isRegistering
            ? "Register to list and manage your business on MtaaBiz."
            : "Log in to manage your MtaaBiz business."}
        </p>

        <div>
          <label className="mb-2 block font-medium">Email address</label>
          <input
            type="email"
            className="w-full rounded-lg border p-3"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border p-3"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 4 characters"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            required
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isRegistering
              ? "Create Account"
              : "Log In"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="font-semibold text-blue-600 hover:underline"
          >
            {isRegistering ? "Log in" : "Register"}
          </button>
        </p>

        <Link
          to="/"
          className="block text-center text-sm text-gray-600 hover:underline"
        >
          Back to homepage
        </Link>
      </form>
    </div>
  );
}

export default OwnerAuth;
