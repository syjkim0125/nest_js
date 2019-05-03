import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '104.198.118.66',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'test',
    entities: [join(__dirname, './todos/entity/*.ts')],
    synchronize: true,
  })],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
