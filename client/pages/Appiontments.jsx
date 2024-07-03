import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../src/componnents/Layout";
 const Appiontments = () => {
  const [appointments, setAppointments] = useState([]);
  const columns = [
    {
      title: "Id",
      id: "_id",
    },
    {
      title: "Date & Time ",
      id: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("HH:mm")} &nbsp
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      id: "status",
    },
  ];
  const getData = async () => {
    try {
      const response = await axios.get("/api/user/user-appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        setAppointments(response.data.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Layout>
        <div className="p-4">
          <p className="text-3xl font-bold font-serif">Appointments List</p>
          <table className="min-w-full divide-y   mt-6  shadow-lg">
            <thead className="bg-gray-300 ">
              <tr>
                {columns.map((list) => (
                  <th
                    key={list.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-xl "
                  >
                    {list.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {appointments.map((appointmentd, appointmentIndex) => (
                <tr key={appointmentIndex}>
                  {columns.map((column) => (
                    <td
                      key={`${column.index}-${column.id}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-xl"
                    >
                      {appointmentd[column.id]}
                      {column.id === "action"
                        ? column.render("", appointmentd)
                        : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};
export default Appiontments;