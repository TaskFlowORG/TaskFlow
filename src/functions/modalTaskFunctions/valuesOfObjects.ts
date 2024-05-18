import { Project, PropertyValue, Task } from "@/models";

export function valuesOfObjects(task: Project | Task): PropertyValue[] {
  let keys = Object.keys(task);
  if (keys.includes("owner")) {
    return (task as Project).values;
  } else {
    return (task as Task).properties;
  }
}
