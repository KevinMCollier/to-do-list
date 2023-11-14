import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { DailyTodoSchema } from './models/daily-todo.model';
import { WeeklyTodoSchema } from './models/weekly-todo.model';
import { SpotTodoSchema } from './models/spot-todo.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/to_do_list'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'DailyTodo', schema: DailyTodoSchema }]),
    MongooseModule.forFeature([{ name: 'WeeklyTodo', schema: WeeklyTodoSchema }]),
    MongooseModule.forFeature([{ name: 'SpotTodo', schema: SpotTodoSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
