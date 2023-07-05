/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { tabValueAtom } from "./store";
import { useSetRecoilState } from "recoil";

type TagProps = {
  list: string[];
};

function getRandomColor() {
  const get256 = () => {
    return Math.floor(Math.random() * 256);
  }; // 0 ~ 255を返す
  let [r, g, b] = [get256(), get256(), get256()]; // ランダムでRGBカラーを設定
  let color = `rgb(${r}, ${g}, ${b})`; // 文字列生成 'rgb(XX, XXX, XXX)'
  return color;
}

export const Tabs: React.FC<TagProps> = ({ list }) => {
  const [value, setValue] = React.useState(list[0]);
  const setTabValue = useSetRecoilState(tabValueAtom);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTabValue(newValue);
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

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      TabIndicatorProps={{
        style: { display: "none", backgroundColor: "none" },
      }}
      sx={{ minHeight: "30px", marginBottom: "4px" }}
    >
      {list.map((item) => (
        <CustomMuiTab
          disableRipple
          disableFocusRipple
          value={item}
          label={item}
          sx={{ backgroundColor: `${getRandomColor()}` }}
        />
      ))}
    </MuiTabs>
  );
};
