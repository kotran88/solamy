const PUSH_APP_ID = "a7627c17-c314-4d42-b7d3-2f8369a77e09";

// const SERVER_IP = "192.168.2.131";
// const SERVER_IP = "solarmy.cafe24app.com";
const SERVER_IP = "localhost:3200";
const HTTP_PORT = 8001;
var IMG_URL = "http://" + SERVER_IP + "/solarmy_server/uploads/";     // url of http server
var ESCRO_URL = "http://" + SERVER_IP + "/solarmy_admin/escro/escro";     // url of http server

export const CONFIG = {
    http_server : "http://"+SERVER_IP,    
    IMG_URL : IMG_URL,
    PUSH_APP_ID : PUSH_APP_ID,
    ESCRO_URL:ESCRO_URL
};

//몇번 해봤는데대표님 덕분에 납땜 됩니다! 다음에 명함 나오자마자 말씀드리고 첫번째로 찾아뵙도록 하겠습니다! 감사합니다 :) 사업이야기 더 들려주 술 

// const length = q.length;
//     let count = 0;
//     let i = 0;
//     for (i = length; i > 0; i--) { 
//         let indexOfi = q.indexOf(i);
//         if (indexOfi !== i - 1) { 
//             q.splice(indexOfi, 1);
//             q.splice(i - 1, 0, i);
//             let cal = i - 1 - indexOfi;
//             if (cal <= 2) {
//                 count += cal;
//             } else {
//                 console.log("Too chaotic");
//                 return;
//             }
//         }
//     }
//     console.log(count);
