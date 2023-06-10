"use client"

import {createContext, useState } from "react";
import { propsLogicContext } from "@/interfaces/PropsContexts";

export const LogicContext = createContext<propsLogicContext | null>(null);

export default function LogicProvider({ children }: { children: React.ReactNode }) {
    const [logueado, setLogueado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingSocket, setLoadingSocket] = useState(true);
    const values: propsLogicContext = {
        loading,
        setLoading,
        logueado,
        setLogueado,
        loadingSocket,
        setLoadingSocket,
    }
    return <LogicContext.Provider value={values}>{children}</LogicContext.Provider>
  }