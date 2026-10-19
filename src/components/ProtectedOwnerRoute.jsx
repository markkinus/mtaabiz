import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

function ProtectedOwnerRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p className="p-6 text-center">Checking your login...</p>;
  }

  if (!user) {
    return <Navigate to="/owner/auth" replace />;
  }

  return children;
}

export default ProtectedOwnerRoute;
