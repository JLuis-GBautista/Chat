import 'normalize.css';
import './globals.scss'
import { Inter } from 'next/font/google'
import LogicProvider from '@/context/LogicContext';
import UserProvider from '@/context/UserContext';
import ValidateProvider from '@/context/ValidateContext';
import ChatProvider from '@/context/ChatContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatApp',
  description: 'Mi aplicación de chats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <LogicProvider>
        <UserProvider>
          <ValidateProvider>
            <ChatProvider>
            <body className={inter.className}>{children}</body>
            </ChatProvider>
          </ValidateProvider>
        </UserProvider>
      </LogicProvider>
    </html>
  )
}
