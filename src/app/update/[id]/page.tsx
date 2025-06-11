"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
export default function update() {
  const { id } = useParams();
  const router = useRouter();
  const [last_name, setLastname] = useState("");
  const [first_name, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/patients/${id}/`
        );
        const data = response.data;
        setLastname(data.last_name);
        setFirstname(data.first_name);
        setGender(data.gender);
        setPhone(data.phone);
        setAdress(data.address);
      } catch (error) {
        console.log("erreur", error);
      }
    };

    fetch();
  }, [id]);

  const soumission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/patients/${id}/`,
        {
          first_name,
          last_name,
          gender,
          phone,
          address,
        }
      );
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return (
<div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl text-gray-800 font-bold mb-4">Modifier un patient</h2>
  <form onSubmit={soumission} className="space-y-4">
    <div>
      <label className="block mb-1 text-gray-700">Prénom</label>
      <input
        value={first_name}
        onChange={(e) => setFirstname(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700">Nom</label>
      <input
        value={last_name}
        onChange={(e) => setLastname(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700">Sexe</label>
      <input
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700">Téléphone</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700">Adresse</label>
      <input
        value={address}
        onChange={(e) => setAdress(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
