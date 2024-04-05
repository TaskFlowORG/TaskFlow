import { Project, ProjectPost, ProjectPut, ProjectSimple, User } from "@/models";
import { Api } from "../axios";

class ProjectService {
    async insert(project: ProjectPost): Promise<ProjectSimple> {
        return (await Api.post<ProjectSimple>("project", project)).data;
    }

    async updatePicture(picture: File, id: number): Promise<Project> {
        const formData = new FormData();
        formData.append("picture", picture);
        const response = await Api.patch<Project>(`project/${id}/picture`, formData);
        return response.data;
    }

    async setVisualizedNow(id: number): Promise<Project> {
        const response = await Api.patch<Project>(`project/${id}/set-now`);
        return response.data;
    }

    async update(project: ProjectPut, id: number): Promise<Project> {
        const response = await Api.put<Project>(`project/${id}`, project);
        return response.data;
    }

    async patch(project: ProjectPut, id: number): Promise<Project> {
        const response = await Api.patch<Project>(`project/${id}`, project);
        return response.data;
    }

    async findOne(id: number): Promise<Project> {
        const response = await Api.get<Project>(`project/${id}`);
        return response.data;
    }

    async findAllOfAUser(): Promise<ProjectSimple[]> {
        const response = await Api.get<ProjectSimple[]>("project/me-owner");
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`project/${id}`);
    }

    async updateOwner(newOwner: User, projectId: number): Promise<Project> {
        const response = await Api.patch<Project>(`project/${projectId}/change-owner`, newOwner);
        return response.data;
    }
}

export const projectService = new ProjectService();
