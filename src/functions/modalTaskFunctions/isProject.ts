import { Project, Task, Value } from "@/models"

export function  isProject(task:Project | Task) {
  let keys = Object.keys(task)
  console.log(keys)
  if (keys.includes('owner')){
    return true
  } else {
    return false
  }
}