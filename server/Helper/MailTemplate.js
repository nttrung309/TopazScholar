const GenerateEmailTemplate = (activityData) => {
    return `
    <!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <!-- <link href="./css/main.css" rel="stylesheet" /> -->
    <title>Document</title>
  </head>
  <body style="padding: 0; box-sizing: border-box; font-family: Inter; max-width: 100%">
    <div class="v2211_1772" 
    style="
        box-sizing: border-box;
        width: fit-content;
        height: fit-content;
        background: rgba(158,197,254,1);
        box-sizing: border-box;
        vertical-align: middle;
        padding: 20px;">

        <div class="v2211_1776" style="width: 500px;
        box-sizing: border-box;
        padding: 10px;
        height: fit-content;
        background: rgba(213,237,255,1);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);">
            <div class="v2211_1777" style="width: 120px;
            height: 87px;
            background: url('https://firebasestorage.googleapis.com/v0/b/topazscholar.appspot.com/o/topaz_scholar_logo.png?alt=media&token=24a50114-b828-4f0d-bf51-b4f53359cb1e');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            margin: 0 auto;
            vertical-align: middle;"
            ></div>
            <div class="v2211_1780" style="width: 100%;
            box-sizing: border-box;
            padding: 8px;
            background: rgba(61,139,253,1);
            margin: 8px auto;
            margin-top: 0;
            font-size: 20px; font-weight: bold; text-align: center; color: white;">
                THÔNG BÁO
            </div>
        <div class="v2211_1783" style="font-size: 16px; font-weight: 600; color: #031633; padding-left: 20px;"
          >Topaz Scholar xin thông báo,
        </div>
        <div class="v2211_1783" style="font-size: 16px; font-weight: 600; color: #031633; padding-left: 20px; margin-top: 2px;">
            Hoạt động “<span style="font-weight: bolder;">${activityData.name}</span>” sắp bắt đầu!
        </div>
        <div class="v2211_1799" style="border: 1px solid #3D8BFD; 
        width: 380px; 
        padding: 10px 20px; 
        margin: 10px auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #0A58CA;
        text-align: center;
        box-sizing: border-box;">
            <div class="v2211_1801">Tên hoạt động: <span style="font-weight: bolder;">${activityData.name}</span></div>
            <div class="v2211_1801"> Thời gian: <span style="font-weight: bolder;">26/6/2024 - 14h 26/6/2024</span></div>
            <div class="v2211_1804" style="
            width: 320px;   
            margin: 6px auto; 
            background-color: #3867BE;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            font-size: 20px;
            font-weight: bolder;
            color: white;
            text-align: center;
            padding: 12px;">
                Chi Tiết Hoạt Động
            </div>
        </div>
        <div style="text-align: center;" class="footer">© 2024 Topaz Scholar. All rights reserved.</div>
      </div>
    </div>
  </body>
</html>

    `;
};

  module.exports = { GenerateEmailTemplate }