import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export async function testFirestore() {
    const businessesRef = collection(db, "businesses");

    const q = query(
        businessesRef,
        where("published", "==", true)
    );

    const snapshot = await getDocs(q);

    const businesses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    console.log("Businesses loaded from Firebase:", businesses);

    return businesses;
}