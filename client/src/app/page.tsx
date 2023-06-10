"use client"

import Barra_Nav from './components/Barra_Nav';
import ListUsers from './components/ListUsers';
import ChatCamp from './components/ChatCamp';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { LogicContext } from '@/context/LogicContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const navigateTo = useRouter();
  const userContext = useContext(UserContext);
  const logicContext = useContext(LogicContext);
  useEffect(() => {
    const loadSession = async () => {
      if(logicContext?.logueado === false) {
        const sessionStarted = await userContext?.reSession();
        if(sessionStarted === true) {
          logicContext?.setLoading(false);
          logicContext?.setLogueado(true);
        } else {
          navigateTo.push('/auth/login');
        }
      } else {
        logicContext?.setLoading(false);
      }
    }
    loadSession();
  },[]);
/*   const socket = io('ws://localhost:5000'); // Reemplaza la URL con la del servidor Nest.js
    
  useEffect(()=> {
      // Eventos y acciones que deseas manejar en el cliente
      socket.on('connect', () => {
        console.log('Conectado al servidor Socket.IO');
      });
  
      socket.on('mensajeServidor', (mensaje) => {
        console.log('Mensaje recibido del servidor:', mensaje);
      });
      socket.emit('mensajeCliente', '¡Hola servidor!');
      return () => {
        socket.disconnect(); // Desconecta el socket cuando el componente se desmonta
      };
    },[]); */
  if(logicContext?.loading === true)
    return <div>Cargando...</div>
  else return (
    <>
      <Barra_Nav/>
      <main>
        <ListUsers/>
        <ChatCamp/>
      </main>
    </>
  )
}
