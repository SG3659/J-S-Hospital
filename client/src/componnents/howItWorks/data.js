import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
const data = [
  {
    id: 1,
    logo: FaLock,
    title: "Login",
    desc: "Built a web app where users can list flats with vacant rooms or find partners to share the same room. The app includes functionaliti",
  },

  {
    id: 2,
    logo: FaUser,
    title: "User-Profile",
    desc: "Browse available doctors and their schedules.Receive notifications regarding their appointment. ",
  },

  {
    id: 3,
    logo: MdAnalytics,
    title: "Admin-Profile",
    desc: "Admin Manages doctor and user profile Generate reports and insigth.",
  },
  {
    id: 4,
    logo: FaCalendarDays,
    title: "Doctor-Profile",
    desc: "Doctor manage the appointment.Mansgae and Sechdule the avalability.Update apoointment status.",
  },
];

export default data;
