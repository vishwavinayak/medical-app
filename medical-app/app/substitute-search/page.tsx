"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SubstituteSearch } from "@/components/substitute-search"

export default function SubstituteSearchPage() {
  const router = useRouter()
  return (
    <main className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">Back</Button>
      <h1 className="text-3xl font-bold mb-6">Substitute Medicine Search</h1>
      <SubstituteSearch />
    </main>
  )
}

