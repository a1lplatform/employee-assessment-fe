import { Roles } from '@shared/enums';

export class CommonHelper {
    static buildFormData(
        Address: string,
        Birthday: string,
        CCCD: string,
        Email: string,
        FullName: string,
        Gender: string,
        PhoneNo: string,
        ID?: string
    ): FormData {
        const formData = new FormData();
        formData.append('CCCD', CCCD);
        formData.append('FullName', FullName);
        formData.append('PhoneNo', PhoneNo);
        formData.append('Address', Address);
        formData.append('Email', Email);
        formData.append('Birthday', Birthday);
        formData.append('Gender', Gender);
        formData.append('ID', ID as string);
        return formData;
    }

    static buildSignupFormData(
        userName: string,
        password: string,
        fullName: string,
        cccd: string,
        phoneNo: string,
        address: string,
        email: string,
        birthday: string,
        gender: string
    ): FormData {
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('fullName', fullName);
        formData.append('cccd', cccd);
        formData.append('phoneNo', phoneNo);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('birthday', birthday);
        formData.append('gender', gender);
        formData.append('roleName', Roles.CLIENT);
        return formData;
    }
}
