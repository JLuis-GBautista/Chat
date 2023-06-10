"use client"

import { propsValidateContext } from '@/interfaces/PropsContexts';
import { createContext, useState } from 'react';

export const ValidateContext = createContext<propsValidateContext | null>(null);

export default function ValidateProvider({ children }: { children: React.ReactNode }) {
  const defaultRes = {
    nombre: true,
    fecha_nacimiento: true,
    correo: true,
    clave_acceso: true
  }
  const [validateFields, setValidateFields] = useState(defaultRes);
  const campos = {
    nombre: /^[a-zA-zÀ-ÿñÑ]{2}[a-zA-zÀ-ÿñÑ ]+[a-zA-zÀ-ÿñÑ]$/g,
    fecha_nacimiento: /^[0-9]{4}[-][0-1][0-9][-][0-3][0-9]$/g,
    correo: /^[a-zA-zÀ-ÿñÑ][a-zA-zÀ-ÿ0-9ñÑ._-]+@[a-zA-zñÑ]+\.[a-zA-zñÑ]{1,3}$/g,
    clave_acceso: /^.{7}.+$/g
  }
  const validate = (type: string, value: string) => {
    let res;
    if (type==="nombre"){
      res=campos.nombre.test(value);
    } else if (type==="correo"){
      res=campos.correo.test(value);
    } else if (type==="clave_acceso"){
      res=campos.clave_acceso.test(value);
    } else if (type==="fecha_nacimiento"){
      res=campos.fecha_nacimiento.test(value);
    }
    setValidateFields({
      ...validateFields,
      [type]: res
    });
  }
  const focusFields = (type: string) => {
    setValidateFields({
      ...validateFields,
      [type]: true
    });
  }
  const valor: propsValidateContext = {
    validateFields,
    setValidateFields,
    validate,
    focusFields
  }
  return <ValidateContext.Provider value={valor}>{children}</ValidateContext.Provider>
}