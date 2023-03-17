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