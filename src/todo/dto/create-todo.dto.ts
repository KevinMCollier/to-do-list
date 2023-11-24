import { IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsEnum(['Never', 'Daily - Weekdays', 'Daily - Weekends', 'Daily', 'Weekly'])
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';

  @IsOptional()
  @IsEnum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

  @IsNotEmpty()
  @IsMongoId()
  user: string;
}
