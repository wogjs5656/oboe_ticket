import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user/types/userRole.type";

// 커스텀 데코레이터 roles
// Roles 데코레이터가 여러 역할을 매개변수로 받음
export const Roles = (...roles: Role[]) => SetMetadata('roles',roles);