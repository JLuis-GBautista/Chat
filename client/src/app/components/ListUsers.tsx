'use client';
import React, { ChangeEvent, createRef, useContext, useEffect, useState } from 'react';

import './ListUsers.scss';
import { ChatContext } from '@/context/ChatContext';
import { UserContext } from '@/context/UserContext';
import UserChat from './UserChat';
import { io } from 'socket.io-client';

export default function ListUsers() {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);

  const sName = createRef<HTMLInputElement>();

  const [allLoadChats, setAllLoadChats] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');

  const handleComponentClick = (componentId: string) => {
    setActiveComponent(componentId);
  };
  const socket = io('ws://localhost:5000');
  const iniciarSala = (salaId: string) => {
    console.log(salaId);
    socket.emit("joinRoom", salaId);
  }
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected)
      console.log('Conectado al servidor Socket.IO');
      socket.emit('usuarioConectado', userContext?.dataSessionUser.id);
    });
    socket.on('disconnect', () => {
      console.log(socket.connected)
    });
/*     socket.on('remplaceChat', (msg) => {
      const obj = JSON.parse(msg);
      chatContext?.setChatSelected(obj);
    }); */
    return () => {
      socket.emit("desconectar", userContext?.firstData.id);
      socket.disconnect();
    };
  },[]);
  useEffect(() => {
    const getChatsUserFunc = async () => {
      const token: any = userContext?.accessToken;
      const chatsLoad = await chatContext?.getChatsUser(token);
      if (chatsLoad === true) {
        setAllLoadChats(true);
      }
    }
    getChatsUserFunc();
  },[]);

  const SearchForName = async (e: ChangeEvent<HTMLInputElement>) => {
    const token: any = userContext?.accessToken;
    const valueInp = e.target.value;
    await chatContext?.getChatsUserWithSearch(valueInp, token);
  }
  return (
    <div id='section_chat'>
      <h2 id='nombre_chat'>Mis Chats</h2>
      <p id='search'><span id='search_txt'>Buscar chat:</span> <input id='search_inp' ref={sName} type="text" placeholder="Busca al usuario por su nombre"  onChange={SearchForName}/></p>
      <section id='section_area'>
      {
        allLoadChats === true ?
        <>
        { chatContext?.chatsUser.map((chat: any) => (
          <UserChat key={chat.id} id={chat.id} nombre={chat.nombre} foto={chat.foto} onSala={iniciarSala} activeChat={handleComponentClick} valueSelect={activeComponent}/>
        ))
        }
        </> : <article className='chat'><h2>No se encontraron chats</h2></article>
      }
      </section>
    </div>
  )
}
