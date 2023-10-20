import axios from "axios";
import { defaultValue } from './default.js';

export async function Login(user_email, user_password) {
    let authentication_status = false;
    
    try {
        // connect to the backend and post the
        const response = await axios.post('http://127.0.0.1:8000/login/', {
            email: user_email,
            password: user_password
        });

        if (response.status === 201) {
            console.log("Login Success!");
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = 'Token ' + token;
            authentication_status = true; 
        } else {
            console.log("User Login Fail!");
            authentication_status = false;
        }
    } catch (error) {
        //console.error("Request Fail: ", error);
        authentication_status = false;
    }
    return authentication_status;

}

export async function Logout() {
    try {
        // Send a request to the backend to delete the token
        const response = await axios.post('http://127.0.0.1:8000/logout/');

        // If logout was successful on the backend
        if (response.status === 200) {
            console.log("Logout Success!");
            localStorage.removeItem('userName');
            localStorage.removeItem('avatar');
            // Remove the token from local storage
            localStorage.removeItem('token');

            // Remove the token from axios headers
            delete axios.defaults.headers.common['Authorization'];

            return true;
        } else {
            console.log("User Logout Fail!");
            return false;
        }
    } catch (error) {
        console.error("Logout Request Failed: ", error);
        return false;
    }
}


export async function Reset_Passowrd(old_password, new_password, type, email) {
    let success = false;
    var response2;
    axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
    try {
        if (type === 'profile') {
            response2 = await axios.put('http://127.0.0.1:8000/user/resetpassword/', {
                old_password: old_password,
                new_password: new_password,
            });
        } else {
            response2 = await axios.put('http://127.0.0.1:8000/user/resetpasswordWithoutOld/', {
                new_password: new_password,
                email : email
            });
        }
        
         if (response2.status === 201) {
             console.log("Reset Password Success!");
             success = true
         } else {
             console.log("User reset password Fail!");
             success = false
        } 
    }
     catch (error) {
        success = false;
        //console.error("Request Fail: ", error);
        
    }
    return success
}

export async function SignUp(firstName, lastName, email, user_password) {
    try {
        // Send a request to the backend
        const response = await axios.post('http://127.0.0.1:8000/user/', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            user_password: user_password
        });
        // If sign up was successful on the backend
        if (response.status === 201) {
            console.log("SignUp Success!");
            return "SUCCESS";
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("SignUp Fail with status: ", response.status);
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response.status === 400){
            return "BAD EMAIL";
        } else if (error.response.status === 500) {
            return "ALREADY EXIEST";
        }
        return false;
    }
}

export async function UpdateUserProfile(profile, newDate) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
    try {
        // Send a request to the backend
        const response = await axios.put('http://127.0.0.1:8000/user/profile/', {
            first_name: profile.firstName,
            last_name: profile.lastName,
            address : profile.address, 
            city : profile.city, 
            state : profile.state, 
            postcode : profile.postCode,
            phone : profile.phone, 
            dob: newDate,
            avatar: profile.tempAvatar
        });
        // If sign up was successful on the backend
        if (response.status === 201) {
            console.log("Update profile success!");
            if (profile.tempAvatar) {
                localStorage.setItem('avatar', profile.tempAvatar);
            };
            localStorage.setItem('userName', profile.firstName);
            return "SUCCESS";
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Update profile Fail with status: ", response.status);
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function UpdateContactTag(id, tags, idContact) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
    const full_url = 'http://127.0.0.1:8000/contacts/' + id + '/';
    console.log(tags);
    try {
        // Send a request to the backend
        const response = await axios.put(full_url, {
            // first_name : idContact.firstName,
            // last_name : idContact.lastName,
            // phone: idContact.phone,
            // address : idContact.address.street_address,
            // city : idContact.address.city,
            // state : idContact.address.state,
            // postcode : idContact.address.postcode,
            // gender : idContact.gender,
            // dob : idContact.dob,
            // avatar : idContact.avatar,
            tags : tags
        });
        // If sign up was successful on the backend
        if (response.data) {
            console.log("Update profile success!");
            return true;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Update profile Fail with status: ", response.status);
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}


export async function GetUserInfor() {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend and get the infor except avatar
        const response = await axios.get('http://127.0.0.1:8000/user/me/');
        if (response.data["avatar"]) {
            response.data["avatar"] = "data:image/png;base64," + response.data["avatar"];
        } else {
            response.data["avatar"] = "data:image/png;base64," + defaultValue
        }
        // If get user was successful on the backend
        if (response.status === 200) {
            console.log("Successly get user Infor!");
            localStorage.setItem('userName', response.data.first_name);
            localStorage.setItem('avatar', response.data.avatar);
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("GetUserInfor Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 403) {
            console.error("GetUserInfor Forbidden (403): ", error.response.data);
        } else {
            console.error("GetUserInfor Request Failed: ", error);
        }
        return false;
    }
}


export async function GetUserContact(firstName, lastName, email, user_password) {
    try {
        // Send a request to the backend
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/contacts/');
        for (let eachContact in response.data) {
            if (response.data[eachContact]["avatar"] === "https://github.com/ITProject-Thu-12pm/Assets/blob/main/broken_avatar.png?raw=true") {
                response.data[eachContact]["avatar"] = "data:image/png;base64," + defaultValue
            } else if (response.data[eachContact]["avatar"]) {
                response.data[eachContact]["avatar"] = "data:image/png;base64," + response.data[eachContact]["avatar"];
            } else {
                response.data[eachContact]["avatar"] = "data:image/png;base64," + defaultValue
            }
             
        }
        // If sign up was successful on the backend
        if (response.status === 201) {
            console.log("Successly get user Infor!");

            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Get Contact Fail with status: ", response.status);
        return null;
    } catch (error) {
        // Log different message based on the status code in error response.
    
    }
}

export async function addUserContact(firstName, lastName, tags, phone, email, streetAddress, city, state, postcode, dob, gender, avatar) {

    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        if (avatar === "https://github.com/ITProject-Thu-12pm/Assets/blob/main/broken_avatar.png?raw=true") {
            avatar = defaultValue
        }
        // Send a request to the backend
        const response = await axios.post('http://127.0.0.1:8000/contacts/', {
            first_name : firstName,
            last_name : lastName,
            tags : tags,
            phone: phone,
            email : email,
            address : streetAddress,
            city : city,
            state : state,
            postcode : postcode,
            gender : gender,
            dob : dob,
            avatar : avatar
        });
        // If sign up was successful on the backend
        if (response.status === 201) {
            console.log("Successly add contact Infor!");
            return true;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Add Contact Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        return false;
    
    }
}
export async function UpdatedContact(id, firstName, lastName, phone, email, streetAddress, city, state, postcode, dob, gender, avatar) {
    const full_url = 'http://127.0.0.1:8000/contacts/' + id + '/';
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend
        const response = await axios.put(full_url, {
            first_name : firstName,
            last_name : lastName,
            phone: phone,
            email : email,
            address : streetAddress,
            city : city,
            state : state,
            postcode : postcode,
            gender : gender,
            dob : dob,
            avatar : avatar
        });
        // If sign up was successful on the backend
        if (response.data) {
            console.log("Update contact success!");
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Update profile Fail with status: ", response.status);
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}
export async function DeleteUserContact(contacts) {
    var deleteAll;
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend
        for (let contact in contacts) {
            const id = contacts[contact]["id"];  
            console.log(id);  
            var url = 'http://127.0.0.1:8000/contacts/' + id + '/';
            const response = await axios.delete(url);
            if (response.status === 204) {
                console.log("Delete success!");
                continue;
            } else {
                console.log("Delete Fail");
            }
        }
        return true;
        
    } catch (error) {
        // Log different message based on the status code in error response.
    
    }
}

export async function addByEmail(email) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend
        const response = await axios.post('http://127.0.0.1:8000/contacts/', {
            email : email
        });

        // If sign up was successful on the backend
        if (response.status === 201) {
            console.log("Successly add contact Infor!");
            return response.status;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("Add Contact Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 500) {
            console.error("This email has not been registered.");
            return error.response.status
        }
        if (error.response && error.response.status === 400) {
            console.error("Invalid email format.");
            return error.response.status
        }
    }
}



export async function addEvent(eventData) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/event/', eventData);
        
        // Check if the request was successful
        if (response.status === 201) {
            console.log("Successfully added the event!");
            return true;
        } 

        console.log("Failed to add event with status:", response.status);
    } catch (error) {

        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function getEvent() {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend
        const response = await axios.get('http://127.0.0.1:8000/event/');

        // If sign up was successful on the backend
        if (response.status === 200) {
            console.log("Successly get event Info!");
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("getEvent Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 403) {
            console.error("getEvent Forbidden (403): ", error.response.data);
        } else {
            console.error("getEvent Request Failed: ", error);
        }
        return false;
    }
}

export async function updateEvent(eventData, id) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:8000/event/${id}/`, eventData);
        
        if (response.status === 200) {
            console.log("Successfully updated the event!");
            return true;
        } 

        console.log("Failed to update event with status:", response.status);
        return false;
    } catch (error) {
        console.error("Error updating event:", error);
        return false;
    }
}

export async function deleteEvent(id) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8000/event/${id}/`);

        if (response.status === 204) { // 204 No Content is the typical response for a successful DELETE request
            console.log("Successfully deleted the event!");
            return true;
        } 

        console.log("Failed to delete event with status:", response.status);
        return false;
    } catch (error) {
        console.error("Error deleting event:", error);
        return false;
    }
}

export async function addTask(taskData) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/trello/task/', taskData);
        
        // Check if the request was successful
        if (response.status === 201) {
            console.log("Successfully added the task!");
            return true;
        } 

        console.log("Failed to add task with status:", response.status);
    } catch (error) {

        if (error.response.status === 400){
            if (taskData.content === ""){
                return "Bad Request1";
            }
            return "Bad Request2";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function addColumn(columnData) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/trello/column/', columnData);
        
        // Check if the request was successful
        if (response.status === 201) {
            console.log("Successfully added the column!");
            return true;
        } 

        console.log("Failed to add column with status:", response.status);
    } catch (error) {

        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function getColumn() {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/trello/column/');
        
        // If sign up was successful on the backend
        if (response.status === 200) {
            console.log("Successly get column Info!");
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("getColumn Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 403) {
            console.error("getColumn Forbidden (403): ", error.response.data);
        } else {
            console.error("getColumn Request Failed: ", error);
        }
        return false;
    }
}

export async function getTask(columnId) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/trello/task/?str=${columnId}`);
        
        // If sign up was successful on the backend
        if (response.status === 200) {
            console.log("Successly get task Info!");
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("getTask Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 403) {
            console.error("getTask Forbidden (403): ", error.response.data);
        } else {
            console.error("getTask Request Failed: ", error);
        }
        return false;
    }
}


export async function updateTask(taskId, taskContent, taskPriority, columnId) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Assuming the backend accepts a JSON payload with the task's content and priority
        const response = await axios.put(`http://127.0.0.1:8000/trello/task/?str=${taskId}`, {
            content: taskContent,
            priority: taskPriority,
            column: columnId
        });
        
        // If the update was successful on the backend
        if (response.status === 200) {
            console.log("Successfully updated task info!");
            return response.data;
        } 
        // In case the server returns any other status code, consider it as a failure.
        console.log("updateTask failed with status: ", response.status);
        return false;
    } catch (error) {

        if (error.response.status === 400){
            if (taskContent === ""){
                return "Bad Request1";
            }
            return "Bad Request2";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function deleteT(taskId) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8000/trello/task/?str=${taskId}`);

        if (response.status === 204) { // 204 No Content is the typical response for a successful DELETE request
            console.log("Successfully deleted the task!");
            return true;
        } 

        console.log("Failed to delete task with status:", response.status);
        return false;
    } catch (error) {
        console.error("Error deleting task:", error);
        return false;
    }
}


export async function updateNote(notes) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:8000/note/`, notes);
        
        if (response.status === 200) {
            console.log("Successfully updated the notes!");
            return true;
        } 

        console.log("Failed to update notes with status:", response.status);
        return false;
    } catch (error) {
        console.error("Error updating notes:", error);
        return false;
    }
}

export async function addNote(notes) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/note/', notes);
        
        // Check if the request was successful
        if (response.status === 201) {
            console.log("Successfully added the notes!");
            return true;
        } 

        console.log("Failed to add notes with status:", response.status);
    } catch (error) {

        if (error.response.status === 400){
            return "Bad Request";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function getNote() {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Send a request to the backend
        const response = await axios.get('http://127.0.0.1:8000/note/');

        // If sign up was successful on the backend
        if (response.status === 200) {
            console.log("Successly get notes Info!");
            return response.data;
        } 
        // In case server returns any other status code, consider it as a failure.
        console.log("getNote Fail with status: ", response.status);
        return false;
    } catch (error) {
        // Log different message based on the status code in error response.
        if (error.response && error.response.status === 403) {
            console.error("getNote Forbidden (403): ", error.response.data);
        } else if (error.response.status === 404){
            return "Not Found";
        } else if (error.response.status === 500) {
            return "Internal server wrong";
        }
        return false;
    }
}

export async function updateTaskColumn(taskId, columnId) {
    try {
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        // Assuming the backend accepts a JSON payload with only the task's column
        const response = await axios.put(`http://127.0.0.1:8000/trello/task/?str=${taskId}`, {
            column: columnId
        });
        
        // If the update was successful on the backend
        if (response.status === 200) {
            console.log("Successfully updated task's column!");
            return response.data;
        } 
        // In case the server returns any other status code, consider it as a failure.
        console.log("updateTaskColumn failed with status: ", response.status);
        return false;
    } catch (error) {
        if (error.response && error.response.status) {
            if (error.response.status === 400){
                return "Bad Request";
            } else if (error.response.status === 500) {
                return "Internal server wrong";
            }
        }
        console.error("Error updating task's column:", error);
        return false;
    }
}
