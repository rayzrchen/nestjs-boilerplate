import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class AuthStaffLoginDto {
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'Invalid staff id',
  })
  staffId: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
