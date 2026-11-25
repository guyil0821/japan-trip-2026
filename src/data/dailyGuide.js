import { sightseeingStops, shoppingStops } from "./stops";
import { mapUrl } from "../utils/maps";

const guide = (city, weatherLocation, latitude, longitude, highlights, date) => ({
  city,
  weatherLocation,
  latitude,
  longitude,
  highlights,
  stops: [...(sightseeingStops[date] || []), ...(shoppingStops[date] || [])].map(stop => ({
    name: stop.name,
    openingHours: "请当天确认",
    mapUrl: mapUrl(stop.name),
    note: stop.goal,
  })),
});

export const dailyGuide = {
  "12/16": guide("成田", "成田", 35.7767, 140.3189, ["抵达成田", "入住酒店", "为旅程做好准备"], "12/16"),
  "12/17": guide("青森", "青森", 40.8222, 140.7474, ["搭乘新干线北上", "抵达青森", "青森站周边散步"], "12/17"),
  "12/18": guide("函馆", "函馆", 41.7688, 140.7288, ["函馆朝市", "漫步 Bay Area", "青森与函馆往返"], "12/18"),
  "12/19": guide("青森", "八甲田", 40.6583, 140.8583, ["八甲田雪景", "酸汤温泉", "返回关东"], "12/19"),
  "12/20": guide("横滨", "横滨", 35.4437, 139.6380, ["港未来散步", "横滨海边风景", "横滨购物"], "12/20"),
  "12/21": guide("东京", "东京", 35.6762, 139.6503, ["上野公园晨跑", "东京购物", "享受冬日城市漫步"], "12/21"),
  "12/22": guide("东京", "东京", 35.6762, 139.6503, ["新宿最后购物", "整理行李", "前往成田"], "12/22"),
  "12/23": guide("成田", "成田", 35.7767, 140.3189, ["前往成田机场", "搭乘返程航班", "结束日本旅程"], "12/23"),
};
