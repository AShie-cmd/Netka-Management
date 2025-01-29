import { Config } from "ziggy-js";

export interface User {
    code: string;
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Group {
    school_name: string;
    id: number;
    gender: string;
    number: number;
    status: string;
    project_id: number;
    leader_id: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    groups: {
        group: Group;
    };
};
