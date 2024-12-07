import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { SwaggerAuth } from 'src/utils/decorators/swaggerAuth.decorator';
import { fabricClient } from 'src/apiClients/fabricClient/fabricClient';
import { Request } from 'express';
import {
  GetResultWorkflowResponse,
  PostResultWorkflowRequest,
} from '../dto/results-workflow.dto';

@ApiTags(SWAGGER_TAGS.RESULTS)
@Controller()
export class ResultsController {
  @Get('/workflow')
  @ApiOperation({ summary: 'Fetch all results in the contract' })
  @ApiResponse({
    status: 201,
    description: 'Fetch the results from the contract',
    type: GetResultWorkflowResponse,
  })
  @SwaggerAuth()
  async fetchResultWorkflow(
    @Req() request: Request,
  ): Promise<GetResultWorkflowResponse> {
    const fabricToken = request.headers['fabricToken'] as string;
    return await fabricClient.fetchResultWorkflow(fabricToken);
  }

  @Post('/workflow')
  @ApiOperation({ summary: 'Post a new Result workflow' })
  @ApiResponse({
    status: 201,
    description: 'Save the result workflow in the contract',
    type: GetResultWorkflowResponse,
  })
  @SwaggerAuth()
  async saveResultWorkflow(
    @Body() body: PostResultWorkflowRequest,
    @Req() request: Request,
  ): Promise<GetResultWorkflowResponse> {
    const fabricToken = request.headers['fabricToken'] as string;
    return await fabricClient.postResultWorkflow(fabricToken, body);
  }
}
