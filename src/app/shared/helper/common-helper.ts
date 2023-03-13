export class CommonHelper {
    static buildFormData(
        ID: string,
        Address: string,
        Birthday: string,
        CCCD: string,
        Email: string,
        FullName: string,
        Gender: string,
        PhoneNo: string,
        Assessments?: string,
        Images?: unknown
    ): FormData {
        const formData = new FormData();
        formData.append('ID', ID);
        formData.append('CCCD', CCCD);
        formData.append('FullName', FullName);
        formData.append('PhoneNo', PhoneNo);
        formData.append('Address', Address);
        formData.append('Email', Email);
        formData.append('Birthday', Birthday);
        formData.append('Gender', Gender);
        return formData;
    }
}
