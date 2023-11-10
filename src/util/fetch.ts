const toast = (x:unknown) => void 0

type Method = "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE"
const headers = {
    'Accept': 'application/json',
  
}
export const fetchy = async <T,>(method:Method, url:string, data?:{}) => {
    const body = (method !== 'GET' && method !== 'HEAD' && data) ? JSON.stringify(data) : undefined
    
    const res = await fetch(url, {method, headers, ...body && {body}})

    if (!res.ok) {

        const data:API = await res.json()

        console.error(res.status, data)
        
        const EN = "error" in data ? data.error.name : "Unknown Error"
        const EM = "error" in data ? data.error.message : "Something went wrong!"

        if (EN === "PrismaClientKnownRequestError"){
            toast({
                title: "Client Side Error",
                description: "No Internet Connection",
                variant: "destructive"
            })
        }
        else toast({
            title: EN,
            description: EM,
            variant: "destructive"
        })

        throw new Error(EM)
    }        

    return res.json() as T
}