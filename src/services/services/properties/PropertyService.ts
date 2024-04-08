import { Date, DatePost, Limited, LimitedPost, Property, Select, SelectPost } from "@/models";
import { Api } from "@/services/axios";

class PropertyService {
    async saveLimited(property: LimitedPost): Promise<any> {
       return (await Api.post('property/limited', property)).data;
    }

    async saveSelect(property: SelectPost): Promise<any> {
        return (await Api.post('property/select', property)).data;
    }

    async saveDate(property: DatePost): Promise<any> {
        return (await Api.post('property/date', property)).data;
    }

    async updateLimited(property: Limited): Promise<void> {
        await Api.put('property/limited', property);
    }

    async updateSelect(property: Select): Promise<void> {
        await Api.put('property/select', property);
    }

    async updateDate(property: Date): Promise<void> {
        await Api.put('property/date', property);
    }

    async patchLimited(property: Limited): Promise<void> {
        await Api.patch('property/limited', property);
    }

    async patchSelect(property: Select): Promise<void> {
        await Api.patch('property/select', property);
    }

    async patchDate(property: Date): Promise<void> {
        await Api.patch('property/date', property);
    }

    async findOne(id: number): Promise<Property> {
        return (await Api.get<Property>(`property/${id}`)).data;
    }

    async findAll(): Promise<Property[]> {
        return (await Api.get<Property[]>('property')).data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`property/${id}`);
    }
}

export const propertyService = new PropertyService();