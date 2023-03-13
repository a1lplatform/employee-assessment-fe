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
}
