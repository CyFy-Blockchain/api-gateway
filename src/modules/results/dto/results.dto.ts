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

// GET -> result
export class GetResultResponse {
  @ApiProperty({
    example: '245afd7f-6937-4b41-84d1-5f5dd344a6ec',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({ example: 'CS', required: true })
  @IsString()
  department: string;

  @ApiProperty({ example: 'A+', required: true })
  @IsString()
  grade: string;

  @ApiProperty({ example: 'Hassan Tariq', required: true })
  @IsString()
  studentName: string;

  @ApiProperty({ example: [], required: true })
  acknowledgedBy: string[];

  @ApiProperty({ example: [], required: true })
  approvedBy: string[];
}

// PUT -> result/:result_id
export class ManageResultRequest {
  @ApiProperty({ example: 'acknowledge', required: false })
  @IsString()
  action: string;
}
