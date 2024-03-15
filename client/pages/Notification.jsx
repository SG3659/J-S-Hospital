import Layout from "../src/componnents/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../src/redux/alertSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/mark-all-notification-seen", {
        userId: user._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong ", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold font-serif">Notification</h1>
      <hr className="border-black"></hr>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="flex justify-end">
            <h1 className="anchor" onClick={markAllAsSeen}>
              Marked all As Seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div
              key={notification.index}
              className="p-2"
              onClick={() => navigate("/admin/doctors")}
            >
              <div className="border border-solid border-black p-1 rounded-xl ">
                {notification.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="flex justify-end">
            <h1 className="anchor">Delete all</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div key={notification.index} className="">
              <div>{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
