export interface DataLogin {
    correo?: string | undefined;
    clave_acceso?: string | undefined;
}

export interface DataRegister {
    nombre?: string | undefined;
    correo?: string | undefined;
    clave_acceso?: string | undefined;
    fecha_nacimiento?: string | undefined;
}

export interface PropsChat {
    id: number,
    nombre: string,
    foto: string,
    valueSelect: string,
    activeChat: (componentId: string) => void,
    onSala: (salaId: string) => void,
}