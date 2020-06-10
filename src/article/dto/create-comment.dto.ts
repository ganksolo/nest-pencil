import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    readonly body: string;
}