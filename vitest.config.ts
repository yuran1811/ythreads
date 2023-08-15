import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'ythreads',
    exclude: [...configDefaults.exclude],
  },
  plugins: [react(), tsconfigPaths()],
});
