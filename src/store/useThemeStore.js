import {create} from 'zustand'
import {getKv, saveKv} from "../api/clusterApi";

export const useThemeStore = create((set) => ({
    themeConfig: {
        token: {
            borderRadius: 6,
            colorPrimary: "#1677FF",
            colorInfo: "#1677FF",
        }
    },
    fetchThemeConfig: async () => {
        try {
            const response = await getKv("theme");
            if (response.code === 200) {
                const themeConfig = JSON.parse(response.data); // 转换 JSON 字符串为 JSON 对象
                // console.log(themeConfig)
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
            const themeConfig = JSON.stringify(newConfig)
            console.log(newConfig, themeConfig)
            set({...newConfig})
            saveKv({
                "key": "theme",
                "value": themeConfig
            }).then(resp => {
                console.log(resp)
            })
        } catch (error) {
            console.log(error)
        }
    },
}))