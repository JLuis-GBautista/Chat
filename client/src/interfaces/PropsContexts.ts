import { Dispatch, SetStateAction } from "react";
import { DataLogin, DataRegister } from "./EstructureData";

export interface propsChatContext {
    chatsUser: never[],
    getChatsUser: (token: string) => Promise<boolean>,
    getChatsUserWithSearch: (startName: string, token: string) => Promise<boolean>,
    getOneChat: (token: string, id: number) => Promise<any>,
    chatSelected: any,
    setChatSelected: Dispatch<any>,
}

export interface propsLogicContext {
    logueado: boolean;
    setLogueado: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading:  Dispatch<SetStateAction<boolean>>;
    loadingSocket: boolean,
    setLoadingSocket:  Dispatch<SetStateAction<boolean>>;
}

export interface propsUserContext {
    accessToken: string;
    firstData: any;
    dataSessionUser: any;
    errorSessionUser: any;
    errorsInDataUser: any;
    setDataSessionUser: Dispatch<SetStateAction<any>>,
    setErrorSessionUser: Dispatch<SetStateAction<any>>,
    setErrorsInDataUser: Dispatch<SetStateAction<any>>,
    refreshTimeoutValue: any,
    setRefreshTimeoutValue: Dispatch<SetStateAction<any>>,
    reSession: () => Promise<boolean>;
    login: (data: DataLogin) => Promise<boolean>;
    register: (data: DataRegister) => Promise<boolean>;
    logout: () => Promise<boolean>;
    editUser: (data: { nombre: string }) => Promise<boolean>;
    editImg: (data: { foto: File }) => Promise<boolean>; 
}

export interface propsValidateContext {
    validateFields: defaultRes;
    setValidateFields: Dispatch<SetStateAction<defaultRes>>;
    validate: (type: string, value: string) => void;
    focusFields: (type: string) => void;
}
interface defaultRes {
    nombre: boolean,
    fecha_nacimiento: boolean;
    correo: boolean,
    clave_acceso: boolean
  }