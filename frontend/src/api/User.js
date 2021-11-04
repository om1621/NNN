import axios from "axios";

export default axios.create({
  baseURL: "https://nut-games.herokuapp.com/user",
});
