import { NextResponse } from "next/server"
import { createConnection } from "@/lib/db"

// Remove initDb function as tables are already created

export async function GET() {
  const connection = await createConnection()
  try {
    const [result] = await connection.execute(`
      SELECT p.*, GROUP_CONCAT(
        JSON_OBJECT(
          'recordId', m.RecordID,
          'condition', m.MedicalCondition,
          'diagnosisDate', m.DiagnosisDate,
          'treatment', m.Treatment,
          'notes', m.Notes
        )
      ) as medicalHistory
      FROM Patients p
      LEFT JOIN MedicalHistory m ON p.PatientID = m.PatientID
      GROUP BY p.PatientID
    `)
    
    // Format the response
    const patients = (result as any[]).map(row => ({
      ...row,
      medicalHistory: row.medicalHistory ? JSON.parse(`[${row.medicalHistory}]`) : []
    }))

    return NextResponse.json({ patients })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error fetching patients" }, { status: 500 })
  } finally {
    await connection.end()
  }
}

export async function POST(req: Request) {
  const patient = await req.json()
  const connection = await createConnection()

  try {
    // Start transaction
    await connection.beginTransaction()

    // Insert patient
    const [patientResult] = await connection.execute(
      `INSERT INTO Patients (PatientName, Age, Gender, ContactInfo) 
       VALUES (?, ?, ?, ?)`,
      [
        patient.name,
        patient.age,
        patient.gender,
        patient.contactInfo
      ]
    )

    const patientId = (patientResult as any).insertId

    // Insert medical history if provided
    if (patient.medicalCondition) {
      await connection.execute(
        `INSERT INTO MedicalHistory (PatientID, MedicalCondition, DiagnosisDate, Treatment, Notes)
         VALUES (?, ?, ?, ?, ?)`,
        [
          patientId,
          patient.medicalCondition,
          patient.diagnosisDate || new Date(),
          patient.treatment || '',
          patient.notes || ''
        ]
      )
    }

    await connection.commit()
    return NextResponse.json({ 
      message: "Patient added successfully",
      patientId: patientId
    })
  } catch (error) {
    await connection.rollback()
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while adding the patient" },
      { status: 500 }
    )
  } finally {
    await connection.end()
  }
}
