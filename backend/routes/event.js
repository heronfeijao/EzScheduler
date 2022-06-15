const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET event listing. */
  router.get('/', (req, res) => {
    db.getAllEvents()
      .then((data) => {
        res.json(data);
      });
  });

  //all event created by user with given id
  router.get('/created/:user', (req, res) => {
    const userId = req.params.user;
    db.myCreatedEvents(userId)
      .then((data) => {
        res.json(data);
      })
  });

  //all event related to the user with given id
  router.get('/all/:user', (req, res) => {
    const userId = req.params.user;
    db.getUpcomingEvents(userId)
      .then((data) => {
        res.json(data);
      })
  });

  //create a new event
  //event should contain { title, description, startTime, endTime, address, lat, long, creator }
  router.post('/new', (req, res) => {
    console.log("running post request");
    const event = req.body;
    console.log(event);
    db.createEvent(event)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    db.showEventDetails(eventId)
      .then((data) => {
        console.log("event data is" + data);
        res.json(data);
      })
  })

  //edit an event
  //event should contain { title, description, startTime, endTime, address, lat, long, creator, id } id = event id
  router.put('/', (req, res) => {
    const event = req.body;
    db.editEvent(event)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //delete an event
  router.delete('/:id', (req, res) => {
    const eventId = req.params.id;
    console.log(eventId);
    db.deleteEvent(eventId)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //get all invitees given an event id
  router.get('/invitees/:id', (req, res) => {
    const eventId = req.params.id;
    db.getInvitees(eventId)
      .then((data) => {
        res.json(data);
      })
  });

  //create an invite
  //invite should contain { response, userId, eventId }
  //response sould be null if not inviting myself
  router.post('/invite', (req, res) => {
    const invite = req.body;
    db.invite(invite)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //update a response
  //invite should contain { response, userId, eventId}
  router.put('/response', (req, res) => {
    const invite = req.body;
    db.responseInvite(invite)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  return router;
};