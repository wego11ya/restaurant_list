# 我的餐廳清單

## 介紹

來建立屬於你自己的餐廳清單吧

### 功能

- 使用者可以瀏覽所有餐廳
  ![Screenshot from index page ](./public/image/screenshotIndex.PNG)
- 使用者可以搜尋特定餐廳
- 使用者可以新增一家餐廳
  ![Screenshot from index page ](./public/image/screenshotCreate.PNG)
- 使用者可以瀏覽一家餐廳的詳細資訊
  ![Screenshot from index page ](./public/image/screenshotDetail.PNG)
- 使用者可以修改一家餐廳的資訊
  ![Screenshot from index page ](./public/image/screenshotEdit.PNG)
- 使用者可以刪除一家餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install // 安裝套件
   ```

4. 設定 MongoDB 環境變數

   ```bash
   set MONGODB_URI="你的MongoDB連線字串" // for Windows cmd
   export MONGODB_URI="你的MongoDB連線字串" // for bash (MacOS bash terminal and Git bash for Windows)
   ```

5. 寫入種子資料

   ```bash
   npm run seed
   ```

6. 開啟程式

   ```bash
   npm run start
   ```

7. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Restaurant List is now listening on http://localhost:3000
   ```

   請至 http://localhost:3000 開啟網站

8. 若欲中斷伺服器連線，請按

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 16.16.0
- Express 4.18.1
- Mongoose 6.6.5
- Express-Handlebars 3.0.0
- Bootstrap 4.3.1
- Font-awesome 5.8.1

## 開發人員

Wei Lin
