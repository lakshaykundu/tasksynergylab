import "./Skeleton.css";
const Skeleton = ({ width, height }) => {
  const style = {
    width: width || "100%",
    height: height || "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    margin: "10px 0",
  };

  return <div className="skeleton" style={style}></div>;
};

export default Skeleton;
