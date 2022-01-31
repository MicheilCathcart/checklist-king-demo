import { Injectable } from '@angular/core';

export interface IIndustryTerms {
    taskGroupName: string;
}

@Injectable()
export class IndustryTermsService {

    cleaning: IIndustryTerms = {
        taskGroupName: 'Task Group'
    };

    mechanic: IIndustryTerms = {
        taskGroupName: 'Car Part'
    };

    industry: IIndustryTerms;

    constructor() {
        this.industry = this.cleaning;
    }

}
