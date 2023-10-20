import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Dropdown, ButtonGroup, Badge, Modal } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../ButtonStyle.css";
import { addByEmail, DeleteUserContact, GetUserContact } from '../../pages/Interface.js';
import { UpdateContactTag } from "../../pages/Interface";

const ContactTable = ({ contacts, setContacts, onSelectContact, setRefreshStatus }) => {
  
  /* add a tag */
  var allTags;
  allTags = contacts.flatMap((contact) => contact.tags);
  
  
  const uniqueTags = [...new Set(allTags)];
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentContactTags, setCurrentContactTags] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  var idContact;
  const handleTagClick = (id, tags) => {
    setEditingContactId(id);
    setCurrentContactTags(tags);
    idContact = contacts.find(contact => contact.id === parseInt(id));
    setShowModal(true);

  };

  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  /* add contacts */
  const handleAddManullyClick = () => {
    navigate("/addContact");
  };

  const handleAddByEmailClick = () => {
    setShowEmailModal(true);
  };

  const handleAddByEmail = async () => {
    const success = await addByEmail(emailValue);
    
    if (success === 201) {
        // You might want to reset the email input value after a successful addition
        setEmailValue("");
        setShowEmailModal(false);
        const datas = await GetUserContact();
        for (let data in datas) {
          if (datas[data]["address"]){
          datas[data]["address"] = {"street_address" : datas[data]["address"],
                          "city": datas[data]["city"],
                          "state": datas[data]["state"],
                          "postcode": datas[data]["postcode"]}
          } else {
            datas[data]["address"] = {"street_address" :"",
            "city": datas[data]["city"],
            "state": datas[data]["state"],
            "postcode": datas[data]["postcode"]}
          }
          if (datas[data]["is_user"]) { 
              datas[data]["status"] = "Active";
          }
        }
        setContacts(datas);
        // setContacts(contactss);
        console.log("Add by email succeed!")
        // Maybe show a success notification here
    } else if (success === 500){
        // Handle failure, perhaps show an error notification
        setErrorMessage("This email has not been registered.");
    } else {
        setErrorMessage("Invalid email format.");
    }
};

  /* delete contacts */
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirmation = async () => {
    console.log("Selected rows to delete:", selectedRows);
    const deleteContacts = contacts.filter(
      (contact) => selectedRows.includes(contact.id)
    );
    
    await DeleteUserContact(deleteContacts);
    setRefreshStatus(true);
    // const contactss = await GetUserContact();
    // var active = 0;
    // for (let data in contactss) {
                    
    //   contactss[data]["address"] = {"street_address" : contactss[data]["address"],
    //                                 "city": contactss[data]["city"],
    //                                 "state": contactss[data]["state"],
    //                                 "postcode": contactss[data]["postcode"]}
    //                 if (contactss[data]["is_user"]) { 
    //                     active += 1;
    //                     contactss[data]["status"] = "Active";
    //                 }
    //               }
    //               setContacts(contactss);
    //               setActiveUser(active);
    // setContacts(contactss);
    //setContacts(updatedContacts);
    setSelectedRows([]); // Clear the selection after deletion
    setShowDeleteModal(false); // Close the modal
  };

  /* direct to contact detail */
  const handleNameClick = (contactId) => {
    onSelectContact(contactId);
  };

  /* toolbar */
  function ContactToolbar() {
    return (
      <div>
        <div className="conatct-table-toolbar-container">
          <div className="conatct-table-btn-container">
            {/* filter, density, export */}
            <GridToolbar />
            {/* delete */}
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={() => {
                console.log("Selected rows to delete:", selectedRows);
                setShowDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </div>
          {/* search bar */}
          <GridToolbarQuickFilter />
        </div>

        {/* Delete confirmation modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          style={{ marginTop: "10%" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the selected contacts?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirmation}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  /* save tags */
  const handleSaveTags = () => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === editingContactId) {
        UpdateContactTag(editingContactId, selectedTags, idContact);
        return { ...contact, tags: selectedTags };
      }
      return contact;
    });

    setContacts(updatedContacts);

    setShowModal(false);
    setEditingContactId(null);
    setSelectedTags([]);
    setCurrentContactTags([]);
  };

  /* link to contactDetail and contactTag by id */
  const columns = [
    /* avatar */
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    /* name */
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
        /* direct to contact detail */
      renderCell: (params) => (
        <div
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => handleNameClick(params.row.id)}
        >
          {params.value}
        </div>
      ),
    },
    /* tags */
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      valueGetter: (params) => params.row.tags.join(", "),
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value.split(",").map(
            (tag) =>
              tag.trim() && (
                <Badge
                  key={tag}
                  pill
                  className="contact-table-badge"
                  variant="secondary"
                  onClick={() => handleTagClick(params.row.id, params.row.tags)}
                >
                  {tag.trim()}
                </Badge>
              )
          )}
          {params.row.tags.length === 0 && (
            <Badge
              pill
              className="contact-table-badge"
              variant="light"
              onClick={() => handleTagClick(params.row.id, params.row.tags)}
            >
              + Add Tag
            </Badge>
          )}
        </div>
      ),
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.7,
    },

    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
      valueGetter: (params) => {
        const addr = params.row.address;
        return `${addr.street_address}, ${addr.city}, ${addr.state} ${addr.postcode}`;
      },
    },

    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <div>
      {/* "all contacts" and drop down */}
      <div className="d-flex mb-2 conatct-table-header-container">
        <h3 className="contact-table-header-title">All Contacts</h3>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle
              className="change-color-btn"
              variant="secondary"
              id="dropdown-basic"
            >
              Add a Contact
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleAddByEmailClick}>
                Add by Email
              </Dropdown.Item>
              <Dropdown.Item onClick={handleAddManullyClick}>
                Add Manually
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </div>

      {/* Add by Email Modal */}
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add by Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <TextField 
            fullWidth 
            label="Email" 
            value={emailValue} 
            onChange={(e) => {setEmailValue(e.target.value);
                      if (errorMessage) {
                        setErrorMessage('');
                      }
                    }
                  }
            error={!!errorMessage}
            helperText={errorMessage}
          />

        </Modal.Body>
        {/* button */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Close
          </Button>
          {/* Todo: add button here */}
          <Button variant="primary" onClick={handleAddByEmail}>Add</Button>
        </Modal.Footer>
      </Modal>

      {/* table content */}
      <Box sx={{ height: 430, width: "100%" }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableDensitySelector
          disableColumnMenu={true}
          slots={{ toolbar: ContactToolbar }}
          onRowSelectionModelChange={(newSelectionModel) => {
            console.log("Row selection model changed!");
            const ids = newSelectionModel;
            const selectedIDs = new Set(ids.map((id) => id.toString()));
            const selectedContacts = contacts.filter((contact) =>
              selectedIDs.has(contact.id.toString())
            );
            console.log("Selected contacts:", selectedContacts);

            // Update the state with the IDs of the selected rows
            setSelectedRows(ids);
          }}
          selectionModel={selectedRows}
        />
      </Box>

      {/* Modal containing the Autocomplete for tags */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autocomplete
            multiple
            id="tags-filled"
            options={uniqueTags}
            defaultValue={currentContactTags}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Tags"
                placeholder="Add Tag"
              />
            )}
            onChange={(event, newValue) => {
              console.log("Autocomplete newValue:", newValue);
              setSelectedTags(newValue);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTags}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactTable;
