import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsObject } from 'class-validator';

export class UserResponse {
  @ApiProperty({
    description: 'Status of the response',
    example: 200,
  }
  )
  @IsNumber()
  status: number;

  @ApiProperty({
    description: 'Message of the response',
    example: 'User Found',
  }
  )
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Data of the response',
    example: {
      id: 1,
      name: 'John Doe',
      email: 'jhon@test.com',
      age: 21,
    },
  }
  )
  @IsObject()
  data: {
    id: number;
    name: string;
    email: string;
    age: number;
  };
}
