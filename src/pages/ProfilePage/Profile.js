import React, { useState, useEffect } from 'react';
import './ProfileStyles.css';
import SideBar from '../../components/Bar.js'
import DateInput from '../../components/DateInput.js'
import { useNavigate } from 'react-router-dom';
import {GetUserInfor, UpdateUserProfile, Logout} from '../Interface.js'

import InputFormProfile from '../../components/Inputs/InputProfile';


function LoadProfilePage() {
    const [loginStatus, setLoginStatus] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        avatar: null,
        tempAvatar: null,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postCode: '',
        email: '',
        phone: '',
        dob: ''
    });
    
    
    useEffect(() => {
    
        const fetchData = async () => {
            if (loginStatus) {
                try {
                    const data = await GetUserInfor();
                    // Update the profile state with the fetched data
                    setProfile(prevProfile => ({ 
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        postCode: data.postcode,
                        phone: data.phone,
                        avatar : data.avatar,
                        dob: data.dob ? new Date(data.dob) : prevProfile.dob
                        // Add other fields as needed
                    }));
                    //console.log(profile.avatar);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    navigate('/login');
                }
            }
            
        };
    
        fetchData();
    }, []);
            
    

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const handleAvatarChange = (event) => {
        
        const file = event.target.files[0];
        if (file) {
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prevProfile => ({ ...prevProfile, tempAvatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const saveChanges = () => {
         if (profile.tempAvatar) {
            localStorage.setItem('avatar', profile.tempAvatar);
           setProfile(prevProfile => ({ ...prevProfile, avatar: profile.tempAvatar}));
         }
         let formattedDob;
         if (profile.dob) {
            formattedDob = formatDate(profile.dob);
         } else {
            formattedDob = null;
         }
         localStorage.setItem('userName', profile.firstName);
         
         //console.log(profile.avatar);
         UpdateUserProfile(profile, formattedDob);
         handleEditToggle();
    };

    const navigate = useNavigate();

    const handleLogInClick = () => {
        setLoginStatus(false);
        navigate("/login");
        Logout().then(data => {
            if (data) {
                navigate("/login", {replace: true});
            } else {  
            }
        })
        
        
    };

    const handleResetClick = () => {
        navigate("/reset");
    };

    return (
        <div className="parent">
            <div className='div1'>
                <SideBar />
            </div>
            <div className="div2 d-flex align-items-center justify-content-center">
                <form className="content">
                    <div className="text-center mb-4">
                        <img src={isEditing && profile.tempAvatar ? profile.tempAvatar : profile.avatar} alt="Avatar" className="rounded-circle profile-avatar" />
                        {isEditing && (
                            <div>
                                <input type="file" onChange={handleAvatarChange} />
                            </div>
                        )}
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <InputFormProfile inputTitle="First Name" inputContent={profile.firstName} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, firstName: value }))} isEditing={isEditing} />
                        </div>
                        <div className='col-md-6'>
                            <InputFormProfile inputTitle="Last Name" inputContent={profile.lastName} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, lastName: value }))} isEditing={isEditing} />
                        </div>
                    </div>
                    <InputFormProfile inputTitle="Address" inputContent={profile.address} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, address: value }))} isEditing={isEditing} />
                    <div className="row">
                        <div className='col-md-4'>
                            <InputFormProfile inputTitle="City" inputContent={profile.city} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, city: value }))} isEditing={isEditing} />
                        </div>
                        <div className='col-md-4'>
                            <InputFormProfile inputTitle="State" inputContent={profile.state} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, state: value }))} isEditing={isEditing} />
                        </div>
                        <div className='col-md-4'>
                            <InputFormProfile inputTitle="Post Code" inputContent={profile.postCode} inputType="text" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, postCode: value }))} isEditing={isEditing} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <InputFormProfile inputTitle="Email" inputContent={profile.email} inputType="email" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, email: value }))} isEditing={isEditing} isProfileEmail={true}/>
                        </div>
                        <div className='col-md-6'>
                            <InputFormProfile inputTitle="Phone" inputContent={profile.phone} inputType="tel" setInputContent={value => setProfile(prevProfile => ({ ...prevProfile, phone: value }))} isEditing={isEditing} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <DateInput
                                inputTitle="Date of Birth"
                                selectedDate={profile.dob}
                                setSelectedDate={date => setProfile(prevProfile => ({ ...prevProfile, dob: date }))}
                                isEditing={isEditing}
                            />
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-3 d-flex flex-column">
                                <label className="form-label">Password</label>
                                <button className="btn btn-link reset-pass" onClick={handleResetClick}>Click to reset password</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex profile-btns">
                        <button
                            type="button"
                            className="btn btn-primary rounded-5 change-color-btn"
                            onClick={isEditing ? saveChanges : handleEditToggle}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button className="btn" onClick={handleLogInClick}>Log out</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoadProfilePage;
