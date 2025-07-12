"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Substitute {
  name: string
  manufacturer_name: string
  price: string
}

export function SubstituteSearch() {
  const [composition1, setComposition1] = useState("")
  const [composition2, setComposition2] = useState("")
  const [substitutes, setSubstitutes] = useState<Substitute[]>([])

  const searchSubstitutes = async () => {
    const res = await fetch("/api/substitutes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ composition1, composition2 }),
    })
    const data = await res.json()
    setSubstitutes(data.substitutes)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Substitute Search</CardTitle>
        <CardDescription>Enter medicine compositions to find substitutes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter first composition"
            value={composition1}
            onChange={(e) => setComposition1(e.target.value)}
          />
          <Input
            placeholder="Enter second composition (optional)"
            value={composition2}
            onChange={(e) => setComposition2(e.target.value)}
          />
          <Button onClick={searchSubstitutes}>Search Substitutes</Button>
          {substitutes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold">Substitutes:</h3>
              <ul>
                {substitutes.map((sub, index) => (
                  <li key={index}>
                    {sub.name} ({sub.manufacturer_name}) - ₹{sub.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

