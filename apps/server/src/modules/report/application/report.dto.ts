import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReportCreateDto {
  @IsString()
  @IsOptional()
  reporterId?: string

  @IsString()
  @IsOptional()
  reportedUserId?: string

  @IsString()
  @IsOptional()
  reason?: string

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

export class ReportUpdateDto {
  @IsString()
  @IsOptional()
  reporterId?: string

  @IsString()
  @IsOptional()
  reportedUserId?: string

  @IsString()
  @IsOptional()
  reason?: string

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
