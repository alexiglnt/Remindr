export interface User {
    id: string | number;
    name: string;
    email: string;
    image: string;
}

export interface Group {
    id?: number;
    name: string;
    description: string;
    image?: string;
}

export interface GroupUsers {
    IdG: number;
    IdU: string;
}

export interface Reminder {
    id?: number;
    title: string;
    dateRendu: Date;
    description: string;
    couleur: string;
    groupId: number;
}