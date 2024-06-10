import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class MessageCreateDto {
  @IsString()
  @IsOptional()
  senderId?: string

  @IsString()
  @IsOptional()
  receiverId?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class MessageUpdateDto {
  @IsString()
  @IsOptional()
  senderId?: string

  @IsString()
  @IsOptional()
  receiverId?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
