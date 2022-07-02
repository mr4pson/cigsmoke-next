import { Role } from "common/enums/roles.enum"

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    isVerified: boolean;
}
