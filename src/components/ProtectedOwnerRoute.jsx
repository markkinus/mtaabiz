import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

function ProtectedOwnerRoute({ children, requireBusiness = true }) {
  const [user, authLoading] = useAuthState(auth);
  const [checkingBusiness, setCheckingBusiness] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkBusinessOwnership() {
      if (authLoading) return;

      if (!user || !requireBusiness) {
        setCheckingBusiness(false);
        return;
      }

      setCheckingBusiness(true);
      setError("");

      try {
        const businessQuery = query(
          collection(db, "businesses"),
          where("ownerId", "==", user.uid),
        );

        const snapshot = await getDocs(businessQuery);

        if (!cancelled) {
          setHasBusiness(!snapshot.empty);
        }
      } catch (error) {
        console.error("Error checking business ownership:", error);

        if (!cancelled) {
          setError("Could not verify business ownership. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setCheckingBusiness(false);
        }
      }
    }

    checkBusinessOwnership();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, requireBusiness]);

  if (authLoading || checkingBusiness) {
    return <p className="p-6 text-center">Checking your account...</p>;
  }

  if (!user) {
    return <Navigate to="/owner/auth" replace />;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  if (requireBusiness && !hasBusiness) {
    return <Navigate to="/owner/register-business" replace />;
  }

  return children;
}

export default ProtectedOwnerRoute;
