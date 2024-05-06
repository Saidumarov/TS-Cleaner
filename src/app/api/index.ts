const tokenDataString = localStorage.getItem("tokenData");
const tokenData = tokenDataString ? JSON.parse(tokenDataString) : null;

export const Api = {
  page: 1,
  limit: 10,
  ownerEmail: tokenData?.email || null,
  token: tokenData?.access_token || null,
};
