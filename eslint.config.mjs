import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, jest: true, process: true },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
]
