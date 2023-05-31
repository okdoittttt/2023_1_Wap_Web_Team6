import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import Btn from "../UI/Btn";
import RecipeSeq from "../components/RecipeSeq";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../components/type";

const RegisterContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  //height: 35rem;
  margin: 2rem auto;
  display: flex;
  padding: 3rem;
`;
const AdditionBtn = styled(Btn)`
padding: 5px;
font-size: 14px;
`;
const Title = styled.div`
font-size: 24px;
margin-bottom: 20px;
margin-right: auto;
font-weight: var(--Bold-font);
display: flex;
margin-top: 3rem;
`;
const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
  border-radius: 3px;
  width: 20rem;
  margin-bottom: 0.5rem;
`;
const Textarea = styled.textarea`
font-size: 16px;
border: 1px solid var(--gray-color);
border-radius: 3px;
padding: 5px;
width: 20rem;
height: 5rem;
`;
const Label = styled.label`
font-size: 1rem;
margin-right: 3rem;
`;

const Select = styled.select``;

const FormItem = styled.div`
 flex-direction: column;
 margin-bottom: 1rem;
`;
const DetailDiv = styled.div`
    margin-bottom: 2rem;
    width: 320px;
`;
const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RegisterBtn = styled(Btn)`
  display: flex;
  margin: auto;
`;

const RecipeRegister = () => {
    const navigate = useNavigate();

    const [countList, setCountList] = useState([0])
    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    const [recipe_img, setRecipe_Img] = useState<File[]>([]);

    const [registerData, setRegisterData] = useState({
        recipe_title: "null", // 레시피 제목
        recipe_stuff: "null", // 요리 재료
        foodstyle: "null", // 음식 종류(한,중,일,양)
        //recipe_img: Array(11).fill("null"), // 이미지 배열
        members: "작성자",

        recipe_step_1: "null", // 요리순서 소제목 1~10
        recipe_step_2: "null",
        recipe_step_3: "null",
        recipe_step_4: "null",
        recipe_step_5: "null",
        recipe_step_6: "null",
        recipe_step_7: "null",
        recipe_step_8: "null",
        recipe_step_9: "null",
        recipe_step_10: "null",

        rd_1: "null", // 요리순서 상세설명 1~10 
        rd_2: "null",
        rd_3: "null",
        rd_4: "null",
        rd_5: "null",
        rd_6: "null",
        rd_7: "null",
        rd_8: "null",
        rd_9: "null",
        rd_10: "null",

        timer_rd_1: "null", // 타이머 1~10
        timer_rd_2: "null",
        timer_rd_3: "null",
        timer_rd_4: "null",
        timer_rd_5: "null",
        timer_rd_6: "null",
        timer_rd_7: "null",
        timer_rd_8: "null",
        timer_rd_9: "null",
        timer_rd_10: "null"
    })

    // const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     const file = e.target.files?.[0];

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onloadend = () => {
    //             const imageUrl = reader.result as string;

    //             setRegisterData((prevData) => {
    //                 const updatedImgs = [...prevData.recipe_img];
    //                 updatedImgs[index] = imageUrl;

    //                 return {
    //                     ...prevData,
    //                     recipe_img: updatedImgs,
    //                 };
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const updatedImgs = [];
            for (let i = 0; i < files.length; i++) {
                updatedImgs.push(files[i]);
            }
            setRecipe_Img(updatedImgs);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    

    const registerBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const formData = new FormData();

        recipe_img.forEach((img) => {
            formData.append("recipe_img", img);
        });
        Object.entries(registerData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch("http://localhost:8081/board/api/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            navigate("/recipe_list");
            console.log("게시물 등록 성공");
            console.log(registerData);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Title>레시피 등록</Title>
            <RegisterContainer>
                <form encType="multipart/form-data" method="POST">
                    <FormItem>
                        <Label>레시피 제목</Label>
                        <Input
                            type="text"
                            name="recipe_title"
                            placeholder="레시피 제목을 입력해주세요."
                            onChange={handleValueChange}
                            required
                        />
                    </FormItem>

                    <FormItem>
                        <Label>카테고리</Label>
                        <Select name="foodstyle" onChange={handleValueChange}>
                            <option value="한식">한식</option>
                            <option value="중식">중식</option>
                            <option value="일식">일식</option>
                            <option value="양식">양식</option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Label>요리 재료</Label>
                        <Textarea
                            name="recipe_stuff"
                            placeholder="요리 재료를 입력해주세요."
                            onChange={handleValueChange}
                            required
                        />
                    </FormItem>

                    <FormItem>
                        <Label>요리 이미지</Label>
                        <Input
                            type="file"
                            name="recipe_img"
                            onChange={(e) => handleImgUpload(e)}
                            required
                        />
                    </FormItem>

                    <Label>요리 순서</Label>
                    <CreateListDiv>
                        <RecipeSeq countList={countList} handleImgUpload={handleImgUpload} handleValueChange={handleValueChange} />
                        <Btn onClick={onAddDetailDiv}>
                            순서 추가
                        </Btn>
                    </CreateListDiv>
                </form>
            </RegisterContainer>
            <RegisterBtn onClick={registerBtnClick}>등록하기</RegisterBtn>
        </>
    );
};

export default RecipeRegister;