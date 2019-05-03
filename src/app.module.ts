import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [TodosModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
