import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    private buildUserRO(user: UserEntity) {
        const userRO = {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image
        }
        return { user: userRO }
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);
        console.log(user)
        return this.buildUserRO(user)
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ email })
    }

    async create(dto: CreateUserDto): Promise<UserRO> {

        const { username, password, email } = dto;
        
        let newUser = new UserEntity()
        newUser.username = username;
        newUser.password = password;
        newUser.email = email;

        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser);
    }
}
