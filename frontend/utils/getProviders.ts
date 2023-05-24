import axios from "axios";

async function getProviders() {
  const res = await axios.get("http://207.246.105.204:4041/api/v1/providers");
  return res.data;
}

export default getProviders;
