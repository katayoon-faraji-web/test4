import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAppSelector ,useAppDispatch } from "../../hooks/reduxHooks";
import { setOTP } from '../../redux/reducers/userInforSlice';
import '../../index.css'

function OTPInp() {
    const userInformation = useAppSelector((state) => state.userInfo)
    const dispatch = useAppDispatch()
    const [otpValue,otpValueSet] = useState<string>('')
  const [{ otp, numInputs, separator, minLength, maxLength, placeholder, inputType }, setConfig] = React.useState({
    otp: '',
    numInputs: 5,
    separator: '-',
    minLength: 0,
    maxLength: 40,
    placeholder: '',
    inputType: 'text' as const,
  });

  const handleOTPChange = (otp: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
    dispatch(setOTP(otp))
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleNumInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let numInputs = event.target.valueAsNumber;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;

      console.error(`Please enter a value between ${minLength} and ${maxLength}`);
    }

    setConfig((prevConfig) => ({ ...prevConfig, numInputs }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(otp);
  };

  return (

          <form onSubmit={handleSubmit} className='w-full flex justify-center items-center mt-4 h-[60px]'>
              <OtpInput
                inputStyle="inputStyle"
                numInputs={numInputs}
                onChange={handleOTPChange}
                renderSeparator={<span>{separator}</span>}
                value={otp}
                placeholder={placeholder}
                inputType={inputType}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
              />
          </form>

  );
}

export default OTPInp;