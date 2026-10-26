import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'
import viVN from 'antd/locale/vi_VN'
import { ThemeContext } from './ThemeContext'
import type { Theme } from './ThemeContext'

// màu giấy + xanh rêu, bo góc nhỏ để không bị giống antd mặc định
const lightTokens: ThemeConfig['token'] = {
  colorPrimary: '#2f5d50',
  colorBgLayout: '#f6f3ec',
  colorBgContainer: '#fffdf8',
  colorText: '#2b2620',
  colorTextSecondary: '#6f675c',
  colorBorder: '#e2dacb',
  colorBorderSecondary: '#e2dacb',
  colorError: '#b3372a',
}

const darkTokens: ThemeConfig['token'] = {
  colorPrimary: '#8cc2a8',
  colorBgLayout: '#1b1915',
  colorBgContainer: '#24211c',
  colorText: '#ece6da',
  colorTextSecondary: '#a59c8d',
  colorBorder: '#3a352d',
  colorBorderSecondary: '#3a352d',
  colorError: '#e88a7d',
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  const antdConfig = useMemo<ThemeConfig>(() => {
    const isDark = theme === 'dark'
    const tokens = isDark ? darkTokens : lightTokens
    // nền primary ở chế độ tối khá sáng nên chữ trên nó phải tối
    const onPrimary = isDark ? '#14201b' : '#ffffff'
    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        ...tokens,
        borderRadius: 3,
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      },
      components: {
        Button: { primaryColor: onPrimary },
        Segmented: {
          itemSelectedBg: tokens?.colorPrimary,
          itemSelectedColor: onPrimary,
        },
      },
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={antdConfig} locale={viVN}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
