

import { OrderedPage, Page, PagePost, Property, TaskCanvas } from '@/models';
import { Api } from '@/services/axios';

class PageService {
    async insert(page: PagePost): Promise<Page> {
        return (await Api.post<Page>(`page`, page)).data;
    }


  async updateIndexesKanban(
    page: OrderedPage,
    taskId: number,
    index: number,
    columnChanged: number
  ): Promise<OrderedPage> {
    // console.log(page);
    const response = await Api.patch<OrderedPage>(
      `page/${taskId}/${index}/${columnChanged}`,
      page
    );
    return response.data;
  }

    async upDateName(name: string| undefined| null, id: number): Promise<void> {
        // console.log(name)
        const config = {headers: {
            'Content-Type': 'application/string'
        }}
        await Api.patch(`page/${id}`, name, config);
    }

  async updateIndexes(
    page: Page,
    taskId: number,
    index: number
  ): Promise<Page> {
    const response = await Api.patch<Page>(`page/${taskId}/${index}`, page);
    return response.data;
  }

    async updateXAndY(taskPage: TaskCanvas): Promise<void> {
        // console.log(taskPage)
        await Api.patch('page/x-and-y', taskPage);
    }

    async updateDraw(draw: File | Blob, id: number): Promise<void> {
        const formData = new FormData();
        formData.append('draw', draw);
        await Api.patch(`page/draw/${id}`, formData);
    }

  async updatePropertiesOrdering(
    property: Property,
    id: number
  ): Promise<void> {
    await Api.patch(`page/prop-ordering/${id}`, property);
  }

  async findOne(id: number): Promise<Page> {
    const response = await Api.get<Page>(`page/${id}`);
    return response.data;
  }

  async findAll(): Promise<Page[]> {
    const response = await Api.get<Page[]>("page");
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await Api.delete(`page/${id}`);
  }

  async merge(pages: Page[], id: number): Promise<void> {
    await Api.patch(`page/merge/${id}`, pages);
  }
}

export const pageService = new PageService();
