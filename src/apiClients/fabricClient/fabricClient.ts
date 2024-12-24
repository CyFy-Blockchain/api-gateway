import axios, { AxiosInstance } from 'axios';
import { envVar } from 'src/config/env/default';
import { getHeaderAuthToken, translateAxiosError } from '../helper';
import { PostResultWorkflowRequest } from 'src/modules/results/dto/results-workflow.dto';
import {
  ManageResultRequest,
  UploadResultRequest,
} from 'src/modules/results/dto/results.dto';

const { fabric } = envVar;

class FabricClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: fabric.gatewayBaseUrl,
      timeout: 10 * 1000, // 5 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async fetchResultWorkflow(token: string) {
    try {
      const response = await this.axiosInstance.get(
        `/api/v1/results/workflow`,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async postResultWorkflow(token: string, body: PostResultWorkflowRequest) {
    try {
      const response = await this.axiosInstance.post(
        `/api/v1/results/workflow`,
        body,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async fetchResult(token: string, deptName: string) {
    try {
      const response = await this.axiosInstance.get(
        `/api/v1/results/${deptName}`,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async uploadResult(token: string, body: UploadResultRequest) {
    try {
      const response = await this.axiosInstance.post(
        `/api/v1/results`,
        body,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async manageResult(
    token: string,
    body: ManageResultRequest,
    resultId: string,
  ) {
    try {
      const response = await this.axiosInstance.put(
        `/api/v1/results/${resultId}`,
        body,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }
}

export const fabricClient = new FabricClient();
