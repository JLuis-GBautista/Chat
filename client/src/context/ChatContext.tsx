"use client"

import {createContext, useEffect, useState } from "react";
import { propsChatContext } from "@/interfaces/PropsContexts";
import axios, { AxiosResponse } from "axios";

export const ChatContext = createContext<propsChatContext | null>(null);

export default function ChatProvider({ children }: { children: React.ReactNode }) {
    const [chatsUser, setChatsUser] = useState([]);
    const [chatSelected, setChatSelected] = useState<any>(null);
    const baseURL = process.env.URL_BACK;
    const getChatsUser = async (token: string) => {
        try {
            const res = await axios.get(`${baseURL}/chats/all`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            setChatsUser(res.data);
            if (res.data.length === 0) return false;
            else return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const getChatsUserWithSearch = async (startName: string, token: string) => {
        try {
            let res: AxiosResponse<any, any>;
            console.log(startName);
            if (startName !== '')
                res = await axios.get(`${baseURL}/chats/filterUser`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    params: {
                        startName,
                    }
                });
            else
                res = await axios.get(`${baseURL}/chats/all`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
            setChatsUser(res.data);
            if (res.data.length === 0) return false;
            else return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const getOneChat = async (token: string, id: number) => {
        try {
            const res = await axios.get(`${baseURL}/chats/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            console.log(res.data);
            setChatSelected(res.data.chat);
            return res.data.chat;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const values: propsChatContext = {
        chatsUser,
        getChatsUser,
        getChatsUserWithSearch,
        getOneChat,
        chatSelected,
        setChatSelected,
    }
    return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
  }