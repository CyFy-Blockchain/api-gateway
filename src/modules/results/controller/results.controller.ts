import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { SwaggerAuth } from 'src/utils/decorators/swaggerAuth.decorator';
import { fabricClient } from 'src/apiClients/fabricClient/fabricClient';
import { Request } from 'express';
import {
  GetResultResponse,
  ManageResultRequest,
  UploadResultRequest,
  UploadResultResponse,
} from '../dto/results.dto';

@ApiTags(SWAGGER_TAGS.RESULTS)
@Controller()
export class ResultsController {
  @Get('/:deptName')
  @ApiOperation({ summary: 'Fetch result by department' })
  @ApiResponse({
    status: 200,
    description: 'Fetch the results in a department',
    type: GetResultResponse,
  })
  @SwaggerAuth()
  async fetchResultsByDept(
    @Param('deptName') deptName: string,
    @Req() request: Request,
  ): Promise<GetResultResponse> {
    const fabricToken = request.headers['fabricToken'] as string;
    return await fabricClient.fetchResult(fabricToken, deptName);
  }

  @Post('/')
  @ApiOperation({ summary: 'Upload a new result' })
  @ApiResponse({
    status: 200,
    description: 'Upload a new result in a department',
    type: UploadResultResponse,
  })
  @SwaggerAuth()
  async uploadResultToDept(
    @Body() body: UploadResultRequest,
    @Req() request: Request,
  ): Promise<UploadResultResponse> {
    const fabricToken = request.headers['fabricToken'] as string;
    return await fabricClient.uploadResult(fabricToken, body);
  }

  @Put('/manage/:result_id')
  @ApiOperation({ summary: 'Manage a result' })
  @ApiResponse({
    status: 200,
    description: 'Manage the result with the given ID',
  })
  @SwaggerAuth()
  async manageResult(
    @Param('result_id') result_id: string,
    @Body() body: ManageResultRequest,
    @Req() request: Request,
  ) {
    const fabricToken = request.headers['fabricToken'] as string;
    return await fabricClient.manageResult(fabricToken, body, result_id);
  }
}
