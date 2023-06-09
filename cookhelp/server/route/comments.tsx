const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../lib/db.tsx');
const sessionOption = require('../lib/sessionOption.tsx');

// router
const router = express.Router();
module.exports = router;

router.use(bodyParser.json({
    limit : "50mb"
}))
router.use(bodyParser.urlencoded({extended:true}))
// router.use(express.json({
//     limit : "50mb"
// }));
router.use(bodyParser.urlencoded({
    limit:"50mb",
    extended: false
}));
router.use(cors());

router.get('/', (req, res) => {
    const sqlQuery = `SELECT * FROM comments`;

    db.query(sqlQuery, (err, result) => {
    if(err) {
      console.log("데이터 조회 오류", err);
      res.result(500).send("데이터 조회 오류");
      return;
    }
    res.send(result) 
  })
});

// =================================================================
// 게시판 상세 구현
router.get("/api/cmtList/:board_idx", (req, res) => {

    // const recipe_idx = 1;
    const board_idx = req.params.board_idx;

    const sqlQuery = `SELECT *, DATE_FORMAT(create_date, '%Y-%m-%d/%H:%i:%s') AS create_date FROM comments WHERE board_idx = '${board_idx}';`;
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

// =================================================================
// 댓글 업로드 처리
router.post('/api/upload', function (req, res) {
    const sendData = { isSuccess: "" };
    var members = req.body.members;
    const comments_content = req.body.CmtContent;
    const pwd = req.body.CmtPassword;
    const board_idx = req.body.board_idx;
    if(members === undefined || members.length === 0 || members === "") {
        members = "익명";
    } else {
        members = req.body.members
    }
    if(req.body.CmtContent === undefined || req.body.CmtContent === "") {
        sendData.isSuccess = "내용이 없습니다.";
        res.send(sendData);
    }
    if(req.body.CmtPassword === undefined || req.body.CmtPassword === "") {
        sendData.isSuccess = "비번이 없습니다.";
        res.send(sendData);
    }
    
    const query = `INSERT INTO comments (members, comments_content, board_idx, pwd) VALUES (?,?,?,?);`;
    const values = [
        members, comments_content, board_idx, pwd
    ];

    db.query(query, values, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생";
        } else {
            sendData.isSuccess = "True";
            console.log("댓글 업로드 완료.");
            res.send(sendData);
        }
    })

    // 업로드 완료 시 동작할 코드 작성
});


// =================================================================
// 게시판 삭제 구현
router.post("/api/commentsDelete", (req, res) => {

    // const recipe_idx = 1;
    const comments_idx = req.body.comments_idx;
    const pwd = req.body.pwd;
    const mem = req.body.members;
    const sendData = { isSuccess: "" };
    console.log(pwd, mem);

    const sqlQuery = `select pwd,members from comments where comments_idx = '${comments_idx}';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            sendData.isSuccess = "댓글 삭제 오류!"
            res.send(sendData);
        } 
        const re_pwd = result[0].pwd.replace(/"/g, "");
        const re_members = result[0].members.replace(/"/g, "");
        if(re_pwd === pwd) {
            if(re_members ===  mem || re_members === "익명"){
                const sqlQuery2 = `DELETE from comments where comments_idx = '${comments_idx}';`;
                db.query(sqlQuery2, (err, result) => {
                    if (err) {
                        console.log("데이터 삭제 오류", err);
                        sendData.isSuccess = "게시글 삭제 오류"
                        res.send(sendData);
                    } 
                    sendData.isSuccess = "True";
                    console.log(comments_idx, '댓글 삭제 완료')
                    res.send(sendData);  
                })
            } else {
                sendData.isSuccess = "작성자가 아닙니다.";
                res.send(sendData);
            }
        } else {
            sendData.isSuccess = "비밀번호가 틀렸습니다.";
            res.send(sendData);
        }
    }); 
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });


