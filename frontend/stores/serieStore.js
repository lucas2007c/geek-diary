import { create } from 'zustand'

const useSerieStore = create((set) => ({
    series: [],
    setSeries: (newSeries) => set(() => ({ series: newSeries })),
    addSerie: (newSerie) => set((state) => ({ series: [...state.series, newSerie] })),
    removeSerie: (id, userID) => set((state) => {
        const seriesFiltered = state.series.filter(serie => serie.id !== id && serie.users_id === userID)
        return { series: seriesFiltered }
    }),
    updateSerie: (id, userID, data) => set((state) => {
        const seriesEdited = state.series.map(serie => {
            if (serie.id === id & serie.users_id == userID) {
                return { id, ...data, users_id: userID }
            }
            return serie
        })
        return { series: seriesEdited }
    })
}))

export default useSerieStore