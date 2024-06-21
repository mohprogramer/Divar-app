import { useState } from "react";
import CheckOtpForm from "../components/templates/CheckOtpForm";
import SendOtpForm from "../components/templates/SendOtpForm";

function AuthPage() {

    const [step, setStep] = useState(1)
    const [mobile, setMobile] = useState(1)
    const [code, setCode] = useState(1)

    return (
        <div>
            {step == 1 && <SendOtpForm /> }
            {step == 2 && <CheckOtpForm /> }
        </div>
    );
}

export default AuthPage;