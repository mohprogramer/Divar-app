import style from "./Loader.module.css";

function Loader() {
  return (
    <div className={style.container}>
      <span className={style.loader}></span>
    </div>
  );
}

export default Loader;
