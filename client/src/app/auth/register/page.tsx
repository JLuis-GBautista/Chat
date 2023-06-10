'use client';

import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import '../auth.scss';
import { useRouter } from 'next/navigation';
import { DataLogin } from '@/interfaces/EstructureData';
import { UserContext } from '@/context/UserContext';
import { ValidateContext } from '@/context/ValidateContext';
import { LogicContext } from '@/context/LogicContext';

export default function Register() {
    const [form, setForm] = useState<DataLogin>({
        correo: '',
        clave_acceso: '',
    });
    const userContext = useContext(UserContext);
    const validateContext = useContext(ValidateContext);
    const logicContext = useContext(LogicContext);
    const navigateTo = useRouter();

    useEffect(() => {
        const loadSession = async () => {
            if(logicContext?.logueado === true) {
                navigateTo.push("/");
            }
        }
        loadSession();
        return () => {
            const defaultRes = {
                nombre: true,
                fecha_nacimiento: true,
                correo: true,
                clave_acceso: true
            }
            userContext?.setErrorSessionUser(null);
            userContext?.setErrorsInDataUser(null);
            validateContext?.setValidateFields(defaultRes);
        }
    },[]);

    const onChangeDataForm = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    }

    const onSubmitToMain = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginSuccess = await userContext?.register(form);
        if(loginSuccess === true) {
            logicContext?.setLogueado(true);
            navigateTo.push("/");
        }
        console.log(userContext?.errorsInDataUser);
    }
  return (
    <div className='content_form register'>
        <div className="encabezado">
            <h1 className='name_form'>Registrate</h1>
            {userContext?.errorsInDataUser !== null && <ul className='errores'>
                {userContext?.errorsInDataUser.map((err: string, index: number) => {
                    return <li key={index}>{err}</li>
                })}
            </ul>}
            {userContext?.errorSessionUser !== null && <ul className='errores'>
                <li>{userContext?.errorSessionUser}</li>
            </ul>}
        </div>
        <form className='form_area' onSubmit={onSubmitToMain}>
            <div className='form_item'>
                <label className='item_label' htmlFor="nombre">Nombre: </label>
                <input name='nombre' onFocus={ e => {
                    validateContext?.focusFields(e.target.name);
                }} onBlur={ e => {
                    validateContext?.validate(e.target.name, e.target.value);
                }} onChange={onChangeDataForm} className='item_input' type="text" id='nombre'/>
                {!validateContext?.validateFields.nombre && <small className='item_error'>El valor ingresado no es un nombre valido.</small>}
            </div>
            <div className='form_item'>
                <label className='item_label' htmlFor="fechaNacimiento">Fecha de nacimiento: </label>
                <input name='fecha_nacimiento' onFocus={ e => {
                    validateContext?.focusFields(e.target.name);
                }} onBlur={ e => {
                    validateContext?.validate(e.target.name, e.target.value);
                }} onChange={onChangeDataForm} className='item_input' type="date" id='fechaNacimiento'/>
                {!validateContext?.validateFields.fecha_nacimiento && <small className='item_error'>El valor no es una fecha.</small>}
            </div>
            <div className='form_item'>
                <label className='item_label' htmlFor="correo">Correo: </label>
                <input name='correo' onFocus={ e => {
                    validateContext?.focusFields(e.target.name);
                }} onBlur={ e => {
                    validateContext?.validate(e.target.name, e.target.value);
                }} onChange={onChangeDataForm} className='item_input' type="text" id='correo'/>
                {!validateContext?.validateFields.correo && <small className='item_error'>El valor ingresado no es un correo.</small>}
            </div>
            <div className='form_item'>
                <label className='item_label' htmlFor="contraseña">Contraseña: </label>
                <input name='clave_acceso' onFocus={ e => {
                    validateContext?.focusFields(e.target.name);
                }} onBlur={ e => {
                    validateContext?.validate(e.target.name, e.target.value);
                }} onChange={onChangeDataForm} className='item_input' type="password" id='contraseña'/>
                {!validateContext?.validateFields.clave_acceso && <small className='item_error'>La contraseña debe tener almenos 8 digitos.</small>}
            </div>
            <div className='form_opt'>
                <input id='btn_submit' type="submit" value="Entrar" />
            </div>
        </form>
        <p>¿Ya tienes una cuenta? <Link href="/auth/login">¡Inicia sesión aquí!</Link></p>
    </div>
  )
}
