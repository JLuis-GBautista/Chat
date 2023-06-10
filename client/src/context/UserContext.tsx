"use client"

import { DataLogin, DataRegister } from "@/interfaces/EstructureData";
import axios from "axios";
import { createContext, useState } from "react";
import { propsUserContext } from "@/interfaces/PropsContexts";
import { io } from "socket.io-client";

export const UserContext = createContext<propsUserContext | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [firstData, setFirstData] = useState<any | null>(null);
    const [dataSessionUser, setDataSessionUser] = useState<any | null>(null);
    const [errorSessionUser, setErrorSessionUser] = useState<any | null>(null);
    const [errorsInDataUser, setErrorsInDataUser] = useState<any | null>(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshTimeoutValue, setRefreshTimeoutValue] = useState<any>(undefined);
    const baseURL = process.env.URL_BACK;

    const refresh = (caducidad: number) => {
        console.log('aqui');
        const st = setTimeout(() => {
            reSession();
          }, (caducidad*1000)-5000);
        console.log(st);
        setRefreshTimeoutValue(st);
    }
    const reSession = async () => {
        try {
            console.log(refreshTimeoutValue)
            const res = await axios.get(`${baseURL}/users/refresh`, {
                withCredentials: true,
            });
            if(res.data.ok) {
                setAccessToken(res.data.accessToken);
                const {accessToken, seconds} = res.data;
                const resData = await axios.get(`${baseURL}/users/session`, {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    }
                });
                console.log(resData.data);
                setFirstData(resData.data);
                setDataSessionUser(resData.data);
                setErrorSessionUser(null);
                setErrorsInDataUser(null);
                refresh(seconds);
            }
            console.log('resesion');
            return true;
        } catch(err: any){
            console.log(err);
            setDataSessionUser(null);
            setErrorSessionUser(err.response.data.message + " Inicia sesión nuevamente o registrate");
            setErrorsInDataUser(null);
            return false;
        }
    }
    const register = async (data: DataRegister) => {
        try {
            const res = await axios.post(`${baseURL}/users/register`, data, {
                withCredentials: true,
            });
            if(res.data.ok) {
                return await reSession();
            }
            return true;
        } catch(err: any) {
            console.log(err);
            setDataSessionUser(null);
            if(err.response) {
                const message = err.response.data.message;
                if(Array.isArray(message)) {
                    setErrorsInDataUser(message);
                    setErrorSessionUser(null);
                } else {
                    setErrorsInDataUser(null);
                    setErrorSessionUser(message);
                }
            } else {
                setErrorSessionUser(err.message);
                setErrorsInDataUser(null);
            };
            return false;
        }
    }
    const login = async (data: DataLogin) => {
        try {
            const res = await axios.post(`${baseURL}/users/login`, data, {
                withCredentials: true,
            });
            if(res.data.ok) {
                return await reSession();
            }
            else return false;
        } catch(err: any) {
            console.log(err);
            setDataSessionUser(null);
            if(err.response) {
                const message = err.response.data.message;
                if(Array.isArray(message)) {
                    setErrorsInDataUser(message);
                    setErrorSessionUser(null);
                } else {
                    setErrorsInDataUser(null);
                    setErrorSessionUser(message);
                }
            } else {
                setErrorSessionUser(err.message);
                setErrorsInDataUser(null);
            };
            return false;
        }
    }
    const logout = async () => {
        try {
            await axios.get(`${baseURL}/users/close`, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            });
            setAccessToken('');
            setDataSessionUser(null);
            setErrorSessionUser(null);
            setErrorsInDataUser(null);
            return true;
        } catch (error: any) {
            console.log(error);
            /* setErrorSessionUser(error.response.message); */
            setErrorsInDataUser(null);
            return false;
        }
    }
    const editUser = async (data: { nombre: string }) => {
        try {
            const res = await axios.patch(`${baseURL}/users/update`, data, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            });
            if(res.data.ok) {
                setDataSessionUser(res.data.usuario);
                setErrorSessionUser(null);
                setErrorsInDataUser(null);
                return true;
            }
            return false;
        } catch (err: any) {
            if(err.response) {
                const message = err.response.data.message;
                if(Array.isArray(message)) {
                    setErrorsInDataUser(message);
                    setErrorSessionUser(null);
                } else {
                    setErrorsInDataUser(null);
                    setErrorSessionUser(message);
                }
            } else {
                setErrorSessionUser(err.message);
                setErrorsInDataUser(null);
            };
            return false;
        }
    }
    const editImg = async (data: { foto: File }) => {
        const formData = new FormData();
        formData.append('foto', data.foto);
        try {
            const res = await axios.patch(`${baseURL}/users/imagen`, formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            });
            if(res.data.ok){
                setDataSessionUser(res.data.usuario);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    const values: propsUserContext = {
        accessToken,
        firstData,
        dataSessionUser,
        errorSessionUser,
        errorsInDataUser,
        setDataSessionUser,
        setErrorSessionUser,
        setErrorsInDataUser,
        refreshTimeoutValue,
        setRefreshTimeoutValue,
        reSession,
        login,
        register,
        logout,
        editUser,
        editImg,
    }
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
  }