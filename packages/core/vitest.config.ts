import { defineConfig } from 'vitest/config'

export default {
  test: {
    coverage: {
      reporter: ['text', 'lcov']
    }
  },
}
