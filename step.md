--git初始化

--删除无用代码及文件
删除App.vue中无用代码、HelloWord.vue、style.css
pnpm i @types/node --save-dev

--安装sass
pnpm install sass

--安装tailwindcss
https://www.tailwindcss.cn/docs/installation/using-postcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

--安装ElementPlus
参考ElementPlus官网

--eslint
pnpm i eslint eslint-plugin-vue --save-dev
pnpm install @typescript-eslint/parser --save-dev
pnpm install @typescript-eslint/eslint-plugin --save-dev

--prettier
pnpm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev

--安装pinia
pnpm install pinia

--安装vue-Router

--NProgress
pnpm install --save nprogress

--iconfont
https://www.iconfont.cn/help/detail?spm=a313x.search_index.i3.28.47343a81mQV4FC&helptype=code
symbol 引用
pnpm install vite-plugin-svg-icons -D
vite配置createSvgIconsPlugin
main.ts 引入 (import 'virtual:svg-icons-register')


--Axios封装

--Echarts封装


--安装vue-use
--安装husky
