import { useEffect } from "react";
import axios from "axios";
import Layout from "../src/componnents/Layout";
const Home = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
};

export default Home;
