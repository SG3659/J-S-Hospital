import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const UDoctorlist = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.get("/api/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        setDoctors(response.data.data);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4">
      <p className="text-3xl font-bold font-serif">Doctors-List</p>
      <div className="flex flex-wrap gap-7 mt-4 shadow-lg rounded-lg">
        {doctors &&
          doctors.map((doctor, doctorIndex) => (
            <div
              key={doctorIndex}
              className="p-3 max-w-lg border rounded-xl cursor-pointer "
              onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
            >
              <div className="text-xl font-medium">
                Dr. {doctor.firstName} {doctor.lastName}
              </div>
              <div>
                <p>
                  <b>Profession</b>:{doctor.profession}
                </p>
                <p>
                  <b>Experience</b>: {doctor.experience}
                </p>
                <p>
                  <b>Fees Per Cunsaltation</b>: {doctor.feePerConsultation}
                </p>
                <p>
                  <b>Timings</b>: {doctor.fromTime} - {doctor.toTime}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UDoctorlist;
