import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS with default settings
  // For specific settings:
  // app.enableCors({
  //   origin: 'http://example.com', // or use ['http://example1.com', 'http://example2.com']
  //   methods: 'GET,PUT,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  // });
  await app.listen(3000);
  // Log the routes
  const server = app.getHttpServer();
  const router = server._events.request._router;

  console.log('Registered Routes:');
  router.stack.forEach((layer) => {
    if (layer.route) {
      const { path, stack } = layer.route;
      const methods = stack
        .map((layer) => layer.method.toUpperCase())
        .filter((method) => method); // Filter out undefined methods
      console.log(`${methods.join(', ')} ${path}`);
    }
  });
}
bootstrap();
