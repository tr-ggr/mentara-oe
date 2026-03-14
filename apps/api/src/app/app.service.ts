import { Injectable } from '@nestjs/common';
import { AppMessageResponseDto } from './dto/app-message-response.dto.js';

@Injectable()
export class AppService {
  getData(): AppMessageResponseDto {
    return { message: 'Hello API' };
  }
}
