import { useEffect, useState } from "react";
import Layout from "../../src/componnents/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../src/redux/alertSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

export const Userlist = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/admin/get-all-user",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
        toast.success(response.data.message);
      }
      window.location.reload;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const usercolumns = [
    {
      title: "Name",
      id: "username",
    },
    {
      title: "Email",
      id: "email",
    },
    {
      title: "Doctor",
      id: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Action",
      id: "action",
      render: () => (
        <div>
          <button>Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <p className="text-3xl font-bold font-serif">User List </p>
      <table className="min-w-full divide-y divide-gray-200 rounded-xl mt-6 ">
        <thead className="bg-gray-300">
          <tr>
            {usercolumns.map((user) => (
              <th
                key={user.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {user.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((userd, userIndex) => (
            <tr key={userIndex}>
              {usercolumns.map((column) => (
                <td
                  key={`${userd.index}-${column.id}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {userd[column.id]}
                  {column.id === "action" || column.id === "isDoctor"
                    ? column.render("", userd)
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
