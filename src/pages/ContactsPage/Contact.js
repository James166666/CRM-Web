import React, { useState, useEffect } from "react";
import Greetings from "../../components/Contacts/Greeting";
import Summary from "../../components/Contacts/ContactSummary";
import ContactTable from "../../components/Contacts/ContactTable";
import ContactDetails from "../../pages/ContactsPage/ContactsDetails"; // Import this if not already imported
import SideBar from "../../components/Bar.js";
import contactsData from "./ContactsInfo.json";
import "../../components/RightSideStyles.css";
import "./ContactStyles.css";
import { GetUserContact } from "../Interface";

function Contacts() {

  const [contacts, setContacts] = useState(contactsData);
  const [selectedContactId, setSelectedContactId] = useState(null); 
  const [activeUser, setActiveUser] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
          // Asynchronously fetch user data
        const fetchData = async () => {
              localStorage.setItem('token', token);
              try {
                  const datas = await GetUserContact();
                  var active = 0;
                  for (let data in datas) {
                    setTotalUser(totalUser + 1);
                    datas[data]["address"] = {"street_address" : datas[data]["address"],
                                    "city": datas[data]["city"],
                                    "state": datas[data]["state"],
                                    "postcode": datas[data]["postcode"]}
                    if (datas[data]["is_user"]) { 
                        active += 1;
                        datas[data]["status"] = "Active";
                    } else {
                      datas[data]["status"] = "InActive";
                    }
                  }
                  setContacts(datas);
                  setRefreshStatus(false);
                  setActiveUser(active);
              } catch (error) {
                  console.error("Error fetching user data:", error);
              }
          };
          // Invoke the asynchronous function
          fetchData();
      }, [refreshStatus]);

  if (selectedContactId) {
    /* direct to contact details when click contact name */
    return <ContactDetails id={selectedContactId} contacts = {contacts} setSelectedContactId = {setSelectedContactId} setRefreshStatus= {setRefreshStatus}/>;
  } else {
    return (
        /* contact page */
      <div className="parent">
        <div className="div1">
          <SideBar />
        </div>
        <div className="div2 right--side-bg">
          <div className="container-contact">
            <div className="greeting">
              <Greetings username={localStorage.getItem('userName')} />
            </div>
            <div className="summary contacts-cards">
              <Summary total={contacts.length} active={activeUser} inactive={contacts.length - activeUser} />
            </div>
            <div className="table contacts-cards">
              <ContactTable
                contacts={contacts}
                setContacts={setContacts}
                onSelectContact={(id) => setSelectedContactId(id)}
                setRefreshStatus = {setRefreshStatus} // Pass the handler as a prop
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
