/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useCategoryList, useCompletionList } from "./useCompletionList";
import { ListResponse } from "./useCompletionList";

export const ComboBox = () => {
  const [userInput, setUserInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [list, setList] = useState<ListResponse[]>([]);
  const [confirmedValue, setConfirmedValue] = useState<ListResponse>({
    name: "",
    category: "",
  });
  const { data, isListLoading } = useCompletionList(searchCategory, searchKey);
  const { category, isCategoryLoading } = useCategoryList();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const element = document.getElementById("input-field");

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleFocus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    element?.focus();
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSearchCategory(newValue);
  };

  useEffect(() => {
    setList(data ? data : []);
  }, [data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 確定後、再入力があった際はリセットする
    if (confirmedValue.name && confirmedValue.category) {
      setConfirmedValue({
        name: "",
        category: "",
      });
    }
    setUserInput(e.target.value);
    setSearchKey(e.target.value);
  };

  return (
    <>
      <TextField
        id="input-field"
        multiline
        rows={2}
        maxRows={2}
        onClick={handleClick}
        value={userInput}
        onChange={onChange}
      />
      {isListLoading || isCategoryLoading ? (
        <CircularProgressWrapper>
          <StyledCircularProgress />
        </CircularProgressWrapper>
      ) : (
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <StyledPaper elevation={3}>
            <StyleTabs
              value={searchCategory}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: "none", backgroundColor: "none" },
              }}
            >
              <StyledTab
                disableRipple
                disableFocusRipple
                value=""
                label="全て"
                onClick={handleFocus}
              />
              {category?.map((item, index) => {
                if (item !== confirmedValue.category) {
                  return (
                    <StyledTab
                      key={index}
                      disableRipple
                      disableFocusRipple
                      value={item}
                      label={item}
                      onClick={handleFocus}
                    />
                  );
                }
              })}
            </StyleTabs>
            <TextWrapper>
              入力を続けると
              {!searchCategory ? "" : searchCategory + "から"}
              検索されます
            </TextWrapper>
            <MenuList>
              {list.length !== 0 ? (
                list.map((item, index) => {
                  if (item.category !== confirmedValue.category) {
                    return (
                      <StyledMenuItem
                        key={index}
                        value={item.name}
                        onClick={() => {
                          setUserInput(item.name);
                          // 入力値で絞り込まないように、検索用の値を初期化する
                          setSearchCategory("");
                          setSearchKey("");
                          setConfirmedValue(item);
                          element?.focus();
                        }}
                      >
                        <StyledDiv>
                          <span style={{ width: "250px" }}>{item.name}</span>
                          <>{item.category}</>
                        </StyledDiv>
                      </StyledMenuItem>
                    );
                  }
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  検索結果が見つかりません
                </div>
              )}
            </MenuList>
          </StyledPaper>
        </Popper>
      )}
    </>
  );
};

const TextWrapper = styled.div`
  border-top: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
  text-align: left;
  padding-top: 4px;
  padding-left: 16px;
  padding-bottom: 4px;
  font-size: 12px;
  color: #1e90ff;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyleTabs = styled(Tabs)`
  &.MuiTabs-root {
    min-height: 30px;
    margin: 4px 4px;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  :hover {
    background-color: #0066ff;
    color: #ffffff;
  }
`;

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    width: 500px;
    min-height: 300px;
    .MuiCircularProgress-root {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const CircularProgressWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 999;
`;

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  left: 60%;
  top: 60%;
`;

const StyledTab = styled(Tab)`
  &.MuiTab-root {
    width: fit-content;
    min-width: 40px;
    min-height: 30px;
    color: black;
    padding: 4px 8px;
    font-size: 14px;
    border-top: 3px solid #33cc33;
    border-radius: 3px;
    background-color: #99ff99;
    margin-right: 4px;
    opacity: 0.7;
  }

  &.Mui-selected {
    color: black;
    border-top: 3px solid #33cc33;
    opacity: 1;
  }
`;
