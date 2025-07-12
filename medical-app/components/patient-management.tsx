"use client"

import { useState, useEffect } from "react"
import { PatientForm } from "./patient-form"
import type { Patient, PatientFormValues } from "@/types/patient"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  async function fetchPatients() {
    try {
      const response = await fetch('/api/patients')
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setPatients(data.patients)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddPatient(data: PatientFormValues) {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      if (result.error) throw new Error(result.error)
      
      await fetchPatients() // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add patient')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
          <PatientForm onSubmit={handleAddPatient} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Patient List</h2>
          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.PatientID}>
                <CardHeader>
                  <CardTitle>{patient.PatientName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Age: {patient.Age}</p>
                  <p>Gender: {patient.Gender}</p>
                  <p>Contact: {patient.ContactInfo}</p>
                  {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Medical History</h4>
                      {patient.medicalHistory.map((record, index) => (
                        <div key={record.recordId} className="mt-2">
                          <p>Condition: {record.condition}</p>
                          <p>Diagnosed: {new Date(record.diagnosisDate).toLocaleDateString()}</p>
                          {record.treatment && <p>Treatment: {record.treatment}</p>}
                          {record.notes && <p>Notes: {record.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
