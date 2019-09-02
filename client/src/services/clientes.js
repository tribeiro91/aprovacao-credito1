import { request } from "../utils/api";

export const list = () => {
  return request({
    method: "get",
    baseUrl: "public",
    route: "cliente",
  });
};

export const get = (id) => {
  return request({
    method: "get",
    baseUrl: "public",
    route: `cliente/${id}`,
  });
};

export const create = payload => {
  return request({
    method: "post",
    baseUrl: "public",
    route: "cliente",
    payload
  });
};

export const update = (id, payload) => {
  return request({
    method: "put",
    baseUrl: "public",
    route: `cliente/${id}`,
    payload
  });
};

export const destroy = id => {
  return request({
    method: "delete",
    baseUrl: "public",
    route: `cliente/${id}`,
  });
};
