"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DrugInteractionSearch } from "@/components/drug-interaction-search"

export default function DrugInteractionsPage() {
  const router = useRouter()
  return (
    <main className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">Back</Button>
      <h1 className="text-3xl font-bold mb-6">Drug Interactions</h1>
      <DrugInteractionSearch />
    </main>
  )
}

