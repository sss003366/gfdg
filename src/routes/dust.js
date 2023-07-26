import { Router } from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = Router();

router.get("/", async function (req, res) {
  //파라미터 설정
  const url =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
  const serviceKey = "본인 인증키";
  const returnType = encodeURI("xml");
  const numOfRows = encodeURI("100");
  const pageNo = encodeURI("1");
  const sidoName = encodeURI("대구");
  const ver = encodeURI("1.0");

  //파라미터를 query로 변환
  queryParams = "?" + encodeURI("serviceKey") + "=" + serviceKey;
  queryParams += "&" + encodeURI("returnType") + "=" + returnType;
  queryParams += "&" + encodeURI("numOfRows") + "=" + numOfRows;
  queryParams += "&" + encodeURI("pageNo") + "=" + pageNo;
  queryParams += "&" + encodeURI("sidoName") + "=" + sidoName;
  queryParams += "&" + encodeURI("ver") + "=" + ver;

  console.log("queryParams: ", queryParams);

  try {
    var context = new Array();
    //axios로 HTTP GET 요청
    const result = await axios.get(url + queryParams);
    //응답 데이터 저장
    const xml = result.data;
    //cheerio 객체 생성
    const $ = cheerio.load(xml);
    //태그가 item인 모든 항목 추출
    const itemList = $("item");
    //전체 item 항목에서 측정소, 미세먼지, 초미세먼지 값 추출
    itemList.each(function (index, item) {
      let stationName = $(item).find("stationName").text();
      let pm10Value = $(item).find("pm10Value").text();
      let pm25Value = $(item).find("pm25Value").text();
      //추출된 데이터를 JSON 형식의 배열에 저장
      context.push({
        stationName: stationName,
        pm10Value: pm10Value,
        pm25Value: pm25Value,
      });
    });
    res.render("dust", { context: context });
  } catch (error) {
    console.log(error);
  }
});

export default router;
