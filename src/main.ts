import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
    With the whitelist option set to true, ValidationPipe will automatically remove all 
    non-whitelisted properties, where non-whitelisted means properties without any 
    validation decorators or not present in the DTO.
  */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ---swagger---
  const config = new DocumentBuilder()
    .setTitle('Budgetting App - Personal Finance')
    .setDescription('Budgetting Application to manage your Personal Finance')
    .setVersion('1.0')
    .addTag('budgetting-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ---swagger---end

  app.enableCors();

  await app.listen(4000);
}
bootstrap();
