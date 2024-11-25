import { HttpException } from '@nestjs/common';
import axios from 'axios';

export function getHeaderAuthToken(token: string) {
  return {
    headers: {
      token: token,
    },
  };
}

export function translateAxiosError(err: any) {
  if (axios.isAxiosError(err) && err.response) {
    // Extract the error message from the server's response
    const errorMessage = err.response.data?.message || 'Unknown error occurred';
    throw new HttpException(errorMessage, err.response.status);
  } else {
    // Handle non-Axios errors or unexpected cases
    throw new HttpException(err.message, 500);
  }
}
