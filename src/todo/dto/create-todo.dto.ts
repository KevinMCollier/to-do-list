import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateDailyTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsBoolean()
  excludeWeekends: boolean;
}
