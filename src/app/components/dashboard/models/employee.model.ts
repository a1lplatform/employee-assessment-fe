import { EmployeeAssessment } from "./employee-assessment.model";

export interface Employee {
  assessments: EmployeeAssessment[],
  id: string,
  fullName: string,
  cccd: string,
  phoneNo: string,
  address: string,
  email: string,
  birthday: string,
  gender: number,
  images: any
}
