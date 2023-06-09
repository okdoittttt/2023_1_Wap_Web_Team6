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
    res.send('Hello, community');
});

  
// =================================================================
// 게시글 리스트 불러오기
router.get("/api/list", (req, res) => {
    const sqlQuery = "SELECT board_idx, title, members, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date, boardstyle FROM board ORDER BY board_idx desc;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
    });
});


// =================================================================
// 리스트 검색
router.get("/api/search/:keyword", (req, res) => {

    const keyword = req.params.keyword;

    const sqlQuery = `SELECT board_idx, title, members, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date, boardstyle FROM board WHERE title LIKE '%${keyword}%';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            res.result(500).send("데이터 조회 오류");
            return;
        }

        console.log("데이터 전송 성공, 데이터 개수:", result.length)
        res.send(result);
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });
});

// =================================================================
// 게시글 업로드 처리
router.post('/api/upload', function (req, res) {

    const title = req.body.title;
    // const members = req.body.members;
    const members = req.body.members;
    const content = req.body.content;
    const boardstyle = req.body.boardstyle;

    const query = `INSERT INTO board (title, members, content, boardstyle) VALUES (?,?,?,?);`;
    const values = [
        title, members, content, boardstyle
    ];
    const sendData = { isSuccess: "" };

    db.query(query, values, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생";
        } else {
            sendData.isSuccess = "True";
            console.log("게시판 업로드 완료.");
        }
    })

    // 업로드 완료 시 동작할 코드 작성
    res.send('게시판 업로드 완료.');
});

// =================================================================
// 게시판 상세 구현
router.get("/api/board/:board_idx", (req, res) => {

    // const recipe_idx = 1;
    const board_idx = req.params.board_idx;

    const sqlQuery = `SELECT *, DATE_FORMAT(create_date, '%Y-%m-%d/%H:%i') AS create_date FROM board WHERE board_idx = '${board_idx}';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            res.result(500).send("데이터 조회 오류");
            return;
        }

        console.log("데이터 전송 성공, 데이터 개수:", result.length)
        res.send(result);
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });
});

// =================================================================
// 게시판 삭제 구현
router.post("/api/boardDelete", (req, res) => {

    // const recipe_idx = 1;
    const board_idx = req.body.board_idx;
    const members = req.body.members;
    const sendData = { isSuccess: "" };

    const sqlQuery = `select members from board where board_idx = '${board_idx}';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            sendData.isSuccess = "게시글 삭제 오류"
            res.send(sendData);
        } 
        const membersWithoutQuotes = result[0].members.replace(/"/g, "");
        if(membersWithoutQuotes === members) {
        const sqlQuery2 = `DELETE from board where board_idx = '${board_idx}';`;
        db.query(sqlQuery2, (err, result) => {
            if (err) {
                console.log("데이터 삭제 오류", err);
                sendData.isSuccess = "게시글 삭제 오류"
                res.send(sendData);
            } 
            sendData.isSuccess = "True";
            console.log(board_idx, '게시글 삭제 완료')
            res.send(sendData);  
        })
        } else {
            sendData.isSuccess = "만드신 분이 아닙니다!!";
            res.send(sendData);
        }
    }); 
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });




// =================================================================
// 유저 확인 구현
router.post("/api/infoCheck", (req, res) => {
    // const recipe_idx = 1;
    const board_idx = req.body.board_idx;
    const members = req.body.members;
    const sendData = { isSuccess: "" };
    console.log(board_idx,members);

    const sqlQuery = `select members from board where board_idx = '${board_idx}';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            sendData.isSuccess = "게시글 삭제 오류"
            res.send(sendData);
        } 
        const membersWithoutQuotes = result[0].members.replace(/"/g, "");
        if(membersWithoutQuotes === members) {
            sendData.isSuccess = "True";
            res.send(sendData);  
        } else {
            sendData.isSuccess = "만드신 분이 아닙니다!!";
            res.send(sendData);
        }
    }); 
});

// =================================================================
// 게시글 업로드 처리
router.post('/api/boardModify', function (req, res) {

    const board_idx = req.body.board_idx;
    const title = req.body.title;
    const members = req.body.members;
    const content = req.body.content;
    const boardstyle = req.body.boardstyle;

    const query = `UPDATE board SET title ='${title}', content='${content}', boardstyle='${boardstyle}' WHERE board_idx =${board_idx}`;
    const sendData = { isSuccess: "" };

    db.query(query, function (error, result, fields) {
        if (error) {
            console.error("데이터 수정 오류", error)
            sendData.isSuccess = "데이터 수정 오류 발생";
        } else {
            sendData.isSuccess = "True";
            console.log("게시판 수정 완료.");
        }
    })
    res.send('게시판 업로드 완료.');

    // 업로드 완료 시 동작할 코드 작성x
});