import { Task, TaskPage } from "@/models";
import { Api } from "@/services/axios"; // Assuming 'Api' is the imported instance of axios

class TaskService {
    async insert(pageId: number, userId: string): Promise<Task> {
        const response = await Api.post<Task>(`task/${pageId}/${userId}`);
        return response.data;
    }

    async upDate(task: Task): Promise<void> {
        await Api.put('task', task);
    }

    async patch(task: Task): Promise<void> {
        await Api.patch('task', task);
    }

    async findOne(id: number): Promise<Task> {
        const response = await Api.get<Task>(`task/${id}`);
        return response.data;
    }

    async findByName(name: string): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/name/${name}`);
        return response.data;
    }

    async findAll(): Promise<Task[]> {
        const response = await Api.get<Task[]>('task');
        return response.data;
    }

    async findTodaysTasks(id: string): Promise<Task[]> {
        const response = await Api.get<Task[]>(`task/today/${id}`);
        return response.data;
    }

    async delete(id: number, userId: string): Promise<void> {
        await Api.delete(`task/${id}/${userId}`);
    }

    async redo(id: number, userId: string): Promise<void> {
        await Api.put(`task/redo/${userId}`);
    }

    async getTasksOfMonth(month: number, pageId: number, propertyId: number): Promise<TaskPage[]> {
        const response = await Api.get<TaskPage[]>(`task/month/${month}/${pageId}/${propertyId}`);
        return response.data;
    }
}

export const taskService = new TaskService();
