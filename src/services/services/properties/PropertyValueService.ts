import { ArchiveValued } from "./../../../models/values/ArchiveValued";
import {
  Date,
  DatePost,
  Limited,
  LimitedPost,
  Property,
  Select,
  SelectPost,
} from "@/models";
import { Api } from "@/services/axios";

class PropertyValueService {


  async updateArchiveInTask(
    file: File,
    projectId: number,
    propertyValueId: number
  ): Promise<ArchiveValued> {
    let formdata = new FormData();
    formdata.append("file", file);
    return (
      await Api.patch(
        `project/${projectId}/task/property-value/${propertyValueId}`,
        formdata,
        {
          withCredentials: true,
        }
      )
    ).data;
  }

  async updateArchive(
    file: File,
    projectId: number,
    propertyValueId: number
  ): Promise<ArchiveValued> {
    let formdata = new FormData();
    formdata.append("file", file);
    return (
      await Api.patch(
        `project/${projectId}/property-value/${propertyValueId}`,
        formdata,
        {
          withCredentials: true,
        }
      )
    ).data;
  }
}

export const propertyValueService = new PropertyValueService();
