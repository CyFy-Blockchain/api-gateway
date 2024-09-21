import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { LoginResponse } from '../dto/auth.dto';
import { generateUuidV4 } from '../libs/auth.uuid.utils';
import { daysToMilliseconds } from '../libs/auth.redis.util';

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
        daysToMilliseconds(1),
      );
      await this.cacheManager.set(
        refreshKey,
        data.userId,
        daysToMilliseconds(15),
      );
      return true;
    } catch (error) {
      console.error('🚀 ~ AuthService ~ loginEntry ~ error:', error);
      throw error;
    }
  }
}
