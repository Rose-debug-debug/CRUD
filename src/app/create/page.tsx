'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const soumission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reponse = await axios.post('http://127.0.0.1:8000/api/patients/', {
        first_name,
        last_name,
        gender,
        phone,
        address,
      });
      alert('Patient créé avec succès');
      setFirstname('');
      setLastname('');
      setGender('');
      setPhone('');
      setAddress('');
      router.push('/');
    } catch (error) {
      console.log('erreur', error);
      alert("Erreur lors de la création du patient.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-blue-200 rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Créer un Patient
        </h2>
        <form onSubmit={soumission} className="space-y-4">
          <div>
            <label className="block text-black font-medium mb-1">Prénom</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Entrez le prénom"
              className="w-full border  text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-1">Nom</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Entrez le nom"
              className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-1">Sexe</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="M/F"
              className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-1">Téléphone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +509 3234-5678"
              className="w-full border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-1">Adresse</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresse complète"
              className="w-full border  text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
