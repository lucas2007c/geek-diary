import { create } from 'zustand'

const useGameStore = create((set) => ({
    games: [],
    fabricante: '',
    setGames: (newGames) => set(() => ({ games: newGames })),
    addGame: (newGame) => set((state) => ({ games: [...state.games, newGame] })),
    removeGame: (id, userID) => set((state) => {
        const gamesFiltered = state.users.filter(game => game.id !== id && game.users_id !== userID)
        return { games: gamesFiltered }
    }),
    updateGame: (id, userID, data) => set((state) => {
        const gamesEdited = state.games.map(game => {
            if (game.id === id & game.users_id == userID) {
                return { id, ...data, users_id: userID }
            }
            return game
        })
        return { games: gamesEdited }
    })
}))

export default useGameStore