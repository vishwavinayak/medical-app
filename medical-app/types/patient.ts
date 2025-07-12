export interface Patient {
  PatientID: number;
  PatientName: string;
  Age: number;
  Gender: 'Male' | 'Female' | 'Other';
  ContactInfo: string;
  medicalHistory?: MedicalRecord[];
}

export interface MedicalRecord {
  recordId: number;
  condition: string;
  diagnosisDate: string;
  treatment?: string;
  notes?: string;
}
