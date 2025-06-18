"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

// 🔐 Lien backend sécurisé via .env
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UpdatePatient() {
  const { id } = useParams();
  const router = useRouter();

  const [last_name, setLastname] = useState("");
  const [first_name, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${API_URL}/patients/${id}/`);
        const data = response.data;
        setLastname(data.last_name);
        setFirstname(data.first_name);
        setGender(data.gender);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/patients/${id}/`, {
        first_name,
        last_name,
        gender,
        phone,
        address,
      });
      alert("Mise à jour effectuée avec succès !");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">Modifier un patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Prénom</label>
          <input
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Nom</label>
          <input
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Sexe</label>
          <input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Téléphone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Adresse</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
