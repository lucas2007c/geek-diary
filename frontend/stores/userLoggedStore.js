import { create } from 'zustand'

const useUserLoggedStore = create((set) => ({
    id: null,
    email: '',
    token: '',
    isLogged: false,

    login: (user, token) => set(() => ({ ...user, token, isLogged: true })),
    logout: () => set(() => ({
        id: null,
        email: '',
        token: '',
        isLogged: false,
    }))
}))

export default useUserLoggedStore