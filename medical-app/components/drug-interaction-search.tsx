"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DrugInteractionSearch() {
  const [drug1, setDrug1] = useState("")
  const [drug2, setDrug2] = useState("")
  const [interactions, setInteractions] = useState<string | null>(null)

  const searchInteractions = async () => {
    const res = await fetch("/api/drug-interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drug1, drug2 }),
    })
    const data = await res.json()
    setInteractions(data.interaction)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drug Interaction Search</CardTitle>
        <CardDescription>Enter two drug names to check for interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter first drug name" value={drug1} onChange={(e) => setDrug1(e.target.value)} />
          <Input placeholder="Enter second drug name" value={drug2} onChange={(e) => setDrug2(e.target.value)} />
          <Button onClick={searchInteractions}>Search Interactions</Button>
          {interactions && (
            <div className="mt-4">
              <h3 className="font-bold">Interaction:</h3>
              <p>{interactions}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

