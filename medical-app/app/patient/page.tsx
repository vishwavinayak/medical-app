"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PatientManagement } from "@/components/patient-management"

export default function PatientPage() {
  const router = useRouter()
  return (
    <main className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">Back</Button>
      <h1 className="text-3xl font-bold mb-6">Patient Management</h1>
      <PatientManagement />
    </main>
  )
}
