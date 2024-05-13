import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor( @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private number_of_calls = 0;
  
  async getHello1(){
    await this.cacheManager.set('cached_item', { key: 32 }, 10);
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem === undefined ? 'Cache miss' : 'Cache hit');
    console.log('Number of calls:', this.number_of_calls++);
    await this.cacheManager.del('cached_item');
    await this.cacheManager.reset();
    
    return 'Hello World!';
  }
}
