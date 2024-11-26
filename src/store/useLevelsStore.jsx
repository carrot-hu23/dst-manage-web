import { create } from 'zustand'

export const useLevelsStore = create((set) => ({
    levels: [],
    // 获取 playList
    getLevels: () => set((state) => state.levels),
    // 更新 playList（例如添加新歌曲）
    setLevels: (newLevels) => {
        set((state) => ({
            levels: [...newLevels],
        }))
    },
}))