import { create } from 'zustand'

export const usePlayerListStore = create((set) => ({
    playerList: [],
    // 获取 playList
    getPlayerList: () => set((state) => state.playerList),
    // 更新 playList（例如添加新歌曲）
    setPlayerList: (newPlayerList) => set((state) => ({
        playerList: [...newPlayerList],
    })),
}))