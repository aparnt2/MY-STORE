import "./Loader.css";

function Loader({ fullscreen = false }) {
  return (
    <div className={fullscreen ? "loader-wrapper fullscreen" : "loader-wrapper"}>
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
