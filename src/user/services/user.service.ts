import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {} // Ensure 'User' matches the name used in the module

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with IS ${id} not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ name: username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found.`)
    }
    return user;
  }
}
