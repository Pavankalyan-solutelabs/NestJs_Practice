import { Report } from "src/reports/report.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    reports: Report[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
