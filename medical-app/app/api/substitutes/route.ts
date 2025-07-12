import { NextResponse } from "next/server"
import { createConnection } from "@/lib/db"

export async function POST(req: Request) {
  const { composition1, composition2 } = await req.json()
  
  try {
    const connection = await createConnection()
    
    let query = 'SELECT name, manufacturer_name, price FROM Substitute_Medicines WHERE short_composition1 LIKE ?'
    let params = [`%${composition1}%`]

    if (composition2) {
      query += ' AND short_composition2 LIKE ?'
      params.push(`%${composition2}%`)
    }

    const [substitutes] = await connection.execute(query, params)
    await connection.end()

    return NextResponse.json({
      substitutes: Array.isArray(substitutes) ? substitutes.map((sub: any) => ({
        name: sub.name,
        manufacturer_name: sub.manufacturer_name,
        price: sub.price || 'N/A'
      })) : []
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while searching for substitutes." },
      { status: 500 }
    )
  }
}

