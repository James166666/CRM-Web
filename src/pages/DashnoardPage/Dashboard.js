import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getColumn, GetUserContact, updateNote, addNote, getNote, getEvent } from '../Interface.js'

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardStyles.css";

// Local Components
import SideBar from "../../components/Bar.js";
import Greetings from "../../components/Contacts/Greeting";

// MUI Components
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

// MUI Icons
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Data
import DashboardData from "./DashboardData.json";

// Bootstrap Components
import Card from "react-bootstrap/Card";
import { Save } from "@mui/icons-material";


function LoadDashboardPage() {
  // Destructuring data from imported JSON
  const [trello_summary, setTrelloSummary] = useState({
    total_todo: '0',
    total_in_progress: '0',
    total_completed: '0'
  });
  const [filterContacts, setFilterContacts] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [allEvents, setAllEvents] = useState([]);


  useEffect(() => {
    const fetchColumnsForUser = async () => {
      try {
        const userColumns = await getColumn();

        // count trelloSummary
        const summary = userColumns.reduce((acc, column) => {
          switch (column.title) {
            case 'To Do':
              acc.total_todo = String(column.tasks.length);
              break;
            case 'In Progress':
              acc.total_in_progress = String(column.tasks.length);
              break;
            case 'Completed':
              acc.total_completed = String(column.tasks.length);
              break;
            default:
              break;
          }
          return acc;
        }, {
          total_todo: '0',
          total_in_progress: '0',
          total_completed: '0'
        });

        setTrelloSummary(summary);
      } catch (error) {
        console.error("Failed to fetch columns!", error.message);
      }
    };

    fetchColumnsForUser();
  }, []);


  useEffect(() => {
    // Asynchronously fetch user data
    const fetchData = async () => {
        try {
            const datas = await GetUserContact();

            function updateYear(dateString) {
              const parts = dateString.split('-');
              parts[0] = new Date().getFullYear();  // Replace the year
              return parts.join('-');
            }
            
            // Filter and format contacts with upcoming birthdays
            const filterContacts = datas.filter(contact => contact.dob).map(contact => ({
                id: contact.id.toString(),
                name: `${contact.first_name} ${contact.last_name}`,
                age: new Date().getFullYear() - parseInt(contact.dob.split('-')[0], 10),
                dob: updateYear(contact.dob),
                avatar: contact.avatar
            }));
          

            setFilterContacts(filterContacts);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    // Invoke the asynchronous function
    fetchData();
  }, []);


  useEffect(() => {
    const formatDateToMonthDay = (date) => {
      const month = date.getMonth() + 1;  // Months are 0-indexed in JS
      const day = date.getDate();
      return `${month}/${day}`;
    };

    const getFutureDates = (days) => {
      const dates = [];
      const now = new Date()
      for (let i = 0; i < days; i++) {
        const futureDate = new Date(now);
        futureDate.setDate(now.getDate() + i);
        dates.push(formatDateToMonthDay(futureDate));
      }
      return dates;
    };

    const isUpcomingBirthday = (dobString) => {
      if (!dobString) {
        return false;
      }
      const [year, month, day] = dobString.split("-");
      const formattedDob = `${month}/${day}`;
      const futureDates = getFutureDates(7);

      return futureDates.includes(formattedDob);
    };

    const filteredContacts = filterContacts.filter(filterContacts => isUpcomingBirthday(filterContacts.dob));
    setUpcomingBirthdays(filteredContacts);
  }, [filterContacts]);


  // Event
  const transformEvents = (events) => {
    return events.map(event => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
  
      const formatDate = date => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };
  
      const formatTime = date => {
        const hours = String(date.getUTCHours() - 1).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      };
  
      return {
        id: String(event.id),
        title: event.title,
        date: formatDate(startDate),
        time: `${formatTime(startDate)}AM - ${formatTime(endDate)}PM` // Adjust AM/PM accordingly
      };
    });
  };
  
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await getEvent();
          if (fetchedEvents) {
            const transformedEvents = transformEvents(fetchedEvents);
            setAllEvents(transformedEvents);
          } else {
            console.error("Failed to fetch events");
            // Optionally, handle the error in your UI.
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          // Handle the error, maybe set some state to show an error message to the user.
        }
      };
  
      fetchEvents();
    }, []);
  
  

  // Main layout of the dashboard page
  return (
    <div className="parent">
      <div className="div1">
        <SideBar />
      </div>
      <div className="div2 right--side-bg">
        <div className="container-contact">
          <div className="">
            <Greetings username={localStorage.getItem('userName')} />
          </div>
          <div className="contacts-cards">
            {/* TODO: back-end link here */}
            <TrelloSummary
              todo={trello_summary.total_todo}
              in_progress={trello_summary.total_in_progress}
              completed={trello_summary.total_completed}
            />
          </div>

          <Grid container spacing={3} className="container-middle">
            <Grid item xs={12} sm={12} md={8}>
              <BirthdayCard birthdays={upcomingBirthdays} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="date-and-note-container"
            >
              <Box mb={2} className="date-or-note">
                <TimeCard/>
              </Box >
              <Box className="date-or-note">
                <NoteCard/>
              </Box >
              
            </Grid>
          </Grid>

          <div className="contacts-cards">
            <EventCard events={allEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrelloSummary({ todo, in_progress, completed }) {
  return (
    <div className="summary-container">
      {/* total contact */}
      <div className="col d-flex icon-and-content">
        <DirectionsWalkIcon className="trello-img todo-img" />
        <div>
          <div className="summary-first-text">To Do</div>
          <div className="summary-second-text">{todo}</div>
        </div>
      </div>
      {/* active contact */}
      <div className="col d-flex icon-and-content">
        <DirectionsRunIcon className="trello-img in-progress-img" />
        <div>
          <div className="summary-first-text">In Progresss</div>
          <div className="summary-second-text">{in_progress}</div>
        </div>
      </div>
      {/* inactive contact */}
      <div className="col d-flex icon-and-content">
        <DoneAllIcon className="trello-img completed-img" />
        <div>
          <div className="summary-first-text">Completed</div>
          <div className="summary-second-text">{completed}</div>
        </div>
      </div>
    </div>
  );
}


function NoteCard() {
  const [note, setNote] = useState("");
  // const [fetchedNote, setFetchedNote] = useState(null);  // State to store the fetched note

  useEffect(() => {
    async function fetchNote() {
      const fetchedNoteFromDB = await getNote();
      if (fetchedNoteFromDB) {
        setNote(fetchedNoteFromDB.content);
        // setFetchedNote(fetchedNoteFromDB); // Store the fetchedNote in the state
      }
    }

    fetchNote();

  }, []);

  const saveNote = async () => {
    const fn = await getNote();
    if (fn === "Not Found") {
      await addNote({ content: note });
    } else {
      await updateNote({ content: note });
    }
  };

  // Handler for updating the note content
  const handleNoteChange = (event) => {
    const updatedNote = event.target.value;
    setNote(updatedNote);
  };

  return (
    <Card className="card-radius quick-note-card">
      <Card.Header>Quick Note</Card.Header>
      <Card.Body>
        <TextField
          id="standard-multiline-static"
          multiline
          rows={8}
          placeholder="Take a note here..."
          value={note}
          fullWidth
          variant="standard"
          onChange={handleNoteChange}
        />
      </Card.Body>
      <button className="quick-note-save button-transparent" onClick={saveNote}>
          save
      </button>
    </Card>
  );
}


// Component to list individual events in a summary
function EventList({ id, title, date, time }) {
  
  return (
    <>
      <Divider variant="middle" component="li" />
      <Grid container spacing={3} alignItems="center" className="event-list">
        <Grid item xs={6}>
          <Typography variant="h6" className="event-list-title">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" className="event-list-date">
            {date}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" className="event-list-time">
            {time}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

// Component to show a card containing all events
function EventCard({ events }) {
  return (
    <Card className="card-radius">
      <Card.Body>
        <Card.Title className="event-card-title">Recent Events</Card.Title>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">
              Events
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              Date
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className="table-padding-time">
              Time
            </Typography>
          </Grid>
        </Grid>
      </Card.Body>

      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          maxHeight: 235,
          overflowY: "auto",
        }}
        className="card-radius"
      >
        {events.map((event) => (
          <EventList key={event.id} {...event} />
        ))}
      </List>
    </Card>
  );
}

// Component to list individual contact birthdays
function ContactList({ id, name, age, dob, avatar }) {
  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link to={`/contacts/${id}`}>
            <Avatar src={avatar} />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {age} years old
              </Typography>
              {" — on " + dob}
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
}

// Component to show a card containing all birthdays
function BirthdayCard({ birthdays }) {
  return (
    <Card className="card-radius birthday-card">
      <Card.Img
        variant="top"
        src="https://i.etsystatic.com/33670728/r/il/f35ecc/3584410702/il_1588xN.3584410702_44w8.jpg"
        className="birthday-img mx-auto d-block"
      />
     
        <Card.Title className="birthday-text">Let's celebrate!</Card.Title>
     

      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          maxHeight: 300,
          overflowY: "auto",
        }}
        className="card-radius"
      >
        {birthdays.map((contact) => (
          <ContactList key={contact.id} {...contact} />
        ))}
      </List>
    </Card>
  );
}

// Component to display current date and time
function TimeCard() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="card-radius time-card">
      <div className="curr-time">{dateTime.toLocaleTimeString()}</div>
      <div className="curr-date">{dateTime.toLocaleDateString()}</div>
    </Card>
  );
}

export default LoadDashboardPage;
