import { create } from "zustand"


type State = {
    token: string
}

type Action = {
    saveToken: (token: State['token'])=>void,
    clearToken: ()=>void
}

const useTokenStorage = create<State& Action>((set)=>({
    token: "",
    saveToken: (token)=>set(()=>({token:token})),
    clearToken:()=>set(()=>({token:""}))
}))

export { useTokenStorage }