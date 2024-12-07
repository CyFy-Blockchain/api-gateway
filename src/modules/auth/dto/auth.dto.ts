import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserDto, UserRole } from './user.dto';

// POST -> Sign in user
export class SigninUserResponse {
  @ApiProperty({
    example: 'bc649a94-0300-4136-aa4a-0fc51f581ab4',
    required: true,
  })
  token: string;

  @ApiProperty({
    example: '2d620505-e413-4d18-8877-b9fa3c484905',
    required: true,
  })
  refreshToken: string;

  @ApiProperty({ example: 'HOD', required: true })
  @IsNotEmpty()
  position: string;
}

export class SigninUserRequest {
  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'adminpw', required: true })
  @IsNotEmpty()
  password: string;
}

// GET -> Fetch User List in Org
export class GetOrgUsersListResponse {
  @ApiProperty({
    description: 'Array of users',
    type: [UserDto],
  })
  users: UserDto[];

  @ApiProperty({
    description: 'Total count of users',
    example: 10,
  })
  count: number;
}

// POST -> Register User
export class RegisterUserRequest {
  @ApiProperty({ example: 'testUser', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: UserRole.Client,
    enum: UserRole,
    default: UserRole.Client,
  })
  @IsEnum(UserRole)
  userRole: UserRole;

  @ApiProperty({
    example: 'HOD,Teacher,CS',
    description:
      'This defines the attributes the user can forward to any certificate it creates. This is only used if passed with userRole: admin. Clients can not create users',
  })
  @IsOptional()
  attr?: string;

  @ApiProperty({ example: 'Computer Science', required: true })
  @IsNotEmpty()
  deptName: string;

  @ApiProperty({ example: 'HOD', required: true })
  @IsNotEmpty()
  position: string;
}

export class RegisterUserResponse {
  @ApiProperty({ example: 'pswrd', required: true })
  secret: string;
}
