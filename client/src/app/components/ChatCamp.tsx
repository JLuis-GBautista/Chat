'use client';

import React, { useContext, useEffect, useState } from 'react';
import { FaCog, FaArrowAltCircleRight } from 'react-icons/fa';
import './ChatCamp.scss';
import { ChatContext } from '@/context/ChatContext';
import { io } from 'socket.io-client';
import { UserContext } from '@/context/UserContext';

export default function ChatCamp() {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const [mensaje, setMensaje] = useState('');
  const socket = io('ws://localhost:5000');
  if (chatContext?.chatSelected === null)
    return (<div id='Cuerpo Chat'>
      <h2>Selecciona un chat</h2>
    </div>)
  else return (
    <div id="cuerpo_chat">
      <header id='data_userChat' style={{backgroundColor: chatContext?.chatSelected.color_chat}}>        
          <h3>{chatContext?.chatSelected.usuarios[0].nombre}</h3>
          <div className={`content_img${chatContext?.chatSelected.usuarios[0].conectado === true ? ' connect' : ''}`}>
            <img src={chatContext?.chatSelected.usuarios[0].foto && 'data:image/png;base64,'+Buffer.from(chatContext?.chatSelected.usuarios[0].foto).toString('base64')} alt="Foto de perfil" />
          </div>
          <button><FaCog id='icon_chat'/></button>
      </header>
      <section id='area_chat'>
        {
          chatContext?.chatSelected.mensajes.length === 0 ?
          <article className='izquierda cuerpo_msg'>
            <h2>Inicia una conversación</h2>
          </article> :
          chatContext?.chatSelected.mensajes.map((msg: any) => {
            return (
              <article key={msg.id} className={`${msg.usuario.id === userContext?.dataSessionUser.id ? 'derecha ' : 'izquierda '}cuerpo_msg`}>
                <div className='msg' style={{ backgroundColor: `${msg.usuario.id === userContext?.dataSessionUser.id ? chatContext?.chatSelected.color_chat : '#888'}`}}>
                  <p>{msg.mensaje}</p>
                  <small className='date_msg'>{msg.fecha_creado.substring(0,10)} {msg.fecha_creado.substring(11,19)}</small>
                </div>
              </article>
            )
          })
        }
      </section>
      <footer id='write_msg' style={{backgroundColor: chatContext?.chatSelected.color_chat}}>
        <div id='div_msg'>
          <textarea onChange={(e) => {
            setMensaje(e.target.value);
          }} placeholder='Escribe...' id='inp_msg' value={mensaje}></textarea>
          {mensaje !== '' && <button onClick={() => {
            const obj = {
              room: chatContext?.chatSelected.salaId,
              mensaje,
              idChat: chatContext?.chatSelected.id,
              idUser: userContext?.dataSessionUser.id,

            }
            socket.emit("mensajeChat", obj);
            setMensaje('');
          }} id='enviar_msg'><FaArrowAltCircleRight id='icon_msg'/></button>}
        </div>
      </footer>
    </div>
  )
}
