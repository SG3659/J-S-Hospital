import React from "react";
import "./header.css";
import Coursel from "../../utils/Coursel";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)

  return (
    <div className="top_container">
      <div className="header_container">
        <div className="wrapper">
          <h1 className="tagline_container">
            <span className="tagline_heading">"J&S Hospital"</span>
            &nbsp;
            <span className="tagline_inner">Your Trusted Healthcare</span>
          </h1>
          <h3 className="base_line_container">
            <span className="base_line_upper">
              <span className="base_line_name">J&S Medical </span> brings
              together is a state-of-the-art facility dedicated to providing
              comprehensive healthcare services with compassion and expertise.
            </span>

            <span className="base_line_lower">
              Our team of skilled professionals is committed to delivering
              personalized care tailored to each patient's needs. At J&S, we
              prioritize your well-being, ensuring a harmonious journey towards
              optimal health and wellness.
            </span>
          </h3>
        </div>
      </div>

      <div className="cta_button">
        {user?.isAdmin ? (
          ""
        ) : user?.isDoctor ? (
          ""
        ) : (
          <button
            className="btn primary sm"
            onClick={() => navigate("/doctorlist")}
          >
            Doctors-List
          </button>
        )}
      </div>

      <div className="coursel">
        <Coursel />
      </div>
    </div>
  );
}
