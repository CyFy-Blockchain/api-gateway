import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { OrgDto } from './org.dto';
import { Type } from 'class-transformer';

export enum UserRole {
  Admin = 'admin',
  Client = 'client',
}
export class UserDto {
  @ApiProperty({
    example: 'admin',
    description: 'The username of the user',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: UserRole.Client,
    enum: UserRole,
    default: UserRole.Client,
  })
  @IsEnum(UserRole)
  userRole?: UserRole;

  @ApiProperty({
    description: 'The organization associated with the user',
    required: true,
    type: () => OrgDto,
  })
  @ValidateNested()
  @Type(() => OrgDto)
  organization: OrgDto;

  @ApiProperty({
    example: '1a973561-939d-4ae9-aad9-de1b80ce69f9',
    description: 'The unique identifier for the user',
    required: true,
  })
  @IsUUID()
  id: string;
}
