import { rest } from "msw";

function sleep(msec: number) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(0);
    }, msec);
  });
}

const allList = [
  "営業本部",
  "採用本部",
  "開発本部",
  "管理本部",
  "補助科目 その1",
  "採用",
  "その他",
];

const departmentList = [
  "営業本部",
  "採用本部",
  "開発本部",
  "管理本部",
  "採用",
  "その他",
];

const subjectsList = ["補助科目 その1"];

export const handlers = [
  rest.get(`/lists`, async (req, res, ctx) => {
    const category = req.url.searchParams.get("category") || "";

    if (category === "all") {
      return res(ctx.json(allList));
    } else if (category === "部門") {
      return res(ctx.json(departmentList));
    } else if (category === "補助科目") {
      return res(ctx.json(subjectsList));
    }

    return res();
  }),
  rest.get(`/categories`, async (req, res, ctx) => {
    const categories = ["部門", "補助科目"];
    return res(ctx.json(categories));
  }),
];
