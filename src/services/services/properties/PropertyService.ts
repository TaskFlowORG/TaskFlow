import { Date, DatePost, Limited, LimitedPost, Property, Select, SelectPost } from "@/models";
import { Api } from "@/services/axios";

class PropertyService {
    async saveLimited(projectId: number, property: LimitedPost): Promise<Limited> {
       return (await Api.post(`property/project/${projectId}/limited`, property)).data;
    }

    async saveSelect(projectId: number, property: SelectPost): Promise<Select> {
        return (await Api.post(`property/project/${projectId}/select`, property)).data;
    }

    async saveDate(projectId: number, property: DatePost): Promise<Date> {
        return (await Api.post(`property/project/${projectId}/date`, property)).data;
    }

    async updateLimited(projectId: number, property: Limited): Promise<void> {
        await Api.put(`property/project/${projectId}/limited`, property);
    }

    async updateSelect(projectId: number, property: Select): Promise<void> {
        await Api.put(`property/project/${projectId}/select`, property);
    }

    async updateDate(projectId: number, property: Date): Promise<void> {
        await Api.put(`property/project/${projectId}/date`, property);
    }

    async patchLimited(projectId: number, property: Limited): Promise<void> {
        await Api.patch(`property/project/${projectId}/limited`, property);
    }

    async patchSelect(projectId: number, property: Select): Promise<void> {
        await Api.patch(`property/project/${projectId}/select`, property);
    }

    async patchDate(projectId: number, property: Date): Promise<void> {
        await Api.patch(`property/project/${projectId}/date`, property);
    }

    async delete(projectId: number, id: number): Promise<void> {
        await Api.delete(`property/project/${projectId}/${id}`);
    }
}

export const propertyService = new PropertyService();
