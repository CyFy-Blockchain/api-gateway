import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'The name of the user.', example: 'John Doe' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'Abcd@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'JohnDoe',
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'Abcd@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    description: 'The Id of the user.',
    example: '123-456-789',
  })
  userId: string;
}
