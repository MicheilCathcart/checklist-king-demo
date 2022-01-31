export class Team {
    name: string = '';
    onCompleteEmail: string = '';
    replyToEmail: string = '';
    logoPath?: string;
    emailHeader?: string;
    emailFooter?: string;
    emailHighlightColour?: string;
    emailTextColour?: string;
    emailHeadingTextColour?: string;
    emailHeadingBackgroundColour?: string;
    emailBodyBackgroundColour?: string;
}

export interface TeamInvite {
    name: string;
    id: string;
    replyToEmail: string;
}

export interface TeamUser {
    name: string;
    email: string;
    role: string;
}
