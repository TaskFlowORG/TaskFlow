import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class Option {
    id!: number;
    name!: string;
    color!: string;
  
    constructor(id: number, name: string, color: string) {}

    equals(obj: any): boolean {
        if (obj instanceof Option) {
            return this.id === obj.id;
        }
        return false;
    }
}
