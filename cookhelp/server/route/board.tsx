const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const db = require("../lib/db.tsx");
const sessionOption = require("../lib/sessionOption.tsx");
const { Buffer } = require("buffer");

// router
const router = express.Router();
module.exports = router;

// multer
const multer = require("multer");

// Multer 디렉토리 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일 저장 경로 설정
    cb(null, "./img_server");
  },
  filename: function (req, file, cb) {
    const formattedDate = transDate(1);
    cb(null, formattedDate + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); // 파일이 저정될 경로 설정

router.use(
  bodyParser.json({
    limit: "50mb",
  })
);
router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.json({
//     limit : "50mb"
// }));
router.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
router.use(cors());

// session
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(sessionOption);
router.use(
  session({
    key: "session_cookie_name",
    secret: "~",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// 파일 필터링
function fileFilter(req, file, cb) {
  // 이 함수는 boolean 값과 함께 `cb`를 호출함으로써 해당 파일을 업로드 할지 여부를 나타낼 수 있습니다.
  // 이 파일을 거부하려면 다음과 같이 `false` 를 전달합니다:
  cb(null, false);

  // 이 파일을 허용하려면 다음과 같이 `true` 를 전달합니다:
  cb(null, true);

  // 무언가 문제가 생겼다면 언제나 에러를 전달할 수 있습니다:
  cb(new Error("I don't have a clue!"));
}

// 날짜 데이트 변환 함수
function transDate(num) {
  const currentDate = new Date();

  // 저장될 파일명 설정
  let formattedDate = "";

  if (num === 1) {
    // YYYYMMDDTTMM 형식으로 변환
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const minute = currentDate.getMinutes().toString().padStart(2, "0");
    formattedDate = `${year}${month}${day}${hour}${minute}`;
  } else if (num === 2) {
    // YYYYMMDD 형식으로 변환
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    formattedDate = `${year}${month}${day}`;
  }

  return formattedDate;
}

// 통신 테스트
router.get("/", (req, res) => {
  res.send("Hello, board");
});

// 레시피 리스트 불러오기
router.get("/api/list", (req, res) => {
  const sqlQuery =
    "SELECT recipe_idx, recipe_title, members, DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date, foodstyle FROM cookhelper;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("게시판 목록 생성 완료.");
  });
});

// 파일 업로드 처리
router.post(
  "/api/upload",
  upload.array("recipe_img"),
  function (req, res, next) {
    const recipe_title = req.body.recipe_title;
    const members = req.body.members;
    const recipe_stuff = req.body.recipe_stuff;

    const recipe_step_1 = req.body.recipe_step_1;
    const recipe_step_2 = req.body.recipe_step_2;
    const recipe_step_3 = req.body.recipe_step_3;
    const recipe_step_4 = req.body.recipe_step_4;
    const recipe_step_5 = req.body.recipe_step_5;
    const recipe_step_6 = req.body.recipe_step_6;
    const recipe_step_7 = req.body.recipe_step_7;
    const recipe_step_8 = req.body.recipe_step_8;
    const recipe_step_9 = req.body.recipe_step_9;
    const recipe_step_10 = req.body.recipe_step_10;

    const rd_1 = req.body.rd_1;
    const rd_1_video = req.body.rd_1_video;
    const timer_rd_1 = req.body.timer_rd_1;
    const rd_2 = req.body.rd_2;
    const rd_2_video = req.body.rd_2_video;
    const timer_rd_2 = req.body.timer_rd_2;
    const rd_3 = req.body.rd_3;
    const rd_3_video = req.body.rd_3_video;
    const timer_rd_3 = req.body.timer_rd_3;
    const rd_4 = req.body.rd_4;
    const rd_4_video = req.body.rd_4_video;
    const timer_rd_4 = req.body.timer_rd_4;
    const rd_5 = req.body.rd_5;
    const rd_5_video = req.body.rd_5_video;
    const timer_rd_5 = req.body.timer_rd_5;
    const rd_6 = req.body.rd_6;
    const rd_6_video = req.body.rd_6_video;
    const timer_rd_6 = req.body.timer_rd_6;
    const rd_7 = req.body.rd_7;
    const rd_7_video = req.body.rd_7_video;
    const timer_rd_7 = req.body.timer_rd_7;
    const rd_8 = req.body.rd_8;
    const rd_8_video = req.body.rd_8_video;
    const timer_rd_8 = req.body.timer_rd_8;
    const rd_9 = req.body.rd_9;
    const rd_9_video = req.body.rd_9_video;
    const timer_rd_9 = req.body.timer_rd_9;
    const rd_10 = req.body.rd_10;
    const rd_10_video = req.body.rd_10_video;
    const timer_rd_10 = req.body.timer_rd_10;

    const created_date = transDate(2);
    const foodstyle = req.body.foodstyle;

    // 저장한 이미지를 배열에 저장. 후 배열의 순서에 따라 해당 값을 할당.
    const recipe_img_array = req.files.map(
      (file) => `./img_server/${file.filename}`
    );

    // 대표 이미지
    const recipe_img = recipe_img_array[0];
    console.log(recipe_img);

    // 세부 이미지
    const recipe_img_1 = recipe_img_array[1];
    const recipe_img_2 = recipe_img_array[2];
    const recipe_img_3 = recipe_img_array[3];
    const recipe_img_4 = recipe_img_array[4];
    const recipe_img_5 = recipe_img_array[5];
    const recipe_img_6 = recipe_img_array[6];
    const recipe_img_7 = recipe_img_array[7];
    const recipe_img_8 = recipe_img_array[8];
    const recipe_img_9 = recipe_img_array[9];
    const recipe_img_10 = recipe_img_array[10];

    // 저장한 이미지를 배열에 저장. 후 배열의 순서에 따라 해당 값을 할당.
    // const recipe_img_array = req.files.map(file => {
    //     const imageBuffer = fs.readFileSync(`./img_server/${file.filename}`);
    //     const imageData = Buffer.from(imageBuffer).toString("base64");
    //     return imageData;
    // });

    // // 대표 이미지
    // const recipe_img = recipe_img_array[0];
    // console.log(recipe_img);

    // // 세부 이미지
    // const recipe_img_1 = recipe_img_array[1];
    // const recipe_img_2 = recipe_img_array[2];
    // const recipe_img_3 = recipe_img_array[3];
    // const recipe_img_4 = recipe_img_array[4];
    // const recipe_img_5 = recipe_img_array[5];
    // const recipe_img_6 = recipe_img_array[6];
    // const recipe_img_7 = recipe_img_array[7];
    // const recipe_img_8 = recipe_img_array[8];
    // const recipe_img_9 = recipe_img_array[9];
    // const recipe_img_10 = recipe_img_array[10];

    const query = `INSERT INTO cookhelper (recipe_title, members, recipe_stuff, recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10, rd_1, rd_1_video, timer_rd_1, rd_2, rd_2_video, timer_rd_2, rd_3, rd_3_video, timer_rd_3, rd_4, rd_4_video, timer_rd_4, rd_5, rd_5_video, timer_rd_5, rd_6, rd_6_video, timer_rd_6, rd_7, rd_7_video, timer_rd_7, rd_8, rd_8_video, timer_rd_8, rd_9, rd_9_video, timer_rd_9, rd_10, rd_10_video, timer_rd_10, created_date, foodstyle, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6, recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    const values = [
      recipe_title,
      members,
      recipe_stuff,
      recipe_img,
      recipe_step_1,
      recipe_step_2,
      recipe_step_3,
      recipe_step_4,
      recipe_step_5,
      recipe_step_6,
      recipe_step_7,
      recipe_step_8,
      recipe_step_9,
      recipe_step_10,
      rd_1,
      rd_1_video,
      timer_rd_1,
      rd_2,
      rd_2_video,
      timer_rd_2,
      rd_3,
      rd_3_video,
      timer_rd_3,
      rd_4,
      rd_4_video,
      timer_rd_4,
      rd_5,
      rd_5_video,
      timer_rd_5,
      rd_6,
      rd_6_video,
      timer_rd_6,
      rd_7,
      rd_7_video,
      timer_rd_7,
      rd_8,
      rd_8_video,
      timer_rd_8,
      rd_9,
      rd_9_video,
      timer_rd_9,
      rd_10,
      rd_10_video,
      timer_rd_10,
      created_date,
      foodstyle,
      recipe_img_1,
      recipe_img_2,
      recipe_img_3,
      recipe_img_4,
      recipe_img_5,
      recipe_img_6,
      recipe_img_7,
      recipe_img_8,
      recipe_img_9,
      recipe_img_10,
    ];

    const sendData = { isSuccess: "" };

    // DB에 데이터 전송
    db.query(query, values, function (error, result, fields) {
      if (error) {
        console.error("데이터 삽입 오류", error);
        sendData.isSuccess = "데이터 삽입 오류 발생";
      } else {
        sendData.isSuccess = "True";
        console.log("파일 업로드 완료.");
      }
    });

    // 업로드 완료 시 동작할 코드 작성
    res.send("파일 업로드 완료.");
  }
);

// 리스트 검색
router.get("/api/search/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  const sqlQuery = `SELECT recipe_idx, recipe_title, members, created_date FROM cookhelper WHERE recipe_title LIKE '%${keyword}%';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.result(500).send("데이터 조회 오류");
      return;
    }

    console.log("데이터 전송 성공, 데이터 개수:", result.length);
    res.send(result);
    // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
  });
});

// 요리 도우미 구현
// 요리도우미 이미지 데이터 외 전송.
router.get("/api/recipehelper/:recipe_idx", (req, res) => {
  // 전달받은 리스트의 인덱스
  const recipe_idx = req.params.recipe_idx;

  const sqlQuery = `SELECT recipe_title, members, recipe_stuff, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10, rd_1, timer_rd_1, rd_2, timer_rd_2, rd_3, timer_rd_3, rd_4, timer_rd_4, rd_5, timer_rd_5, rd_6, timer_rd_6, rd_7, timer_rd_7, rd_8, timer_rd_8, rd_9, timer_rd_9, rd_10, timer_rd_10, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.result(500).send("데이터 조회 오류");
      return;
    }

    // 특정 컬럼 값 추출
    const recipeStuff = result.length > 0 ? result[0].recipe_stuff : null;
    console.log("recipe_stuff 값:", recipeStuff);

    // 레시피 재료를 배열로 변환
    const recipeStuffArray = recipeStuff ? recipeStuff.split("/") : [];
    console.log("recipe_stuff_array 값:", recipeStuffArray);
    console.log("데이터 전송 성공, 데이터 개수:", result.length);

    // 클라이언트로 결과 및 recipeStuffArray 전송
    res.send({ result: result, recipeStuffArray: recipeStuffArray });
  });
});

// 요리 도우미 이미지만 전송
router.get("/api/recipehelperimg/:recipe_idx", (req, res) => {
  const recipe_idx = req.params.recipe_idx;

  const sqlQuery = `SELECT recipe_img, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6, recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.status(500).send("데이터 조회 오류");
      return;
    }

    // 파일 이미지 전송
    if (result.length > 0) {
      const recipe_img = result[0].recipe_img;
      if (recipe_img) {
        const imagePath = `${recipe_img}`;
        fs.readFile(imagePath, (error, data) => {
          if (error) {
            console.log("이미지 파일 읽기 오류", error);
            res.status(500).send("이미지 파일 읽기 오류");
            return;
          }
          const imageData = data.toString("base64");
          // console.log(imageData);
          const response = {
            recipe_img: imageData,
          };
          res.send(response);
        });
      } else {
        res.status(404).send("이미지 파일이 존재하지 않습니다.");
      }
    } else {
      res.status(404).send("데이터가 존재하지 않습니다.");
    }
  });
});

// recipe_img_1 전송...
router.get("/api/recipehelperimgfirst/:recipe_idx", (req, res) => {
  const recipe_idx = req.params.recipe_idx;

  const sqlQuery = `SELECT recipe_img_1 FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.status(500).send("데이터 조회 오류");
      return;
    }

    if (result.length > 0) {
      const recipe_img_1 = result[0].recipe_img_1;
      if (recipe_img_1) {
        const imagePath = `${recipe_img_1}`;
        fs.readFile(imagePath, (error, data) => {
          if (error) {
            console.log("이미지 파일 읽기 오류", error);
            res.status(500).send("이미지 파일 읽기 오류");
            return;
          }
          const imageData = data.toString("base64");
          console.log(imageData);
          res.send(imageData);
        });
      } else {
        res.status(404).send("이미지 파일이 존재하지 않습니다.");
      }
    } else {
      res.status(404).send("데이터가 존재하지 않습니다.");
    }
  });
});

router.get("/api/recipehelperimgtestcode/:recipe_idx", (req, res) => {
  const recipe_idx = req.params.recipe_idx;

  const sqlQuery = `SELECT recipe_img, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6, recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10 FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.status(500).send("데이터 조회 오류");
      return;
    }

    const imageColumns = [
      "recipe_img",
      "recipe_img_1",
      "recipe_img_2",
      "recipe_img_3",
      "recipe_img_4",
      "recipe_img_5",
      "recipe_img_6",
      "recipe_img_7",
      "recipe_img_8",
      "recipe_img_9",
      "recipe_img_10",
    ];

    const imageData = {};

    imageColumns.forEach((column) => {
      const image = result[0][column];
      if (image) {
        const imagePath = `${image}`;
        const data = fs.readFileSync(imagePath);
        const base64Image = data.toString("base64");
        imageData[column] = base64Image;
      }
    });

    res.send(imageData);
  });
});

// ===================================================================================================================================================================================================
// 테스트 함수
// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================
// router.get("/api/recipehelpertest/:recipe_idx", (req, res) => {
//     const recipe_idx = req.params.recipe_idx;

//     const sqlQuery = `SELECT recipe_img, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6, recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
//     db.query(sqlQuery, (err, result) => {
//       if (err) {
//         console.log("데이터 조회 오류", err);
//         res.status(500).send("데이터 조회 오류");
//         return;
//       }

//       // 파일 이미지 전송
//       if (result.length > 0) {
//         const recipe_img = result[0].recipe_img;
//         if (recipe_img) {
//           const imagePath = `${recipe_img}`;
//           fs.readFile(imagePath, (error, data) => {
//             if (error) {
//               console.log("이미지 파일 읽기 오류", error);
//               res.status(500).send("이미지 파일 읽기 오류");
//               return;
//             }
//             const imageData = data.toString("base64");
//             console.log(imageData);
//             const response = {
//               recipe_img: imageData,
//             };
//             res.send(response);
//           });
//         } else {
//           res.status(404).send("이미지 파일이 존재하지 않습니다.");
//         }
//       } else {
//         res.status(404).send("데이터가 존재하지 않습니다.");
//       }
//     });
// });
// ===================================================================================================================================================================================================
// ===================================================================================================================================================================================================
router.get("/api/recipehelperimgtest/:recipe_idx", (req, res) => {
  // 전달받은 리스트의 인덱스
  const recipe_idx = req.params.recipe_idx;

  const sqlQuery = `SELECT *, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("데이터 조회 오류", err);
      res.status(500).send("데이터 조회 오류");
      return;
    }

    // 특정 컬럼 값 추출
    const recipeStuff = result.length > 0 ? result[0].recipe_stuff : null;
    console.log("recipe_stuff 값:", recipeStuff);

    // 레시피 재료를 배열로 변환
    const recipeStuffArray = recipeStuff ? recipeStuff.split("/") : [];
    console.log("recipe_stuff_array 값:", recipeStuffArray);
    console.log("데이터 전송 성공, 데이터 개수:", result.length);

    // 이미지 데이터 추출 및 결과에 추가
    if (result.length > 0) {
      const imageBuffer = result[0].recipe_img;
      if (imageBuffer) {
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        result[0].recipe_img = base64Image;
        // 클라이언트로 결과 및 이미지 데이터 전송
        res.send({
          result: result,
          recipeStuffArray: recipeStuffArray,
        });
      } else {
        res.status(404).send("이미지 데이터가 존재하지 않습니다.");
      }
    } else {
      res.status(404).send("데이터가 존재하지 않습니다.");
    }
  });
});
