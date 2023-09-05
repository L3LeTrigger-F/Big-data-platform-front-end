import request from "@/utils/request";
import { EvidenceData } from "./types";

export const defaultEvidenceData: EvidenceData = {
  id: 0,
  status: "draft",
  title: "",
  fullContent: "",
  abstractContent: "",
  sourceURL: "",
  imageURL: "",
  timestamp: "",
  platforms: ["a-platform"],
  disableComment: false,
  importance: 0,
  author: "",
  reviewer: "",
  type: "",
  pageviews: 0,
  src_id: "",
  dst_id: "",
  yu: "",
  type1: "",
  type2: "",
  type3: "",
  name1: "",
  result: ""
};

export const getEvidences = (params: any) =>
  request({
    url: "/show",
    method: "get",
    params
  });

// export const getEvidence = (id: number, params: any) =>
//   request({
//     url: `/Evidences/${id}`,
//     method: "get",
//     params
//   });

export const createEvidence = (data: any) =>
  request({
    url: "/new",
    method: "post",
    data
  });

export const updateEvidence = (data: any) =>
  request({
    url: "/modify",
    method: "post",
    data
  });

export const deleteEvidence = (params: any) =>
  request({
    // url: `/Evidences/${id}`,
    url: "/delete",
    method: "delete",
    params
  });

export const getPageviews = (params: any) =>
  request({
    url: "/pageviews",
    method: "get",
    params
  });
