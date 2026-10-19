import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

const businesses = [
    {
        name: "Fresh Cuts Barbershop",
        category: "Beauty & Grooming",
        location: "Kasarani, Nairobi",
        description: "Professional haircuts and grooming services.",
        services: [
            { name: "Standard Haircut", price: 300 },
            { name: "Haircut and Beard Trim", price: 500 },
        ],
        published: true,
        walkIns: true,
    },
    {
        name: "Mama Njeri Restaurant",
        category: "Food & Dining",
        location: "Roysambu, Nairobi",
        description: "Local meals prepared fresh every day.",
        services: [
            { name: "Lunch Special", price: 350 },
            { name: "Family Meal", price: 1000 },
        ],
        published: true,
        walkIns: true,
    },
    {
        name: "SmartFix Electronics",
        category: "Electronics",
        location: "Thika Road, Nairobi",
        description: "Phone repairs and electronics services.",
        services: [
            { name: "Phone Diagnostics", price: 300 },
            { name: "Screen Repair", price: 1500 },
        ],
        published: true,
        walkIns: true,
    },
];

export async function seedBusinesses() {
    for (const business of businesses) {
        await addDoc(collection(db, "businesses"), business);
    }

    console.log("Businesses added successfully!");
}