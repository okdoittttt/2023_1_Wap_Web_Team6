import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import searchLogo from "../assets/searchLogo.png";
import RecipeItem from "../components/RecipeItem";
import { fetchRecipeList, searchData } from "../components/type";
// import searchTmpData from "../tmpDB/tmpRecipeListDB";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Btn from "../UI/Btn";
import Pagination from "../components/Pagination";

const RecipeListContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  height: 40rem;
  margin-bottom: 5rem;
  display: flex;
`;
const StyleSearchLogo = styled.div`
  width: 34px;
  padding-left: 0.5rem;
  padding-top: 1rem;
`;
const LogoImg = styled.img`
  width: 100%;
  cursor: pointer;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const SearchInput = styled.input`
  margin-top: 0.5rem;
`;
const ListBox = styled.div`
  background-color: var(--light-gray-color);
  width: 90%;
  height: 500px;
`;
const RegisterBtn = styled(Btn)`
  margin-left: auto;
  margin-right: 5rem;
`;
const StyleBtnContainer = styled.div`
  position: relative;
  /* left: 12rem; */
  top: 4rem;
  display: flex;
  gap: 0.7rem;
`;
const ItemBtn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--green-color)" : "var(--light-gray-color)"};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  position: relative;
  left: 18rem;
`;

const RecipeList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let genreName = searchParams.get("genreName");
  const [listData, setListData] = useState([]);
  const foodStyle = ["전체", "한식", "중식", "일식", "양식"];
  const [clickedCategory, setClickCategory] = useState(
    genreName ? genreName : "전체"
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [keyword, setKeyword] = useState("");
  // const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8081/board/api/list");
        const data = await res.json();

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }
        // console.log("data : ", data);

        clickedCategory === "전체"
          ? setListData(data)
          : setListData(
              data.filter(
                (item: fetchRecipeList) => item.foodstyle === clickedCategory
              )
            );
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchData();
    // console.log(listData);
  }, [clickedCategory]);

  const handleFoodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCategory(e.currentTarget.name);
  };

  const RecipeSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/board/api/search/${keyword}`
      );
      const data = await res.json();
      console.log(keyword);
      console.log(data);
      if (!res.ok) {
        console.log("error : ", data.description);
        return;
      }

      setListData(data);
    } catch (error) {
      console.log("Error!", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <Navbar />
      <StyleBtnContainer>
        {foodStyle.map((elm, idx) => {
          return (
            <ItemBtn
              type="button"
              key={idx}
              onClick={handleFoodClick}
              name={elm}
              isActive={clickedCategory === elm}
            >
              {elm}
            </ItemBtn>
          );
        })}
      </StyleBtnContainer>
      <RecipeListContainer>
        <LogoBox>
          <SearchInput
            placeholder="레시피 검색"
            onChange={handleInputChange}
          ></SearchInput>
          <StyleSearchLogo>
            <LogoImg src={searchLogo} onClick={RecipeSearch}></LogoImg>
          </StyleSearchLogo>
        </LogoBox>
        <ListBox>
          {listData.slice(offset, offset + limit).map((ele: searchData) => {
            // console.log(ele.recipe_idx);
            return (
              <RecipeItem
                key={ele.recipe_idx}
                to={`/recipe_detail/${ele.recipe_idx}`}
                RecipeId={ele.recipe_idx}
                RecipeTitle={ele.recipe_title}
                RecipeWriter={ele.members}
                RecipeDate={ele.created_date}
              />
            );
          })}
        </ListBox>
        <Pagination
          totalPage={listData.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <RegisterBtn onClick={() => navigate("/recipe_register")}>
          레시피 등록
        </RegisterBtn>
      </RecipeListContainer>
    </>
  );
};

export default RecipeList;
