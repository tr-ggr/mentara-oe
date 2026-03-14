import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppMessageResponseDto } from './dto/app-message-response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get app message', operationId: 'getAppMessage' })
  @ApiOkResponse({ type: AppMessageResponseDto })
  getData(): AppMessageResponseDto {
    return this.appService.getData();
  }
}
