import { ApiProperty } from '@nestjs/swagger';

export class AppMessageResponseDto {
  @ApiProperty({ example: 'Hello API' })
  message!: string;
}
