import { Task, TaskPage } from "@/models";
import { Api } from "@/services/axios"; // Assuming 'Api' is the imported instance of axios

class TaskService {
    async insert(projectId: number, pageId: number): Promise<Task> {
        const response = await Api.post<Task>(`task/${projectId}/${pageId}`, {withCredentials: true});
        return response.data;
    }

    async upDate(task: Task, projectId:number): Promise<Task> {
        return (await Api.put<Task>('task/project/'+projectId, task, {withCredentials: true})).data;
    }

    async patch(task: Task, projectId:number): Promise<Task> {
        return (await Api.patch<Task>('task/project/'+projectId, task, {withCredentials: true})).data;
    }

    async findTodaysTasks(id: string): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/today/${id}`, {withCredentials: true});
        return response.data;
    }

    async delete(id: number, projectId: string): Promise<void> {
        await Api.delete(`task/project/${projectId}/${id}`, {withCredentials: true});
    }

    async deletePermanent(id: number, projectId:number): Promise<void> {
        await Api.delete(`task/project/${projectId}/${id}/permanent`, {withCredentials: true});
    }

    async redo(id: number, projectId: string): Promise<Task> {
        return ((await Api.put<Task>(`task/project/${projectId}/redo/${id}`, {withCredentials: true})).data);
    }

    async complete(taskId:number, projectId:number): Promise<Task> {
        const response = await Api.patch<Task>(`task/${taskId}/project/${projectId}/complete`, {withCredentials: true});
        return response.data;
    }

    async getDeletedTasks(project: number): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/project/${project}`, {withCredentials: true});
        return response.data;
    }
}

export const taskService = new TaskService();
