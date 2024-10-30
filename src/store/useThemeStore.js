import {create} from 'zustand'
import {getKv, saveKv} from "../api/dstConfigApi";

export const useThemeStore = create((set) => ({
    themeConfig: null,
    fetchThemeConfig: async () => {
        try {
            const response = await getKv("theme");
            if (response.code === 200) {
                const themeConfig = JSON.parse(response.data); // 转换 JSON 字符串为 JSON 对象
                console.log(themeConfig)
                set({themeConfig});
            } else {
                set({})
            }
        } catch (error) {
            console.error('Error fetching theme configuration:', error);
        }
    },
    saveThemeConfig: (newConfig) => {
        try {
            const themeConfig = JSON.parse(newConfig)
            set({themeConfig})
            saveKv({
                "key": "theme",
                "value": newConfig
            }).then(resp => {
                console.log(resp)
            })
        } catch (error) {
            console.log(error)
        }
    },
}))