import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { LoginResponse } from '../dto/auth.dto';
import { generateUuidV4 } from '../libs/auth.uuid.utils';
import {
  fifteenDaysToMilliseconds,
  oneDayToMilliseconds,
} from '../libs/auth.redis.util';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async loginEntry(data: LoginResponse): Promise<boolean> {
    try {
      const accessKey = generateUuidV4();
      const refreshKey = generateUuidV4();
      await this.cacheManager.set(
        accessKey,
        data.userId,
        oneDayToMilliseconds(),
      );
      await this.cacheManager.set(
        refreshKey,
        data.userId,
        fifteenDaysToMilliseconds(),
      );
      return true;
    } catch (error) {
      console.error('🚀 ~ AuthService ~ loginEntry ~ error:', error);
      throw error;
    }
  }
}
