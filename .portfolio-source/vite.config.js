import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  plugins:[react()],
  resolve:{alias:[
    {find:/^@designcodeio\/threeui$/,replacement:fileURLToPath(new URL('./src/threeui-entry.js',import.meta.url))},
    {find:'@designcodeio/threeui/style.css',replacement:fileURLToPath(new URL('./src/shaders/threeui.css',import.meta.url))}
  ]},
  optimizeDeps:{entries:['index.html']},
  server:{host:'127.0.0.1',port:5174,strictPort:true},
  preview:{host:'127.0.0.1',port:5174},
  build:{target:'es2022',emptyOutDir:true}
});
