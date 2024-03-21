import { useEffect, useState } from "react";
import Layout from "../../src/componnents/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
const Profile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const getdocData = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/get-doctor-info",
        { userId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setDoctor(response.data.data);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdocData();
  }, []);

  return (
    <Layout>
      <h1>Doctor-Profile</h1>
    </Layout>
  );
};

export default Profile;
