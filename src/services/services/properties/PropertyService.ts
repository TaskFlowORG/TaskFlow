import { Date, DatePost, Limited, LimitedPost, Property, Select, SelectPost } from "@/models";
import { Api } from "@/services/axios";

class PropertyService {
    async saveLimited(projectId: number, property: LimitedPost): Promise<Limited> {
       console.log(property)
        return (await Api.post(`property/project/${projectId}/limited`, property, {withCredentials: true})).data;
    }

    async saveSelect(projectId: number, property: SelectPost): Promise<Select> {
        console.log(property)
        return (await Api.post(`property/project/${projectId}/select`, property, {withCredentials: true})).data;
    }

    async saveDate(projectId: number, property: DatePost): Promise<Date> {

        console.log(property)
        return (await Api.post(`property/project/${projectId}/date`, property, {withCredentials: true})).data;
    }

    async updateLimited(projectId: number, property: Limited): Promise<Limited> {
        console.log(property.maximum)
        return (await Api.put(`property/project/${projectId}/limited`, property, {withCredentials: true})).data;
    }

    async updateSelect(projectId: number, property: Select): Promise<Select> {
       return (await Api.put(`property/project/${projectId}/select`, property, {withCredentials: true})).data;
    }

    async updateDate(projectId: number, property: Date): Promise<Date> {
        return (await Api.put(`property/project/${projectId}/date`, property, {withCredentials: true})).data;
    }

    async patchLimited(projectId: number, property: Limited): Promise<void> {
        await Api.patch(`property/project/${projectId}/limited`, property, {withCredentials: true});
    }

    async patchSelect(projectId: number, property: Select): Promise<void> {
        await Api.patch(`property/project/${projectId}/select`, property, {withCredentials: true});
    }

    async patchDate(projectId: number, property: Date): Promise<void> {
        await Api.patch(`property/project/${projectId}/date`, property, {withCredentials: true});
    }

    async delete(projectId: number, id: number): Promise<void> {
        await Api.delete(`property/project/${projectId}/${id}`, {withCredentials: true});
    }
}

export const propertyService = new PropertyService();
