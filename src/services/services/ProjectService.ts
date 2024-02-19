
import { Project, ProjectPost, ProjectPut, User } from "@/models";
import { Api } from "../axios";
import { UserGet } from "@/models/user/user/UserGetDTO";

class ProjectService {
    async insert(project: ProjectPost): Promise<void> {
        await Api.post("project", project);
    }

    async updatePicture(picture: File, id: number): Promise<void> {
        const formData = new FormData();
        formData.append("picture", picture);
        await Api.patch(`project/picture/${id}`, formData);
    }

    async setVisualizedNow(project: Project): Promise<void> {
        await Api.patch(`project/set-now`, project);
    }

    async update(project: Project): Promise<void> {
        const projectPut = new ProjectPut(project.id, project.name ?? "", project.description ?? "", project.deadline! )
        await Api.put("project", projectPut);
    }

    async patch(project: Project): Promise<void> {
        const projectPut = new ProjectPut(project.id, project.name ?? "", project.description ?? "", project.deadline! )
        await Api.patch("project", projectPut);
    }

    async findOne(id: number): Promise<Project> {
        const response = await Api.get<Project>(`project/${id}`);
        return response.data;
    }

    async findAll(): Promise<Project[]> {
        const response = await Api.get<Project[]>("project");
        return response.data;
    }

    async findAllOfAUser(userId: string): Promise<Project[]> {
        const response = await Api.get<Project[]>(`project/user/${userId}`);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`project/${id}`);
    }

    async updateOwner(newOwner: User, projectId: number): Promise<void> {
        await Api.patch(`project/change-owner/${projectId}`, newOwner);
    }
}

export const projectService = new ProjectService();