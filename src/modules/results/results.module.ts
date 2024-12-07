import { Module } from '@nestjs/common';
import { ResultsController } from './controller/results.controller';

@Module({
  controllers: [ResultsController],
})
export class ResultsModule {}
