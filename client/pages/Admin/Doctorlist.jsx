import { useEffect, useState } from "react";
import Layout from "../../src/componnents/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../src/redux/alertSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
export const Doctorlist = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctor", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const statusHandler = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/admin/change-Account-status",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const doctorcolumns = [
    {
      title: "Name",
      id: "firstName",
    },
    {
      title: "Specialization",
      id: "specialization",
    },
    {
      title: "Status",
      id: "status",
    },
    {
      title: "Action",
      id: "action",
      render: (text, record) => (
        <div>
          {record.status === "pending" ? (
            <button onClick={() => statusHandler(record, "approved")}>
              Approved
            </button>
          ) : (
            <button onClick={() => statusHandler(record, "reject")}>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <p className="text-3xl font-bold font-serif">Doctors List</p>
      <table className="min-w-full divide-y divide-gray-200 shadow-lg mt-6 ">
        <thead className="bg-gray-300">
          <tr>
            {doctorcolumns.map((doctor) => (
              <th
                key={doctor.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-xl"
              >
                {doctor.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doctors.map((doctord, doctorIndex) => (
            <tr key={doctorIndex}>
              {doctorcolumns.map((column) => (
                <td
                  key={`${doctord.index}-${column.id}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-xl"
                >
                  {doctord[column.id]}
                  {column.id === "action" ? column.render("", doctord) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
