import { EmployeeAssessment } from './employee-assessment.model';
import { EmployeeImage } from './employee-image.model';

export interface Employee {
    assessments: EmployeeAssessment[];
    id: string;
    fullName: string;
    cccd: string;
    phoneNo: string;
    address: string;
    email: string;
    birthday: string | Date;
    gender: number;
    images: EmployeeImage[];
}
