import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRO, UserData } from './user.interface';

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

    async findAll(query): Promise<UserEntity[] | UserRO> {
        let user, result;
        if(query) {
            if ('email' in query) {
                user = await this.userRepository.findOne({ email: query.email });
            }
            if ('username' in query) {
                user = await this.userRepository.findOne({ username: query.username });
            }
            result = this.buildUserRO(user);
        } else {
            result = await this.userRepository.find()
        }
        return result;
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);

        if(!user) {
            throw new HttpException({message: '用户不存在'}, HttpStatus.NOT_FOUND)
        }

        return this.buildUserRO(user)
    }

    async findByEmail(email: string): Promise<UserData> {
        return await this.userRepository.findOne({email})
    }

    async findByUsername(username: string): Promise<UserData> {
        return await this.userRepository.findOne({ username })
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ email })
    }

    async update(id: string, userData: UpdateUserDto): Promise<UserRO> {
        const toUpdate = await this.userRepository.findOne(id);
        const updated = Object.assign(toUpdate, userData);
        const user = await this.userRepository.save(updated);
        return this.buildUserRO(user)
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
