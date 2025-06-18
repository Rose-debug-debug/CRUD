'use client'

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// 🔗 Récupération du lien backend depuis l'env
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function DeletePatient() {
  const { id } = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<any>(null)

  useEffect(() => {
    const DelPatient = async () => {
      try {
        const response = await axios.get(`${API_URL}/patients/${id}/`)
        setPatient(response.data)
      } catch (error) {
        console.error("Erreur lors du fetch patient à supprimer :", error)
      }
    }
    DelPatient()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/patients/${id}/`)
      alert('Patient supprimé avec succès !')
      router.push('/')
    } catch (error) {
      console.error("Erreur lors de la suppression :", error)
    }
  }

  if (!patient) return <p className="p-6 text-black">Chargement...</p>

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl text-black font-bold mb-4">Supprimer un patient</h2>
      <p className="text-red-600 mb-4">
        Voulez-vous vraiment supprimer <strong>{patient.first_name}</strong> ?
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
      >
        Confirmer la suppression
      </button>
    </div>
  )
}
