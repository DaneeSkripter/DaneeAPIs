const express = require('express');
const fs = require("fs");
const app = express();
const logger = require("./logger")
const app2 = express();
const path = require("path")

app.get("/img/:path", async (req, res) => {
  if (!fs.existsSync(__dirname + `/Forza/img/${req.params.path}`)) return res.sendStatus(404);
  
  res.setHeader("Content-Type", "image/png");
  res.send(fs.readFileSync(__dirname + `/Forza/img/${req.params.path}`));
});

app.get('/', async (req, res) => {
const images = fs.readdirSync(__dirname + "/Forza/img").map(img => `https://forza.daneeapis.tk/img/${img}`);
  const randomimage = images[Math.floor(Math.random() * images.length)];
  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    image: randomimage
  });
});

app.listen(5100);
logger.success("ForzaAPI is listening on port 5100")

app2.get('/:device', function (req, res) {
  const device = req.params.device
  if (device === 'phone') {
      const phoneFolder = path.resolve(__dirname + '/Wallpaper/wallpapers/phone')
      const phoneWallpapers = fs.readdirSync(phoneFolder).map(wallpaper => `https://wallpaper.daneeapis.tk/img/phone/${wallpaper}`)
      const phoneRandomWallpaper = phoneWallpapers[Math.floor(Math.random() * phoneWallpapers.length)]
      
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
          wallpaper: phoneRandomWallpaper
        });
  } else if (device === 'desktop') {
      const desktopFolder = path.resolve(__dirname + '/Wallpaper/wallpapers/desktop')
      const desktopWallpapers = fs.readdirSync(desktopFolder).map(wallpaper => `https://wallpaper.daneeapis.tk/img/desktop/${wallpaper}`)
      const desktopRandomWallpaper = desktopWallpapers[Math.floor(Math.random() * desktopWallpapers.length)]
      
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
          wallpaper: desktopRandomWallpaper
        });
  } else {
      res.send("Use phone or desktop parameter")
  }
})


app2.get('/img/:device/:img', function (req, res) {
  const device = req.params.device
  const img = req.params.img
  if (device === 'phone') {
      const wallpaper = path.resolve(__dirname + `/Wallpaper/wallpapers/phone/${img}`)

      if (!fs.existsSync(wallpaper)) return res.sendStatus(404);

      res.setHeader("Content-Type", "image/png");
      res.send(fs.readFileSync(wallpaper))
  } else if (device === 'desktop') {
      const wallpaper = path.resolve(__dirname + `/Wallpaper/wallpapers/desktop/${img}`)

      if (!fs.existsSync(wallpaper)) return res.sendStatus(404);

      res.setHeader("Content-Type", "image/png");
      res.send(fs.readFileSync(wallpaper))
  } else {
    res.send("Use phone or desktop parameter")
  }

})


app2.listen(5101)
logger.success("WallpaperAPI is listening on port 5101")