const express = require("express");
const mysql = require("mysql");
const format = require("date-fns/format");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jeelam$25",
  database: "todo",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// app.get("/todos/", (req, res) => {
//   con.query(`SELECT * FROM my_data`, (err, result) => {
//     if (err) {
//       console.log("Error fetching data:", err);
//       res.status(500);
//       res.send("Error fetching users");
//       return;
//     }
//     res.json(result);
//   });
// });

//scenario -1

const hasStatusProperty = (requestQuery) => {
  return requestQuery.status !== undefined;
};

//scenario -2

const hasPriorityProperty = (requestQuery) => {
  return requestQuery.priority !== undefined;
};

//scenario -3

const hasPriorityAndStatusProperties = (requestQuery) => {
  return (
    requestQuery.priority !== undefined && requestQuery.status !== undefined
  );
};

//scenario -4

const hasSearchProperty = (requestQuery) => {
  return requestQuery.search_q !== undefined;
};

//scenario -5
const hasCategoryAndStatus = (requestQuery) => {
  return (
    requestQuery.category !== undefined && requestQuery.status !== undefined
  );
};

//scenario -6

const hasCategoryProperty = (requestQuery) => {
  return requestQuery.category !== undefined;
};

//scenario -7
const hasCategoryAndPriority = (requestQuery) => {
  return (
    requestQuery.category !== undefined && requestQuery.priority !== undefined
  );
};

const outPutResult = (dbObject) => {
  return {
    id: dbObject.id,
    todo: dbObject.todo,
    priority: dbObject.priority,
    category: dbObject.category,
    status: dbObject.status,
    dueDate: dbObject.due_date,
  };
};

app.get("/todos/", (req, res) => {
  let data = null;
  let getTodosQuery = "";
  const { search_q = "", priority, status, category } = req.query;
  console.log(hasCategoryAndStatus(req.query));

  switch (true) {
    case hasStatusProperty(req.query):
      con.query(
        `SELECT * FROM my_data WHERE status = "${status}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;

    case hasPriorityProperty(req.query):
      con.query(
        `SELECT * FROM my_data WHERE priority = "${priority}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    case hasPriorityAndStatusProperties(req.query):
      con.query(
        `SELECT * FROM my_data WHERE status = "${status}" AND priority = "${priority}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    case hasSearchProperty(req.query):
      con.query(
        `SELECT * FROM my_data WHERE todo LIKE "%${search_q}%";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    case hasCategoryAndStatus(req.query):
      con.query(
        `SELECT * FROM my_data WHERE category = "${category}" AND status = "${status}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    case hasCategoryProperty(req.query):
      con.query(
        `SELECT * FROM my_data WHERE category = "${category}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    case hasCategoryAndPriority(req.query):
      con.query(
        `SELECT * FROM my_data WHERE category = "${category}" AND priority = "${priority}";`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching users");
            return;
          }
          res.json(results);
        }
      );
      break;
    default:
      con.query(`SELECT * FROM my_data`, (err, results) => {
        if (err) {
          console.log("Error fetching data:", err);
          res.status(500);
          res.send("Error fetching users");
          return;
        }
        res.json(results);
      });
  }
});

app.get("/todos/:todoId", (req, res) => {
  const { todoId } = req.params;
  con.query(`SELECT * FROM my_data WHERE id = ${todoId};`, (err, results) => {
    if (err) {
      console.log("Error fetching data:", err);
      res.status(500);
      res.send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

app.get("/agenda/", (req, res) => {
  const { date } = req.query;
  con.query(
    `SELECT * FROM my_data WHERE due_date = "${date}";`,
    (err, results) => {
      if (err) {
        console.log("Error fetching data:", err);
        res.status(500);
        res.send("Error fetching data");
        return;
      }
      res.json(results);
    }
  );
});

app.post("/todos/", (req, res) => {
  const { id, todo, priority, status, category, due_date } = req.body;
  con.query(
    `INSERT INTO my_data (id, todo, priority, status, category, due_date) VALUES(${id}, '${todo}', '${priority}', '${status}', '${category}', '${due_date}' );`,
    (err, results) => {
      if (err) {
        console.log("Error fetching data:", err);
        res.status(500);
        res.send("Error fetching data");
        return;
      }
      res.json("Successfully Posted");
      console.log(results);
    }
  );
});

app.put("/todos/:todoId/", (req, res) => {
  const { todoId } = req.params;
  const { todo, priority, status, category, due_date } = req.body;

  switch (true) {
    // scenario 1 modified status

    case req.body.status !== undefined:
      con.query(
        `UPDATE 
            my_data
        SET status= "${status}"
        WHERE id = ${todoId};`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching data");
            return;
          }
          res.json("Successfully Updated");
        }
      );
      break;

    // scenario 2 modified priority

    case req.body.priority !== undefined:
      con.query(
        `UPDATE 
            my_data
        SET priority= "${priority}"
        WHERE id = ${todoId};`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching data");
            return;
          }
          res.json("Successfully Updated");
        }
      );
      break;

    // scenario 3 modified todo

    case req.body.todo !== undefined:
      con.query(
        `UPDATE 
            my_data
        SET todo = "${todo}"
        WHERE id = ${todoId};`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching data");
            return;
          }
          res.json("Successfully Updated");
        }
      );
      break;

    // scenario 4 modified category

    case req.body.category !== undefined:
      con.query(
        `UPDATE 
            my_data
        SET category = "${category}"
        WHERE id = ${todoId};`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching data");
            return;
          }
          res.json("Successfully Updated");
        }
      );
      break;

    // scenario 4 modified due_date

    case req.body.due_date !== undefined:
      const newDate = format(new Date(due_date), "yyyy-MM-dd");
      con.query(
        `UPDATE 
          my_data
        SET due_date = "${newDate}"
        WHERE id = ${todoId};`,
        (err, results) => {
          if (err) {
            console.log("Error fetching data:", err);
            res.status(500);
            res.send("Error fetching date");
            return;
          }
          res.json("Successfully Updated");
        }
      );
      break;

    default:
      break;
  }
});

app.delete("/todos/:todoId/", (req, res) => {
  const { todoId } = req.params;
  con.query(`DELETE FROM my_data WHERE id = ${todoId};`, (err, result) => {
    if (err) {
      console.log("Error fetching data:", err);
      res.status(500);
      res.send("Error fetching date");
      return;
    }
    res.send("Successfully Deleted");
  });
});
