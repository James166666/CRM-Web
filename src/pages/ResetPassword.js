import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import SideBar from '../components/Bar.js'
import InputForm from '../components/Inputs/Input.js'
import './ProfilePage/ProfileStyles.css';
import './ResetPasswordStyles.css'
import { Reset_Passowrd } from "./Interface.js";


function LoadResetPage() {

    /* navigation */
    const navigate = useNavigate();

    const handleResetClick = () => {
        navigate("/login");
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    /* check old password */
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [oldPaErrorMessage, setOldPaErrorMessage] = useState('');
    const [newPaErrorMessage, setNewPaErrorMessage] = useState('');
    const [rePaErrorMessage, setRePaErrorMessage] = useState('');
    /* helper func */
    const handlePasswordCheck = () => {
        if (newPassword !== reEnteredPassword) {
            setOldPaErrorMessage('ALL_RED');
            setNewPaErrorMessage('New passwords are inconsistent');
        } else if (newPassword === '') {
            setNewPaErrorMessage('New passwords must be enter');
            //setReEnteredPaErrorMessage('Please enter a new password');
        } else {
            if (newPassword.length >= 6) {
                Reset_Passowrd(oldPassword, newPassword, 'profile', '').then(data => {
                    if (data === true) {
                        navigate('/login');
                        console.log('Reset Success!');
                    } else {
                        setOldPaErrorMessage('Old password is incorrect')
                        console.log('Reset Fail');
                      
                    }
                  })
            } else {
                setNewPaErrorMessage("Password must made up of more than six digits of numbers, letters, symbols")
            }
            
                
            
            /* setErrorMessage(''); */
            /* Proceed with other logic, e.g., API call to update the password */
        }
    };

    // const checkOldPass = () => {
    //     if (oldPaErrorMessage) {
    //         return (
    //             <div style={{ display: 'flex', alignItems: 'center' }}>
    //                 <PriorityHighRoundedIcon fontSize="small" style={{ color: 'red' }} />
    //                 <span style={{ color: 'red' }}>{oldPaErrorMessage}</span>
    //             </div>
    //         );
    //     }
         
    //     return null;
    // };
    // const checkNewPass = () => {
    //     if (newPaErrorMessage) {
    //         return (
    //             <div style={{ display: 'flex', alignItems: 'center' }}>
    //                 <PriorityHighRoundedIcon fontSize="small" style={{ color: 'red' }} />
    //                 <span style={{ color: 'red' }}>{newPaErrorMessage}</span>
    //             </div>
    //         );
    //     }
         
    //     return null;
    // };

    return (

        <div className="parent">
            <div className='div1'>
                <SideBar />
            </div>

            <div className="div2 d-flex">
                <div className="content">
                    <div className="header">
                        <h1 className="title loginTitle1">Reset Password</h1>
                    </div>
                    <div className='d-flex flex-column'>
                    <div>
                        <InputForm
                            inputTitle="Enter Old Password"
                            inputType="password"
                            value={oldPassword}
                            onChange={e => {setOldPassword(e.target.value);
                                            if (oldPaErrorMessage){
                                                setOldPaErrorMessage('');
                                            }
                                        }}
                            error = {oldPaErrorMessage}
                        />

                    </div>

                    <div>
                        <InputForm
                            inputTitle="Re-enter Old Password"
                            inputType="password"
                            value={newPassword}
                            onChange={e => {setNewPassword(e.target.value);
                                            if (newPaErrorMessage){
                                                setNewPaErrorMessage('');
                                            }setOldPaErrorMessage('');}}
                            error={newPaErrorMessage}
                        />
                    </div>

                    <InputForm
                        inputTitle="enter New Password"
                        inputType="password"
                        value={reEnteredPassword}
                        onChange={e => {setReEnteredPassword(e.target.value);
                                            if (newPaErrorMessage){
                                                setNewPaErrorMessage('');
                                        } setOldPaErrorMessage('');}}
                        error={newPaErrorMessage}
                    />
                    </div>
                   
                    <div className="d-flex reset-btns align-items-end">
                        <button className='btn reset-btn' onClick={handleProfileClick}>Cancel</button>
                        <button className='btn reset-btn rounded-5 btn-edit change-color-btn' onClick={handlePasswordCheck}>Confirm</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

function checkOldPassword() {
    
}

export default LoadResetPage;
