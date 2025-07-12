import { NextResponse } from "next/server"
import { createConnection } from "@/lib/db"

export async function POST(req: Request) {
  const { drug1, drug2 } = await req.json()

  try {
    const connection = await createConnection()
    
    const query = `
      SELECT interaction_description 
      FROM Drug_Interactions 
      WHERE (drug1 LIKE ? AND drug2 LIKE ?) 
      OR (drug1 LIKE ? AND drug2 LIKE ?)
    `
    
    const [interactions] = await connection.execute(query, [
      `%${drug1}%`, `%${drug2}%`,
      `%${drug2}%`, `%${drug1}%`
    ])
    
    await connection.end()

    const result = Array.isArray(interactions) && interactions.length > 0
      ? { interaction: interactions[0].interaction_description }
      : { interaction: "No interaction found between these drugs." }

    return NextResponse.json(result)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while searching for drug interactions." },
      { status: 500 }
    )
  }
}

