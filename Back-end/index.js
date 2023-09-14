const express = require("express");
const uuid = require("uuid");
const mysql = require("mysql");

// Creating mysql database connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  database: "university",
  user: "root",
  timezone: "Asia/Kolkata",
});

// express app shorthands
const app = express();
const PORT = 4000;

// parses the request body to json
app.use(express.json());

// middleware to authenticate requests: checks if the token is present in the request Authorization header, validates if the token is present in database
// gets the user id from the database corresponding to this token and adds the userId in request body
app.use((req, res, next) => {
  if (req.url != "/login") {
    // For any url other than /login, check if token is present in request header and validate if the same token is present in database
    token = req.headers["authorization"];
    console.log(token);
    connection.query(
      `select id from users where token="${token}"`,
      (error, result) => {
        if (error) {
          res.status(400).json({ error: error });
        } else if (result.length == 0) {
          res.status(400).json({ error: "Invalid token, please login again" });
        } else {
          req.body["userId"] = result[0]["id"];
          next();
        }
      }
    );
  } else if (req.body["id"] && req.body["password"]) {
    // create a new token and add this token + userID and password to database if the URL is /login
    const token = uuid.v4();
    connection.query(
      `insert into users (id, password, token) values ("${req.body["id"]}" , "${req.body["password"]}", "${token}");`,
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error: "Failed to query DB" });
        } else {
          res.status(200).json({ msg: "login successful", token: token });
        }
      }
    );
  }
});

// Utilities
function getDateWithoutTime(date) {
  month = date.getMonth() + 1 + "";
  if (month.length < 2) {
    month = "0" + month;
  }
  _date = date.getDate() + "";
  if (_date.length < 2) {
    _date = "0" + _date;
  }
  return date.getFullYear() + "-" + month + "-" + _date;
}

// gets next 6 thrusday and friday dates from current date
function getNextThursdaysAndFridays(fromDate) {
  const result = [];
  let currentDate;
  if (fromDate) {
    currentDate = fromDate;
  } else {
    currentDate = new Date();
  }

  while (result.length < 6) {
    const nextDate = new Date(currentDate);

    // Calculate days until the next Thursday (4) or Friday (5) from today
    let daysToAdd = 0;
    if (nextDate.getDay() < 4) {
      daysToAdd = 4 - nextDate.getDay();
    } else if (nextDate.getDay() <= 5) {
      daysToAdd = 0;
    } else {
      daysToAdd = 11 - nextDate.getDay();
    }
    nextDate.setDate(currentDate.getDate() + daysToAdd);

    // Check if the next date is Thursday (4) or Friday (5)
    if (nextDate.getDay() === 4 || nextDate.getDay() === 5) {
      result.push(nextDate);
    }

    // Move to the next week
    currentDate.setDate(nextDate.getDate() + 1);
  }

  return result;
}

app.get("/", (req, resp) => {
  resp.send("app is working");
});

app.get("/slots/available", (req, resp) => {
  nextDates = getNextThursdaysAndFridays().map((e) => getDateWithoutTime(e));
  startDate = nextDates[0];
  endDate = nextDates[nextDates.length - 1];

  // checks all booked slots between first date and last date in nextDates(next 6 thursdays and fridays)
  connection.query(
    `select booked_at from bookings where booked_at between ? and ?;`,
    [startDate, endDate],
    (error, result) => {
      if (error) {
        resp.status(400).json({ error: "Failed to query DB" });
      } else {
        booked_dates = result.map((e) =>
          getDateWithoutTime(new Date(e["booked_at"]))
        );

        // remove all booked dates from the nextDates
        available_slots = nextDates.filter((e) => !booked_dates.includes(e));
        resp.status(200).json({ slots: available_slots });
      }
    }
  );
});

// fetches all booked slots from today onwards
app.get("/slots/booked", (req, resp) => {
  let startDate = getDateWithoutTime(new Date());
  connection.query(
    `select booked_at, booked_by from bookings where booked_at >= ${startDate};`,
    (error, result) => {
      if (error) {
        resp.status(400).json({ error: "Failed to query DB" });
      } else {
        console.log("boooked slots result ", result);
        resp.status(200).json(result);
      }
    }
  );
});

app.post("/slots/book", (req, resp) => {
  console.log(req.body);
  let booking_date = req.body["booking_date"];
  console.log(
    `insert into bookings(booked_at, booked_by) values("${booking_date}","${req.body["userId"]}");`
  );
  connection.query(
    `insert into bookings(booked_at, booked_by) values("${booking_date}","${req.body["userId"]}");`,
    (error, result) => {
      if (error) {
        console.log(error);
        resp.status(400).json({ error: "Failed to query DB" });
      } else {
        console.log("booking creation result ", result);
        resp.status(200).json({ message: "Successfully booked the slot" });
      }
    }
  );
});

// If the database connection fails then don't start the server
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database", err);
  } else {
    console.log("Database connected.");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  }
});
