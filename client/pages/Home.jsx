import { useEffect } from "react";
import axios from "axios";
const Home = () => {
  const getData = async () => {
    try {
      const response = await axios.post("/api/user/get-user-info-by-id",{}, {
        headers: {
          Authentication : "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>Home</div>;
};

export default Home;
