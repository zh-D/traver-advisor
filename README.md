启动本地访问之前需要获取 `Rapid API Key`

[Travel Advisor API](https://rapidapi.com/apidojo/api/travel-advisor)
[Open Weather Map API](https://rapidapi.com/community/api/open-weather-map)

以及在 Google Cloud Platform 获取 `Google Maps API Key` 和开启 `Places API` 和 `Maps JavaScript API`

在根目录创建一个 .env 文件
```javascript
REACT_APP_GOOGLE_MAPS_API_KEY=yourkey
REACT_APP_RAPIDAPI_KEY=your_key

```
在 public/index.html 里增加

```html
<script
    src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=your_google_api_key"></script>
```

然后 npm i && npm start