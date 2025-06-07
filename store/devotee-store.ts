import { create } from "zustand"

interface DevoteeState {
    name: string
    nakshatra: string
    setName: (name: string) => void
    setNakshatra: (nakshatra: string) => void
    resetForm: () => void
}

export const useDevoteeStore = create<DevoteeState>((set) => ({
    name: "",
    nakshatra: "",
    setName: (name) => set({ name }),
    setNakshatra: (nakshatra) => set({ nakshatra }),
    resetForm: () => set({ name: "", nakshatra: "" }),
}))
