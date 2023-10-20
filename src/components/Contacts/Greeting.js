import React from 'react';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const Greetings = ({ username }) => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <h2>
            {`${greeting}, ${username}`}
            <img
                src="https://github.com/ITProject-Thu-12pm/Assets/blob/main/hello(60%20x%2060).png?raw=true"
                class="greeting-icon"
                alt="hello"
            />
        </h2>
    );
}

export default Greetings;
