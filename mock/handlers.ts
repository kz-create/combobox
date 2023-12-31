import { rest } from "msw";

const allList = [
  {
    name: "営業本部",
    category: "部門",
  },
  {
    name: "開発本部",
    category: "部門",
  },
  {
    name: "管理本部",
    category: "部門",
  },
  {
    name: "補助科目 その1",
    category: "補助科目",
  },
  {
    name: "採用",
    category: "部門",
  },
  {
    name: "その他",
    category: "部門",
  },
];

const departmentList = [
  {
    name: "営業本部",
    category: "部門",
  },
  {
    name: "開発本部",
    category: "部門",
  },
  {
    name: "管理本部",
    category: "部門",
  },
  {
    name: "採用",
    category: "部門",
  },
  {
    name: "その他",
    category: "部門",
  },
];

const subjectList = [
  {
    name: "補助科目 その1",
    category: "補助科目",
  },
];

export const handlers = [
  rest.get(`/lists`, async (req, res, ctx) => {
    const category = req.url.searchParams.get("category") || "";
    const keyword = req.url.searchParams.get("keyword") || "";

    if (category === "部門") {
      return res(
        ctx.json(departmentList.filter((v) => v.name.includes(keyword)))
      );
    } else if (category === "補助科目") {
      return res(ctx.json(subjectList.filter((v) => v.name.includes(keyword))));
    }

    return res(ctx.json(allList.filter((v) => v.name.includes(keyword))));
  }),
  rest.get(`/categories`, async (_req, res, ctx) => {
    const categories = ["部門", "補助科目"];
    return res(ctx.json(categories));
  }),
];
