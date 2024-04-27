
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
const DoctorAppiontments = () => {
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
    {
      title: "Actions",
      id: "action",
      render: (text, record) => (
        <div>
          {record.status === "pending" && (
            <div className="flex fl">
              <button onClick={() => statusHandler(record, "approved")}>
                Approved
              </button>
              <button onClick={() => statusHandler(record, "reject")}>
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  const getData = async () => {
    try {
      const response = await axios.get("/api/doctor/doctor-appointment", {
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

  const statusHandler = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/doctor/docupdate-status",
        {
          appointmentsId: record._id,
          status,
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
  return (
    <div className="p-4">
      <p className="text-3xl font-bold font-serif">Doctor Appointments List</p>

      <table className="min-w-full divide-y divide-gray-200 rounded-xl mt-6 shadow-lg">
        <thead className="bg-gray-300">
          <tr>
            {columns.map((list) => (
              <th
                key={list.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-xl"
              >
                {list.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {appointments.map((appointment, appointmentIndex) => (
            <tr key={appointmentIndex}>
              {columns.map((column) => (
                <td
                  key={`${column.id}-${appointmentIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-xl"
                >
                  {appointment[column.id]}
                  {column.id === "action" ? column.render("", appointment) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppiontments;
