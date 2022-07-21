import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  await app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(configService.get('appPrefix'));

  const options = new DocumentBuilder()
    .setTitle('ShipmentPay - API Documentation')
    .setDescription('The documentation')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    configService.get('swaggerEndpoint'),
    app,
    document,
  );

  await app.listen(configService.get('port'));

}
bootstrap();
