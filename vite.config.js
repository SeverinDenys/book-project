// import { defineConfig } from "vite";
// export default defineConfig({
//   // base: "/book-project/",
//   base: "/",
//   build: {
//     outDir: "dist",
//   },
// });
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "details.html"),
      },
    },
  },
});
