import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TodoDTO } from 'src/todos/dto/todo.dto';
import { HttpStatus } from '@nestjs/common';

const app = 'http://localhost:3000';

describe('ROOT', () => {
  it('should ping', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('CREATE FAILED', () => {
    it('create todo', () => {
      const todo: TodoDTO = {
        title: "test",
        content: "testing",
        due_date: new Date('2019-05-10 23:00:00')
      };
      const now: string = new Date().toLocaleString('ko-KR', {
        year:  'numeric',
        month: 'numeric',
        day:   '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'});

        console.log(todo.due_date.toLocaleString());
        console.log(now);

      return request(app)
      .post('/todos')
      .set('Accept', 'application/json')
      .send(todo)
      .expect(({ body }) => {
        console.log(body);
      })
      .expect(HttpStatus.BAD_REQUEST);
    })
  })
});
