import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { createUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: createUserDto, metadata: ArgumentMetadata) {
    // console.log('pipe called');
    // console.log(value);
    
    const parsedAgeValue = parseInt(value.age.toString());

    if(isNaN(parsedAgeValue)){
      throw new HttpException('please provide numeric value for age.', HttpStatus.BAD_REQUEST);
    }else{
      return {...value,age:parsedAgeValue}
    }
  }
}
