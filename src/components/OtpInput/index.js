// import { CFormInput, CInputGroup } from '@coreui/react';
// import React, { useState } from 'react'

// const OtpInput = () => {
//     const [otp, setOtp] = useState();
//     const handleChange = (value) => {
//         console.log("value >>", value);
//         setOtp(value)
//     }
//     console.log('otp >>', otp)
//     return (
//         <div className="otp-input-wrapper">
//             <CInputGroup>
//                 <CFormInput
//                     type="text"
//                     maxLength={1}
//                     className="otp-input"
//                     // value={otp[0]}
//                     onChange={(e) => handleChange(e.target.value)}
//                 />
//                 <CFormInput
//                     type="text"
//                     maxLength={1}
//                     className="otp-input"
//                     // value={otp[1]}
//                     onChange={(e) => handleChange(e.target.value)}
//                 />
//                 <CFormInput
//                     type="text"
//                     maxLength={1}
//                     className="otp-input"
//                     // value={otp[2]}
//                     onChange={(e) => handleChange(e.target.value)}
//                 />
//                 <CFormInput
//                     type="text"
//                     maxLength={1}
//                     className="otp-input"
//                     // value={otp[3]}
//                     onChange={(e) => handleChange(e.target.value, 3)}
//                 />
//             </CInputGroup>
//         </div>

//     )
// }

// export default OtpInput;

import { CFormInput, CInputGroup } from '@coreui/react';
import React, { useState } from 'react';

const OtpInput = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];  
        newOtp[index] = value;    
        setOtp(newOtp);      
    };

    console.log("otp >>",otp.join(""));
    return (
        <div className="otp-input-wrapper">
            <CInputGroup>
                {otp.map((value, index) => (
                    <CFormInput
                        key={index}
                        type="text"
                        maxLength={1}
                        className="otp-input"
                        value={value} 
                        onChange={(e) => handleChange(e.target.value, index)} 
                        autoFocus={index === 0} 
                    />
                ))}
            </CInputGroup>
        </div>
    );
};

export default OtpInput;
