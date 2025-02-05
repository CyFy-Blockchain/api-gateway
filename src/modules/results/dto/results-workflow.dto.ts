import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

// POST -> result/workflow
class WorkflowPosition {
  @ApiProperty({
    example: 'DEAN',
    description: 'The position within the workflow',
    required: true,
  })
  @IsString()
  position: string;

  @ApiProperty({
    example: ['uploadResult', 'allocate_resources'],
    description: 'The rights associated with this position',
    required: true,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  rights: string[];
}

export class PostResultWorkflowRequest {
  @ApiProperty({
    example: 'CS',
    description: 'The department name',
    required: true,
  })
  department: string;

  @ApiProperty({
    description: 'The list of workflow positions and their associated rights',
    required: true,
    type: [WorkflowPosition],
  })
  setupWorkflowPositions: WorkflowPosition[];
}

// GET -> result/workflow
class Rights {
  @ApiProperty({ example: 'view' })
  rights: string[];
}

class Position {
  @ApiProperty({ example: 'Teacher' })
  position: string;

  @ApiProperty({ type: [Rights] })
  rights: Rights[];
}

export class GetResultWorkflowResponse {
  @ApiProperty({
    example: [
      {
        position: 'Teacher',
        rights: ['view', 'upload'],
      },
      {
        position: 'DEAN',
        rights: ['view', 'approve'],
      },
    ],
    type: [Position],
  })
  CS: Position[];
}

// POST -> result/workflow
export class PostResultWorkflowResponse extends PostResultWorkflowRequest {
  @ApiProperty({ example: 'workflow-12345', required: true })
  workflowId: string;
}
