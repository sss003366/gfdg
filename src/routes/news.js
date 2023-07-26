import { Router } from "express";

import axios from "axios";
import cheerio from "cheerio";

const router = Router();

router.get("/", async (_, res) => {
  const url = "https://news.naver.com/main/ranking/popularDay.naver";

  try {
    const context = new Array();
    const { data: pageBinaryData } = await axios.get(url, {
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });
    const textDecoder = new TextDecoder("euc-kr");
    const html = textDecoder.decode(pageBinaryData);

    // suap
    const $ = cheerio.load(html);
    // suap finder
    const newsList = $(".rankingnews_list > li");
    newsList.each((_, news) => {
      const title = $(news).find("div > a").text();
      const link = $(news).find("div > a").attr("href");
      context.push({ title, link });
    });

    res.render("news", { context });
  } catch (error) {
    console.log(error);
  }
});
export default router;
