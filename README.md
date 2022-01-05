# Learn Next.js
This is a learning project refer to tutorial of [Next.js learn page](https://nextjs.org/learn).

Next.js 純學習專案，參考官網教學文件。<br />
嘗試添加 TS, Sass 等, 關切的內容。

## Deploy memo
Next.js 於 Server 端工作，有別於 React 與 Vue，並不是佈署 build 後的檔案。<br/>
而是與 Express.js 相似，是作為 Server 端 App 佈署。<br />

Next.js 要運行 prod 模式，要先 build 進行 SSG 預渲染，優化等工作。<br />
完成後才執行 start。

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
