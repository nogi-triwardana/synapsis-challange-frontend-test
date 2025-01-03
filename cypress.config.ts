import { defineConfig } from 'cypress'
import { getBaseUrl } from './helpers';
 
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    baseUrl: getBaseUrl(),
    defaultCommandTimeout: 10000,
  },
});