import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center  ">
      <div className="loader"></div>
      <p className="text-bg-Dark text-lg font-semibold ">Loading...</p>
    </div>
  );
};

export default Spinner;
