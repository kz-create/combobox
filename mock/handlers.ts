import { rest } from "msw";

function sleep(msec: number) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(0);
    }, msec);
  });
}

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
    const input = req.url.searchParams.get("input") || "";

    if (category === "部門") {
      return res(
        ctx.json(departmentList.filter((v) => v.name.includes(input)))
      );
    } else if (category === "補助科目") {
      return res(ctx.json(subjectList.filter((v) => v.name.includes(input))));
    }

    return res(ctx.json(allList.filter((v) => v.name.includes(input))));
  }),
  rest.get(`/categories`, async (req, res, ctx) => {
    const categories = ["部門", "補助科目"];
    return res(ctx.json(categories));
  }),
];
