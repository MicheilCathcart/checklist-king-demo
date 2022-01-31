export class Checklist {
    name: string;
    category: string;
    onFinishEmail?: string;
    uid?: string;
    shared?: boolean;
    notes?: string;
    checklist: TaskGroups[] | {};
    date?: Date;
    finishDate?: Date;
    clientName?: string;
    address?: string;

    constructor() {}
}

export interface TaskGroups {
    groupName: string;
    tasks: {}[];
}