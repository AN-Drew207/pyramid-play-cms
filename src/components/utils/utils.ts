import axios from "axios";

export const getBalances = async () => {
  return (await axios.get("/user/balances")).data;
};

export const chargeCard = async ({ card }: any) => {
  try {
    var instance = axios.create({
      baseURL: "https://api.sandbox.checkout.com",
      headers: {
        Authorization: "pk_sbox_qvj56ybbof2mksrnbnsn53jyeqo",
        "Content-Type": "application/json",
      },
    });

    console.log("chargeCard inside");

    const res = await instance.post("/tokens", card, {
      headers: {
        Authorization: "pk_sbox_qvj56ybbof2mksrnbnsn53jyeqo",
        "Content-Type": "application/json",
      },
    });

    return res.data.token;
  } catch (err) {
    console.log(err);
    return false;
  }
};
