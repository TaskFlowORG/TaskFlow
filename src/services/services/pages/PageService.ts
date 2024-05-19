import { OrderedPage, Page, PagePost, Property, TaskCanvas, TaskOrdered, TaskPage } from '@/models';
import { Api } from '@/services/axios';



class PageService {
  async insert(projectId: number, page: PagePost): Promise<Page> {
    console.log('page', page);
    
    return (await Api.post<Page>(`page/project/${projectId}`, page, {withCredentials: true})).data;
  }

  async updateName(projectId: number, name: string| undefined| null, id: number): Promise<Page> {
    return (await Api.patch<Page>(`page/${id}/project/${projectId}`,  name , {withCredentials: true, headers:{
      'Content-Type': 'application/string'
    }})).data;
  }

  async updateDraw(projectId: number, draw: File | Blob, id: number): Promise<Page> {
    const formData = new FormData();
    formData.append('draw', draw);
    return (await Api.patch<Page>(`page/draw/${id}/project/${projectId}`, formData, {withCredentials: true})).data;
  }

  async updateTaskPage(projectId: number, taskPage: TaskPage): Promise<TaskPage> {
    return (await Api.patch<TaskCanvas>(`page/task-page/project/${projectId}`, taskPage, {withCredentials: true})).data;
  }

  async updatePropertiesOrdering(projectId: number, property: Property, id: number): Promise<Page> {
    return (await Api.patch<Page>(`page/prop-ordering/${id}/project/${projectId}`, property, {withCredentials: true})).data;
  }

  async delete(projectId: number, id: number): Promise<void> {
    await Api.delete(`page/${id}/project/${projectId}`, {withCredentials: true});
  }

  async merge(projectId: number, pages: Page[], id: number): Promise<Page[]> {
    return (await Api.patch<Page[]>(`page/merge/${id}/project/${projectId}`, pages, {withCredentials: true})).data;
  }
}

export const pageService = new PageService();
