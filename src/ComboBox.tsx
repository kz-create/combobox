/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { tabValueAtom } from "./store";
import { useSetRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
// import useAutocomplete, {
//   AutocompleteGetTagProps,
// } from "@mui/base/Autocomplete";
import Paper from "@mui/material/Paper";
import { useRecoilState } from "recoil";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useCategoryList, useCompletionList } from "./useCompletionList";
import { ListResponse } from "./useCompletionList";

function getRandomColor() {
  const get256 = () => {
    return Math.floor(Math.random() * 256);
  }; // 0 ~ 255を返す
  let [r, g, b] = [get256(), get256(), get256()]; // ランダムでRGBカラーを設定
  let color = `rgb(${r}, ${g}, ${b})`; // 文字列生成 'rgb(XX, XXX, XXX)'
  return color;
}

export const ComboBox = () => {
  const [userInput, setUserInput] = useState("");
  const lastUserInput = useRef("");
  const [searchCategory, setSearchCategory] = useState("");
  const [list, setList] = useState<ListResponse[]>([]);
  const [categoryState, setCategoryState] = useState<string[]>([]);
  const { data, listError, isListLoading } = useCompletionList(
    searchCategory,
    userInput
  );
  const { category, categoryError, isCategoryLoading } = useCategoryList();

  const [tabVal, setTabVal] = useRecoilState(tabValueAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const setTabValue = useSetRecoilState(tabValueAtom);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSearchCategory(newValue);
  };

  const CustomMuiTab = styled(MuiTab)`
    &.MuiTab-root {
      width: fit-content;
      min-width: 40px;
      min-height: 30px;
      color: black;
      padding: 4px 8px;
      font-size: 14px;
      border-top: 3px solid;
      border-radius: 3px;
      margin-right: 4px;
      opacity: 0.8;
    }

    &.Mui-selected {
      color: black;
      border-top: 3px solid;
      opacity: 1;
    }
  `;

  console.log("data: ", data);
  useEffect(() => {
    if (userInput.length > 0) {
      if (data?.some((v) => v.name.includes(userInput))) {
        const newList = data.filter((v) => v.name.includes(userInput));
        setList(newList);
      } else {
        setList([]);
      }
    } else {
      const newList = data ? data?.map((v) => v) : [];
      setList(newList);
    }
  }, [data]);

  // useEffect(() => {
  //   if (!data) return;
  //   if (data.length === 1 && userInput.length > lastUserInput.current.length) {
  //     // キーボード選択用: もし、検索候補が1件しかない場合は先頭一致でその要素が選択されたものとする。表示も更新する。
  //     setUserInput(String(data[0]));
  //     lastUserInput.current = String(data[0]);
  //     setConfirmedValue(String(data[0]));
  //   } else {
  //     // キーボード選択用: 正確に一致するものが候補にあればその要素が選択されたものとする
  //     const found = data.find((v) => String(v) === userInput);
  //     if (found !== undefined) {
  //       setConfirmedValue(String(found));
  //     }
  //   }
  // }, [userInput, data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    lastUserInput.current = userInput; // 最後の入力をとっておく
    setUserInput(e.target.value);
    if (list.some((v) => v.name.includes(e.target.value))) {
      const newList = list.filter((v) => v.name.includes(e.target.value));
      setList(newList);
    }
  };
  console.log("list: ", list);
  console.log(userInput);

  return (
    <>
      <TextField
        // multiline
        // rows={2}
        // maxRows={2}
        // minRows={2}
        onClick={handleClick}
        value={userInput}
        onChange={onChange}
      />
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        {isListLoading || isCategoryLoading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={3} sx={{ width: "500px", maxHeight: "500px" }}>
            <MuiTabs
              value={searchCategory}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: "none", backgroundColor: "none" },
              }}
              sx={{ minHeight: "30px", marginBottom: "4px" }}
            >
              <CustomMuiTab
                disableRipple
                disableFocusRipple
                value=""
                label="全て"
              />
              {category?.map((item) => (
                <CustomMuiTab
                  disableRipple
                  disableFocusRipple
                  value={item}
                  label={item}
                />
              ))}
            </MuiTabs>
            <div
              style={{
                borderTop: "solid #a9a9a9",
                borderBottom: "solid #a9a9a9",
                textAlign: "left",
                paddingLeft: "16px",
                fontSize: "12px",
                color: "#1e90ff",
              }}
            >
              入力を続けると
              {!searchCategory ? "" : searchCategory + "から"}
              検索されます
            </div>
            <MenuList>
              {list.length !== 0 ? (
                list.map((item) => (
                  <MenuItem
                    value={item.name}
                    onClick={() => {
                      setUserInput(item.name);
                    }}
                  >
                    <StyledDiv>
                      <span style={{ width: "250px" }}>{item.name}</span>
                      <>{item.category}</>
                    </StyledDiv>
                  </MenuItem>
                ))
              ) : (
                <span style={{ textAlign: "center" }}>
                  <text>検索結果が見つかりません</text>
                </span>
              )}
            </MenuList>
          </Paper>
        )}
      </Popper>
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
`;
