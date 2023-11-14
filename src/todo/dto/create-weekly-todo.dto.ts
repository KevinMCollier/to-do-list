import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateWeeklyTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  dayOfWeek: string;
}
