import { OrderedPage, Page, PagePost, Property, TaskCanvas, TaskPage } from '@/models';
import { Api } from '@/services/axios';



class PageService {
  async insert(projectId: number, page: PagePost): Promise<Page> {
    return (await Api.post<Page>(`page/project/${projectId}`, page)).data;
  }

  async updateName(projectId: number, name: string| undefined| null, id: number): Promise<Page> {
    return (await Api.patch<Page>(`page/${id}/project/${projectId}`, { name })).data;
  }

  async updateXAndY(projectId: number, taskPage: TaskCanvas): Promise<TaskCanvas> {
    return (await Api.patch<TaskCanvas>(`page/x-and-y/project/${projectId}`, taskPage)).data;
  }

  async updateDraw(projectId: number, draw: File | Blob, id: number): Promise<Page> {
    const formData = new FormData();
    formData.append('draw', draw);
    return (await Api.patch<Page>(`page/draw/${id}/project/${projectId}`, formData)).data;
  }

  async updateTaskPage(projectId: number, taskPage: TaskCanvas): Promise<TaskPage> {
    return (await Api.patch<TaskCanvas>(`page/task-page/project/${projectId}`, taskPage)).data;
  }

  async updatePropertiesOrdering(projectId: number, property: Property, id: number): Promise<Page> {
    return (await Api.patch<Page>(`page/prop-ordering/${id}/project/${projectId}`, property)).data;
  }

  async delete(projectId: number, id: number): Promise<void> {
    await Api.delete(`page/${id}/project/${projectId}`);
  }

  async merge(projectId: number, pages: Page[], id: number): Promise<Page[]> {
    return (await Api.patch<Page[]>(`page/merge/${id}/project/${projectId}`, pages)).data;
  }
}

export const pageService = new PageService();
