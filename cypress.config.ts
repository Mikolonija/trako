import { defineConfig } from 'cypress';
import { cyTestWebsiteLink } from './src/config';

export default defineConfig({
  e2e: {
    baseUrl: cyTestWebsiteLink,
    supportFile: false,
  },
});
