import React, { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { RecipeSeqProps } from "../components/type"

const DetailDiv = styled.div`
    margin-bottom: 2rem;
    width: 320px;
`;
const Textarea = styled.textarea`
    font-size: 16px;
    border: 1px solid var(--gray-color);
    border-radius: 3px;
    padding: 5px;
    width: 25rem;
    height: 5rem;
`;
const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
  border-radius: 3px;
  width: 25rem;
  margin-bottom: 0.5rem;
`;
const SeqData = styled.div`
  margin-bottom: 3rem;  
`;
const TimerContainer = styled.div`
  margin-top: 1rem;  
  display: flex;
`;

const RecipeSeq = (props: RecipeSeqProps) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

    const checkedItemHandler = (index: number, isChecked: boolean) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = isChecked;
        setCheckedItems(updatedCheckedItems);
      };

    return (
        <DetailDiv>
            {props.countList && props.countList.map((item, i) => (
                <SeqData key={i}>
                    <label>소제목</label>
                    <Input
                        type="text"
                        name={`recipe_step_${i + 1}`}
                        placeholder="요리 순서에 대한 소제목을 입력해주세요."
                        onChange={props.handleValueChange}
                        required
                    />
                    <label>상세 설명</label>
                    <Textarea
                        placeholder="요리 순서에 대한 설명을 적어주세요."
                        name={`rd_${i + 1}`}
                        onChange={props.handleValueChange}
                        required
                    />
                    <input type="file"
                    name="recipe_img"
                    onChange={(e) => props.handleImgUpload(e)}
                    />

                    <TimerContainer>
                        <div>
                            <input
                            type="checkbox"
                            checked={checkedItems[i] || false}
                            onChange={(e) => checkedItemHandler(i, e.target.checked)}
                            />
                            <label>타이머</label>
                        </div>
                        {checkedItems[i] && (<Input 
                        type="text"
                        placeholder="분" 
                        name={`timer_rd_${i + 1}`}
                        onChange={props.handleValueChange}
                        style={{ marginLeft: "1rem", width: "5rem" }} />)}

                    </TimerContainer>
                </SeqData>
            ))}
        </DetailDiv>
    )
}

export default RecipeSeq