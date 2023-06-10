'use client';

import React, {useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCommentDots, FaCog, FaEdit } from 'react-icons/fa';

import './Barra_Nav.scss';
import { UserContext } from '@/context/UserContext';
import { LogicContext } from '@/context/LogicContext';
import { useRouter } from 'next/navigation';

export default function Barra_Nav(): JSX.Element {
    const navigateTo = useRouter();
    const userContext = useContext(UserContext);
    const logicContext = useContext(LogicContext);

    useEffect(() => {
        console.log(userContext?.dataSessionUser)
    },[logicContext?.loadingSocket]);

    const [classDisplayCU, setClassDisplayCU] = useState('');
    const [colorCU, setColorCU] = useState('');
    const [classDisplayU, setClassDisplayU] = useState('');
    const [colorU, setColorU] = useState('');
    const [classDisplayN, setClassDisplayN] = useState('');
    const [colorN, setColorN] = useState('');

    const [changeName, setChangeName] = useState(false);
    const [valueName, setValueName] = useState<any>(null);
    const [valueImg, setValueImg] = useState<undefined | File>(undefined);

    const onChangeDisplayCU = () => {
        if(classDisplayN === ' show') {
            setClassDisplayN('');
            setColorN('');
        }
        if(classDisplayCU === '') {
            setClassDisplayCU(' show');
            setColorCU(' selected');
        }
        else {
            setClassDisplayCU('');
            setColorCU('');
        }
    }
    const onChangeDisplayN = () => {
        if(classDisplayCU === ' show') {
            setClassDisplayCU('');
            setColorCU('');
        }
        if(classDisplayN === '') {
            setClassDisplayN(' show');
            setColorN(' selected');
        }
        else {
            setClassDisplayN('');
            setColorN('');
        }
    }
    const onChangeDisplayU = () => {
        if(classDisplayU === 'info_user_active') {
            setClassDisplayU('');
            setColorU('');
        }
        else {
            setClassDisplayU('info_user_active');
            setColorU('select_title');
        }
    }
    const closeSession = async() => {
        logicContext?.setLoading(true);
        const close = await userContext?.logout();
        if(close === true) {
            logicContext?.setLogueado(false);
            clearTimeout(userContext?.refreshTimeoutValue);
            navigateTo.push('/auth/login');
        }
        else logicContext?.setLoading(false);
    }
    return (
        <header id='barra_nav'>
            <h1 id='super_titulo'><a className={colorU} onClick={onChangeDisplayU}>Chat de {userContext?.dataSessionUser.nombre}</a></h1>
            <section id='info_user' className={classDisplayU}>
                <div id='info_base'>
                    <div id='content_img'>
                        <img src={userContext?.dataSessionUser.foto && 'data:image/png;base64,'+Buffer.from(userContext?.dataSessionUser.foto).toString('base64')} alt="Foto de perfil" />
                    </div>
                    <div id='modificar_img'>
                        <input type="file" name="foto" id="change_img" onChange={(e) => {
                            console.log(e.target.value);
                            const infoImg: any = e.target.files;
                            setValueImg(infoImg[0]);
                        }}/>
                        <button id='edit_img' onClick={async () => {
                            if(valueImg) {
                                await userContext?.editImg({ foto: valueImg });
                            }
                        }}>Cambiar Imagen</button>
                    </div>
                    <h2>{ changeName === false ?
                        <>                        
                        <span>Nombre:</span> {userContext?.dataSessionUser.nombre} <button className='edit_field' onClick={() => {
                            setValueName(userContext?.dataSessionUser.nombre);
                            setChangeName(true);
                        }}><FaEdit className='edit_icon'/></button>
                        </> :
                        <>                        
                        <label htmlFor="tag_name">Nombre: </label>
                        <input type="text" id='tag_name' onChange={(e) => {
                            setValueName(e.target.value);
                        }} value={valueName}/>
                        <button onClick={async () => {
                            const editUser = await userContext?.editUser({ nombre: valueName});
                            if(editUser === true) {
                                setValueName(null);
                                setChangeName(false);
                            }
                        }}><FaEdit className='edit_icon'/></button>
                        </>
                        }
                    </h2>
                </div>
                <div id='info_complemento'>
                    <p><span>Fecha de Nacimiento:</span> {userContext?.dataSessionUser.fecha_nacimiento}</p>
                    <p><span>Edad:</span> {userContext?.dataSessionUser._edad}</p>
                    <p><span>Correo:</span> {userContext?.dataSessionUser.correo}</p>
                </div>
            </section>
            <nav id='nav_principal'>
                <li className='opt_div'>
                    <p onClick={onChangeDisplayN}><FaCommentDots className={`icon_list${colorN}`}/> +# </p>
                    <ul className={`list_opt${classDisplayN}`}>
                        <li>
                            <p>Mi Notificacion</p>
                            <small>Descripcion de mi notificacion</small>
                        </li>
                        <li>
                            <p>Mi Notificacion</p>
                            <small>Descripcion de mi notificacion</small>
                        </li>
                        <li>
                            <p>Mi Notificacion</p>
                            <small>Descripcion de mi notificacion</small>
                        </li>
                    </ul>
                </li>
                <li className='opt_div'>
                    <FaCog className={`icon_list${colorCU}`} onClick={onChangeDisplayCU}/>
                    <ul className={`list_opt${classDisplayCU}`}>
                        <li><Link href="/auth/register" className='opt_link'>Eliminar usuario</Link></li>
                        <li><Link href="/auth/login" className='opt_link' onClick={closeSession}>Cerrar sesión</Link></li>
                    </ul>
                </li>
            </nav>
        </header>
    )
}
