import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// POST -> result/
export class UploadResultRequest {
  @ApiProperty({ example: 'CS', required: true })
  @IsString()
  department: string;

  @ApiProperty({ example: 'A', required: true })
  @IsString()
  grade: string;

  @ApiProperty({ example: 'John Smith', required: true })
  @IsString()
  studentName: string;
}

export class UploadResultResponse extends UploadResultRequest {
  @ApiProperty({
    example: '1a973561-939d-4ae9-aad9-de1b80ce69f9',
    required: true,
  })
  @IsString()
  id: string;
}
