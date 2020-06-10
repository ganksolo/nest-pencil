import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly body: string;

    @IsNotEmpty()
    @IsString()
    readonly tagList: string[];
}