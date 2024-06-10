import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReviewCreateDto {
  @IsString()
  @IsOptional()
  reviewerId?: string

  @IsString()
  @IsOptional()
  reviewedUserId?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsString()
  @IsOptional()
  comment?: string

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

export class ReviewUpdateDto {
  @IsString()
  @IsOptional()
  reviewerId?: string

  @IsString()
  @IsOptional()
  reviewedUserId?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsString()
  @IsOptional()
  comment?: string

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
