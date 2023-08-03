import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  ValidationArguments,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export default class CreateUserDTO {
  @ApiProperty()
  @Length(2, 20, {
    message: (arg: ValidationArguments) => {
      if (!arg.value) return 'El nombre es un valor requerido.';
      else if (arg.value.length <= 1)
        return 'El valor "$value" debe contener al menos 2 caracteres.';
      else return 'El valor "$value" debe contener por lo mucho 20 caracteres';
    },
  })
  nombre: string;

  @ApiProperty()
  @Length(10, 10, {
    message: (arg: ValidationArguments) => {
      if (!arg.value) return 'La fecha de nacimiento es un valor requerido.';
      else return 'El valor "$value" debe contener 10 caracteres';
    },
  })
  fecha_nacimiento: string;

  @ApiProperty()
  @IsEmail(undefined, {
    message: 'El valor "$value" debe ser un correo electronico',
  })
  correo: string;
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 2,
    },
    {
      message:
        'La Contraseña debe contener 1 letra Mayuscula, 2 letras Minusculas, 1 Simbolo, 1 Numero, y debe contener 8 caracteres',
    },
  )
  clave_acceso: string;
}
