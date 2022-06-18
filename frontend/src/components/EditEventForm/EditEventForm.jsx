import React, { useEffect, useState } from "react";
import classes from "./EditEventForm.module.css";
import Map from "../Map";
import axios from "axios";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";

const EditEventForm = (props) => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTimestamp, setStartTime] = useState("");
  const [endTimestamp, setEndTime] = useState("");
  const [invitee, setInvitee] = useState("");
  const [newInvitee, setNewInvitee] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [inviteesListSubmission, setInviteesListSubmission] = useState([]);
  const [dynamicList, setDynamicList] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((e) => {
  //     setCoords({ lng: e.coords.longitude, lat: e.coords.latitude });
  //   });
  // }, []);

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const inviteeChange = (e) => {
  //   setInvitee(e.target.value);
  //   setOpenDropDown(true);
  // };

  // useEffect(() => {
  //   axios.get(`/events/:`).then((e) => {
  //     const list = e.data.filter(
  //       (user) =>
  //         user.email.toLowerCase().includes(invitee.toLowerCase()) ||
  //         user.name.toLowerCase().includes(invitee.toLowerCase())
  //     );
  //     setDynamicList(list);
  //   });
  // }, [invitee]);

  const getLocation = () => {
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address,
          key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((data) => {
        const dataCoords = data.data.results[0].geometry.location;
        setCoords({ lat: dataCoords.lat, lng: dataCoords.lng });
      });
  };

  //save the new event data to database
  const submitHandler = async (e) => {
    e.preventDefault();
    const dateE = date.split("-");
    const start = startTimestamp.split(":");
    const startTime =
      new Date(
        dateE[0],
        Number(dateE[1]) - 1,
        dateE[2],
        start[0],
        start[1]
      ).getTime() / 1000;
    const end = endTimestamp.split(":");
    const endTime =
      new Date(
        dateE[0],
        Number(dateE[1]) - 1,
        dateE[2],
        end[0],
        end[1]
      ).getTime() / 1000;
    const formData = {
      title,
      description,
      startTime,
      endTime,
      address,
      lat: coords.lat,
      long: coords.lng,
      creator: props.user,
      id: props.eventId
    };
    console.log(formData);
    axios.put(`/event`,formData).then((data) => {
      console.log({data});
    });
  }

  
  useEffect(() => {
    setTitle(props.title);
    setDescription(props.description);
    setAddress(props.address);
    setDate(humanStartDate);
    setStartTime(humanStartDayTime);
    setEndTime(humanEndDayTime);
  },[]);



//fixing time display
const humanStartTime = new Date(props.start_time*1000);
const humanEndTime = new Date(props.end_time*1000);
const humanYear  = humanStartTime.getFullYear();
const humanMonth = (humanStartTime.getMonth() + 1).toString().padStart(2, "0");
const humanDate = humanStartTime.getDate().toString().padStart(2, "0");
const humanStartDate = `${humanYear}-${humanMonth}-${humanDate}`;
const humanStartHour = humanStartTime.getHours().toString().padStart(2,"0");
const humanStartMinute = humanStartTime.getMinutes().toString().padStart(2,"0");
const humanStartDayTime = `${humanStartHour}:${humanStartMinute}`;
const humanEndHour = humanEndTime.getHours().toString().padStart(2,"0");
const humanEndMinute = humanEndTime.getMinutes().toString().padStart(2,"0");
const humanEndDayTime = `${humanEndHour}:${humanEndMinute}`;



  return (
  
    <div className={classes.container}>
      Edit!!!!!!
      <h3 className="row">Edit Event</h3>
      <form className="row">
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input type="text" value={title} onChange={titleChange} />
          <label>Description:</label>
          <input type="text" value={description} onChange={descriptionChange} />
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={addressChange}
            onBlur={getLocation}
            name="address"
          />
        </div>
        <div className="col">
          <div className="row">
            <label>Date:</label>
            <input type="date" value={date} onChange={dateChange} />
          </div>
          <div className="row">
            <label>Start Time:</label>
            <TimePicker onChange={setStartTime} value={startTimestamp} />
          </div>
          <div className="row">
            <label>End Time:</label>
            <TimePicker onChange={setEndTime} value={endTimestamp} />
          </div>
        </div>
        <hr className="mt-3" />
        <div className="row mb-3">
          {/* <div className="col-4">
            Invitees
            <div className={classes.invitees}>
              {list}
              {newInvitee && (
                <div className="row align-items-center justify-content-center">
                  <input
                    className={classes.invitee_form}
                    value={invitee}
                    onChange={inviteeChange}
                    required
                  />
                  <button onClick={addButton} className={classes.btn_add}>
                    ADD
                  </button>
                </div>
              )}
              {openDropDown && (
                <div className={`${classes.dropdown} row`}>
                  <div className={classes["dropdown-content"]}>{addList}</div>
                </div>
              )}
              <i
                onClick={() => setNewInvitee(true)}
                className={`${classes.add} bi bi-plus-lg`}
              ></i>
            </div>
          </div> */}
          <div className="col-12">
            MAP
            <div className={classes.map}>
              <Map
                lat={props.lat}
                lng={props.long}
                height={"400px"}
                zoom={18}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={`${classes.center} row`}>
          <Link to="/">
            <button className={classes.btn} onClick={submitHandler}>
              Edit Event
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditEventForm;
