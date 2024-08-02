import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../src/redux/alertSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../src/redux/userSlice";
import Layout from "../src/componnents/Layout";
const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notification-seen",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong ", error);
    }
  };
  const markAllAsDelete = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notification-delete",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong ", error);
    }
  };
  return (
    <>
      <Layout>
        <div className="p-4">
          <h1 className="text-3xl font-bold font-serif">Notification</h1>
          <hr className="border-black"></hr>
          <Tabs>
            <Tabs.TabPane tab="Unseen" key={0}>
              <div className="flex justify-end cursor-pointer">
                <h1 className="anchor" onClick={markAllAsSeen}>
                  Marked all As Seen
                </h1>
              </div>
              {user?.unseenNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={"p-2 cursor-pointer"}
                  onClick={
                    user?.isAdmin ? () => navigate("/admin/doctors") : ""
                  }
                >
                  <div className="border border-solid border-black p-1 rounded-xl ">
                    {notification.message}
                  </div>
                </div>
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="seen" key={1}>
              <div className="flex justify-end cursor-pointer">
                <h1 className="anchor" onClick={markAllAsDelete}>
                  Delete all
                </h1>
              </div>
              {user?.seenNotifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-2  cursor-pointer"
                  onClick={
                    user?.isAdmin
                      ? () => navigate("/admin/doctors")
                      : () => navigate("/")
                  }
                >
                  <div className="border border-solid border-black p-1 rounded-xl ">
                    {notification.message}
                  </div>
                </div>
              ))}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default Notification;
