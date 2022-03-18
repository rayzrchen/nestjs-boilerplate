import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class AuthSocialLoginDto {
  // @Allow()
  // @ApiProperty({ type: () => Tokens })
  // tokens: Tokens;

  // @ApiProperty({ enum: AuthProvidersEnum })
  // @IsNotEmpty()
  // socialType: AuthProvidersEnum;

  @Allow()
  @ApiProperty({ required: false })
  firstName?: string;

  @Allow()
  @ApiProperty({ required: false })
  lastName?: string;
}
