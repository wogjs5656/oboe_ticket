import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API Docs')
    .setVersion('1.0.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('apis', app, document);
}