'use client';

import { PropsChat } from '@/interfaces/EstructureData';
import React, { useContext } from 'react';
import './UserChat.scss';
import { ChatContext } from '@/context/ChatContext';
import { UserContext } from '@/context/UserContext';

export default function UserChat(props: PropsChat) {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  return (
    <article className={`chat${props.valueSelect === `chat${props.id}` ? ' select_chat' : ''}`}>
      <button className='click_chat' onClick={async ()=>{
          props.activeChat(`chat${props.id}`);
          const token: any = userContext?.accessToken;
          const selected = await chatContext?.getOneChat(token, props.id);
          if(selected !== false)
            props.onSala(selected.salaId);
      }}>
        <div className='content_img'>
          <img className='user_img' src={props.foto && 'data:image/png;base64,'+ props.foto} alt="" />
        </div>
        <div className='user_info'>
          <h3 className='username'>{props.nombre}</h3>
          <p className='last_msg'>Ultimo mensaje <span className='no_msg'># mensajes</span></p>
        </div>
      </button>
      <small className='date_msg'>fecha de ultimo mensaje</small>
    </article>
  )
}
