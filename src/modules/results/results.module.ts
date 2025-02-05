import { Module } from '@nestjs/common';
import { ResultsController } from './controller/results.controller';
import { ResultsWorkflowController } from './controller/results-workflow.controller';

@Module({
  controllers: [ResultsController, ResultsWorkflowController],
})
export class ResultsModule {}
