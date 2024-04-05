import { Task, TaskPage } from "@/models";
import { Api } from "@/services/axios"; // Assuming 'Api' is the imported instance of axios

class TaskService {
    async insert(projectId: number, pageId: string): Promise<Task> {
        const response = await Api.post<Task>(`task/${projectId}/${pageId}`);
        return response.data;
    }

    async upDate(task: Task, projectId:number): Promise<Task> {
        return (await Api.put<Task>('task/project/'+projectId, task)).data;
    }

    async patch(task: Task, projectId:number): Promise<Task> {
        return (await Api.patch<Task>('task/project/'+projectId, task)).data;
    }

    async findTodaysTasks(id: string): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/today/${id}`);
        return response.data;
    }

    async delete(id: number, projectId: string): Promise<void> {
        await Api.delete(`task/project/${projectId}/${id}`);
    }

    async deletePermanent(id: number, projectId:number): Promise<void> {
        await Api.delete(`task/project/${projectId}/${id}/permanent`);
    }

    async redo(id: number, projectId: string): Promise<Task> {
        return ((await Api.put<Task>(`task/project/${projectId}/redo/${id}`)).data);
    }

    async complete(taskId:number, projectId:number): Promise<Task> {
        const response = await Api.patch<Task>(`task/${taskId}/project/${projectId}/complete`);
        return response.data;
    }

    async getDeletedTasks(project: number): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/project/${project}`);
        return response.data;
    }
}

export const taskService = new TaskService();
