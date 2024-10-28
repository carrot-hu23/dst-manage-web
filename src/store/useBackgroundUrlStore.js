import {create} from 'zustand'
import {getKv} from "../api/dstConfigApi";

export const useBackgroundUrlStore = create((set) => ({
    backgroundUrl: null,
    fetchBackgroundUrl: async () => {
        try {
            const response = await getKv("backgroundUrl");
            if (response.code === 200) {
                set(response.data)
            } else {
                set({})
            }
        } catch (error) {
            console.error('Error fetching theme configuration:', error);
        }
    },
}))