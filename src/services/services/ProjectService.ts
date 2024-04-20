import { OtherUser, Project, ProjectPost, ProjectPut, ProjectSimple, User } from "@/models";
import { Api } from "../axios";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";

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
        const response = await Api.get<Project>(`project/${id}`, { withCredentials:true});
        return response.data;
    }

    async findAllOfAUser(): Promise<ProjectSimple[]> {
        const response = await Api.get<ProjectSimple[]>("project/my", {withCredentials: true});
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`project/${id}`);
    }

    async updateOwner(newOwner: OtherUser, projectId: number): Promise<Project> {
        const response = await Api.patch<Project>(`project/${projectId}/change-owner`, newOwner, {withCredentials: true});
        return response.data;
    }

    async inviteGroup(projectId:number, group:SimpleGroup): Promise<void> {
        await Api.post(`project/${projectId}/invite-group`, group, {withCredentials: true});
    }
}

export const projectService = new ProjectService();
