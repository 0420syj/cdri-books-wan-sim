import React from "react";
import IconBook from "./assets/icon-book";
import LikeLine from "./assets/like-line";
import LikeFill from "./assets/like-fill";
import SearchBox from "./assets/search-box";

export type IconKey = "icon-book" | "like-line" | "like-fill" | "search-box";

type ISvgIconMapper = {
  [key in IconKey]?: {
    path: React.ReactNode;
    viewBox: string;
  };
};

export const svgIconMapper: ISvgIconMapper = {
  "icon-book": {
    path: <IconBook />,
    viewBox: "0 0 80 80",
  },
  "like-line": {
    path: <LikeLine />,
    viewBox: "0 0 24 24",
  },
  "like-fill": {
    path: <LikeFill />,
    viewBox: "0 0 24 24",
  },
  "search-box": {
    path: <SearchBox />,
    viewBox: "0 0 30 30",
  },
};

export const iconKeyList = Object.keys(svgIconMapper) as IconKey[];
