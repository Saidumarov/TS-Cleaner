export const Api = {
  page: 1,
  limit: 10,
  ownerEmail: JSON.parse(localStorage.getItem("tokenData"))?.email,
  token: JSON.parse(localStorage.getItem("tokenData"))?.access_token,
};
