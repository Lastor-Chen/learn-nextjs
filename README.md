# Learn Next.js
This is a learning project refer to tutorial of [Next.js learn page](https://nextjs.org/learn).

Next.js 純學習專案，參考官網教學文件。<br />
嘗試添加 TS, Sass 等, 關切的內容。

## Deploy memo
Next.js 於 Server 端工作，有別於 React 與 Vue，並不是佈署 build 後的包。<br/>
而是與 Express.js 相似，是作為 Server 端 App 來佈署，服務器會用 Node.js 去跑這個 App。<br />

Next.js 的 build 是進行 SSG 預渲染及優化等工作。完成後才執行 start 啟動 App。<br />
並不像 Vue 與 React，build 是 webpack 進行打包，輸出成純 HTML / CSS / Javascript。<br />

### Heroku
Next.js 無法用 Express.js 的方式設定 port。為了取得 Heroku 的環境 port，可於 `package.json` 進行設定。<br />

```json
"scripts": {
  "start": "next start -p $PORT"
}
```

其餘佈署概念，基本與佈署 Express App 一致。<br />
如專案使用 yarn 管理套件，並希望 Heroku 也使用 yarn，可於 `package.json` 指定 yarn 的版本，來保持一致。<br />
[Heroku 文件](https://devcenter.heroku.com/articles/nodejs-support#specifying-a-yarn-version)

```json
"engines": {
  "yarn": "1.x"
}
```

### Vercel
Next.js 官方推薦的部屬平台，比 Heroku 更無腦。與 Heroku 不同，也可佈署純靜態網站。<br />
無法跟 Heroku 一樣指定 yarn 的版本，Vercel 似乎使用特定的 yarn 版本，如果在 package.json `engines` 設定詳細的版本號，Vercel 起 app 時會報錯。