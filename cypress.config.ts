import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    cmsAPI: "http://20.92.231.254/v1/api-docs/",
    extAPI: "http://20.92.231.254/v1/mobileapi-docs/"
    }
});