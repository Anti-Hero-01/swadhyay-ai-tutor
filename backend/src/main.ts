import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // Allow any localhost origin during development (reflects request origin)
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
}
void bootstrap();
