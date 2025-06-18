"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: number;
  address: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${API_URL}/patients/`);
        console.log("patient", response);
        setPatients(response.data);
      } catch (error) {
        console.log("erreur", error);
      }
    };
    fetchPatient();
  }, []);

  return (
    <div className="p-6 max-w-5xl bg-white mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Liste des Patients</h2>
        <Link
          href="/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          Créer un Patient
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="text-black text-center">
          Aucun patient trouvé pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Prénom</th>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Sexe</th>
                <th className="px-4 py-2 border">Téléphone</th>
                <th className="px-4 py-2 border">Adresse</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{patient.id}</td>
                  <td className="px-4 py-2 border">{patient.first_name}</td>
                  <td className="px-4 py-2 border">{patient.last_name}</td>
                  <td className="px-4 py-2 border">{patient.gender}</td>
                  <td className="px-4 py-2 border">{patient.phone}</td>
                  <td className="px-4 py-2 border">{patient.address}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/update/${patient.id}`}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                      >
                        Modifier
                      </Link>
                      <Link
                        href={`/delete/${patient.id}`}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-300"
                      >
                        Supprimer
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
