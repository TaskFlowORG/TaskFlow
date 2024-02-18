import { AllArgsConstructor } from '@/utils';

@AllArgsConstructor
export class Archive {
    id!: number;
    name!: string;
    type!: string;
    data!: number[];

    constructor(id: number, name: string, type: string, data: number[]) {}

    equals(obj: any): boolean {
        if (obj instanceof Archive) {
            return obj.constructor === this.constructor && obj.id === this.id;
        }
        return false;
    }
}
