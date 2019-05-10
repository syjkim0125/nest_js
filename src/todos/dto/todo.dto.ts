import { IsString, IsDate } from 'class-validator';

export class TodoDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDate()
  due_date: Date;
}
