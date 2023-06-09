import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import { ListProps, DeckData, Card } from "../components/type";
import RecommendCard from "../components/RecommendCard";
import { Form, useParams } from "react-router-dom";

const Wrap = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  /* @media screen and (max-width: 800px) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  } */
`;

const RightSideBar = styled.div`
  background-color: var(--light-gray-color);

  max-width: 250px;
  width: 25%;
  margin: 0;

  /* @media screen and (max-width: 800px) {
    max-width: 100%;
    width: 600px;
    max-height: 50%;
    height: 150px;
  } */
`;
const LeftSideBar = styled.div`
  background-color: var(--dark-green-color);
  color: white;
  width: 25%;
  max-width: 250px;
`;
const ListTitle = styled.ol`
  font-weight: var(--Bold-font);
  font-size: 18px;
  margin: 1rem 1rem;
`;
const StyledList = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  list-style-type: decimal;
  cursor: pointer;
  /* padding-left: 1rem; */
`;
const Main = styled.div`
  background-color: var(--mint-color);
  width: 50%;
`;
const IngredientItem = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  list-style: none;
  padding-left: 1rem;
`;
const Footer = styled.footer`
  background-color: var(--green-color);
  color: white;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  width: 1500px;
  max-width: 90%;
  height: 190px;
`;

const List = ({ stepDetail, listNum, setSelectIdx }: ListProps) => {
  const hadleListItem = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.value);
    setSelectIdx(e.currentTarget.value);
  };

  return (
    <StyledList key={listNum} value={listNum} onClick={hadleListItem}>
      {stepDetail}
    </StyledList>
  );
};

const Recipe = () => {
  const params = useParams();
  // console.log(params.recipe_idx);

  const [deck, setDeck] = useState();
  const [selectIdx, setSelectIdx] = useState<number>(1);
  const [recipeSteps, setRecipeSteps] = useState<string[]>([]);
  const [Ingredient, setIngredient] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [imageData, setImageData] = useState<string[]>([]);

  const addRecipeStep = (step: string | null) => {
    if (step == null) return;
    setRecipeSteps((prev) => [...prev, step]);
  };

  useEffect(() => {
    const fetchRecipeHelper = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/board/api/recipehelper/${params.recipe_idx}`
        );
        const data = await res.json();
        // console.log("data : ", data);

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }

        //데이터 저장
        setIngredient(data.recipeStuffArray);
        updateContent(data.result[0]);
        setDeck(data.result[0]);
        //slider에 보낼 card 변수
        const newGenerateCard = generateCards(data.result[0]);
        setCards(newGenerateCard);
      } catch (error) {
        console.log("Error!", error);
      }
    };
    const fetchImageDataFromBackend = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/board/api/recipehelperimg/${params.recipe_idx}`
        );
        if (!response.ok) {
          throw new Error("요청이 실패하였습니다.");
        }

        const data = await response.json();
        // console.log("data : ", data);
        const tmpImgArray = generateImgArray(data);
        setImageData(tmpImgArray);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRecipeHelper();
    fetchImageDataFromBackend();
  }, []);

  const updateContent = (deckData: DeckData) => {
    setRecipeSteps([]);

    Object.keys(deckData).forEach((key) => {
      //요리 순서(소제목) 배열에 저장
      if (key.startsWith("recipe_step") && deckData[key] !== null) {
        // console.log(deckData[key]);
        addRecipeStep(deckData[key]);
      }
    });
  };
  const generateCards = (deckData: DeckData) => {
    const newCards = [];
    for (let i = 1; i <= 10; i++) {
      const recipeImg = deckData[`recipe_img_${i}`];
      const rd = deckData[`rd_${i}`];
      const timerRd = deckData[`timer_rd_${i}`];

      if (recipeImg || rd || timerRd) {
        const card = {
          listNums: i,
          pic: recipeImg,
          detail: rd,
          timer: timerRd !== null ? parseInt(timerRd) : null,
        };
        newCards.push(card);
      }
    }

    return newCards;
  };
  const generateImgArray = (data: string[]) => {
    let newImgArray = [];
    for (let key in data) {
      // console.log("key : ", key);
      if (data.hasOwnProperty(key)) newImgArray.push(data[key]);
    }
    // console.log("newImgArray : ", newImgArray);
    return newImgArray;
  };

  let listContent = recipeSteps.map((step, idx) => (
    <List
      key={idx}
      stepDetail={step}
      listNum={idx + 1}
      setSelectIdx={setSelectIdx}
    />
  ));

  let IngredientContent = Ingredient.map((item, index) => (
    <IngredientItem key={index}>{item}</IngredientItem>
  ));

  // console.log("deck : ", deck);
  // console.log("listContent : ", listContent);
  // console.log(cards);
  // console.log(imageData);
  return (
    <>
      <NavBar />
      {/* {imageData.map((ele) => (
        <img src={`data:image/png;base64,${ele}`} alt="Backend Image" />
      ))} */}
      <Wrap>
        <RightSideBar>
          <ListTitle>요리 순서</ListTitle>
          {listContent}
        </RightSideBar>
        <Main>
          <Slider cards={cards} selectIdx={selectIdx} imgCard={imageData} />
          {/* {SliderContent} */}
        </Main>
        <LeftSideBar>
          <ListTitle>요리 재료</ListTitle>
          {IngredientContent}
        </LeftSideBar>
      </Wrap>
      <Footer>
        <RecommendCard />
      </Footer>
    </>
  );
};

export default Recipe;
