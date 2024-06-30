import { useNavigate } from "react-router-dom";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/users";

import style from './CheckOtpForm.module.css'

function CheckOtpForm({ setStep, mobile, code, setCode }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["Profile"], getProfile);
  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      console.log(response);
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };

  return (
    <form onSubmit={submitHandler} className={style.form} >
      <p> تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={style.backButton} >تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOtpForm;
 