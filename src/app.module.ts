import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tema1 } from './tema1';

@Module({
  imports: [Tema1],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
