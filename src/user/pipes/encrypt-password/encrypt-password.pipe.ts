import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EncryptPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const encPassword = await bcrypt.hash(value.password,10);
    return {...value,password:encPassword}
  }
}
