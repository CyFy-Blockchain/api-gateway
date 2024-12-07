import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CyFy Blockchain API Documentation')
  .setDescription('This documentation is for cyfy blockchain API documentation')
  .setVersion('1.0.0')
  .addServer('http://localhost:3000', 'Local environment')
  .addServer('http://192.168.20.53:3000', 'Dev enviroment')
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' },
    'api-gateway-key',
  )
  .build();
