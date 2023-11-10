// API (dont touch it)

type SystemResponse = {
    system?: string
    warning?: string
}

type DataRes<D = Empty> = {
    data: D,
    message: string
}

type ErrorRes = {
    error: {
        name: string,
        message: string
    }
}

type API<D = Empty> = Pretty<SystemResponse & (DataRes<D> | ErrorRes)>



// utils

type UseStateFunc<T> = React.Dispatch<React.SetStateAction<T>>
type FC<T=Empty> = React.FC<T & {
    children?: React.ReactNode,
    className?: string,
}>

type Pretty<T> = {
    [K in keyof T]: T[K]
} & Empty

type ArrayedType<T> = Pretty<{
    [K in keyof T]: T[K][];
}>;

type GetValueTypeByKey<T, K extends keyof T> = T[K];

type FormEvent =  React.FormEvent<HTMLFormElement>
type FormTarget<T=Empty, O=Empty> = FormEvent & {
    target:{
        [key in T[number]] : {value: string, getAttribute: (string)=> "unchecked" | "checked" | string}
    }
} & O

type ObtainKeys<Obj, Type=Any> = {
    [Prop in keyof Obj]: Obj[Prop] extends Type ? Prop : never
}[keyof Obj]


type Empty = Record<string, never>
type Any = NonNullable<unknown>