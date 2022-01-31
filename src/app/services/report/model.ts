import { Checklist } from '../api/teams/checklists/model';

export class Report {
    completionTime: Date;
    notes: string;
    checklist: Checklist;
}