// export interface RecipeListType {
//   id: number;
//   ListNum: number;
//   pic: string;
//   detail: string;
//   stepTitle: string;
//   timer?: number;
// }

export interface Card {
  listNums: number;
  pic: string | null;
  detail: string | null;
  timer: number | null;
}

export interface fetchRecipeCardsProps {
  listNums: number;
  pic: string | null;
  title: string | null;
  detail: string | null;
  timer: number | null;
}

export interface StepItemProps {
  card: fetchRecipeCardsProps;
}

// export interface RecipeCard {
//   id: number;
//   RecipeName: string;
//   FoodType: string;
//   cards: RecipeListType[];
//   Ingredient: string[];
// }

export interface CardProps {
  currentCard: Card;
}

export interface ArrowButtonProps {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

export interface searchData {
  recipe_idx: number;
  img?: string;
  recipe_title: string;
  members: string;
  created_date: string;
  views?: number;
}

export interface RecipeItemProps {
  RecipeId: number;
  RecipeTitle: string;
  RecipeWriter: string;
  RecipeDate: string;
  to: string;
}

export interface fetchRecipeList {
  created_date: string;
  foodstyle: string;
  members: string;
  recipe_idx: number;
  recipe_title: string;
}

export interface ListProps {
  stepDetail: string;
  listNum: number;
  setSelectIdx: React.Dispatch<React.SetStateAction<number>>;
}

export interface RecipeSeqProps {
  countList: number[];
  handleImgUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export interface PaginationProps {
  totalPage: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface DeckData {
  [key: string]: string | null;
}

export interface fetchBoardList {
  create_date: string;
  boardstyle: string;
  members: string;
  board_idx: number;
  title: string;
}

export interface boardsearchData {
  board_idx: number;
  title: string;
  members: string;
  create_date: string;
  boardstyle: string;
  views?: number;
}

export interface BoardItemProps {
  BoardIdx: number;
  BoardTitle: string;
  BoardWriter: string;
  BoardDate: string;
  BoardStyle: string;
  to: string;
}

export interface BoardSeqProps {
  countList: number[];
  handleImgUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export interface boardsearchData {
  board_idx: number;
  title: string;
  members: string;
  create_date: string;
  boardstyle: string;
  views?: number;
}

export interface CommentItemProps {
  Cmtidx: number;
  CmtComment: string;
  CmtWriter: string;
  CmtDate: string;
  CmtPassword: string;
  BoardIdx: number;
}
export interface cmtData {
  comments_idx: number;
  board_idx: number;
  members: string;
  comments_content: string;
  create_date: string;
  pwd: string;
}

export interface fetchCmtList {
  comments_idx: number;
  board_idx: number;
  members: string;
  comments_content: string;
  create_date: string;
  pwd: string;
}

export interface PostData {
  recipe_idx: number;
  recipe_title: string;
}
