import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './share/http-error.filter';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot()],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService, {provide: APP_FILTER, useClass: HttpErrorFilter}],
})
export class AppModule {}
