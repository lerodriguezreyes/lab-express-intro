const express = require("express");
const morgan = require("morgan");

const app = express();
const logger = morgan("dev");
const data = require("./db.json");
const PORT = 8080;
data;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(logger);

//GET /  just sends a response as a JSON Object with a message property, containing a string
app.get("/", async (req, res, next) => {
  res.json({
    message:
      "Hello world! This is the empty / root route. Here's a cookie for ya!",
  });
});

app.get("/people", async (req, res, next) => {
  res.json({
    data,
  });
});

app.get("/people/:personId", async (req, res, next) => {
  const { personId } = req.params;

  const singlePerson = data.find((person) => person.id.toString() === personId);

  if (!singlePerson) {
    res.json({ message: "There is no one with this ID" });
  }

  res.json(singlePerson);
});

app.get("/people/country/:country", async (req, res, next) => {
  const { country } = req.params;

  const peopleByCountry = data.filter(
    (selectedCoutry) => selectedCoutry.country.replace(/\s+/g, '').toLowerCase() === country
  );

  if (!peopleByCountry) {
    res.json({ message: "There is no one living in this country." });
  }

  res.json(peopleByCountry);
});

app.get("/people/age/:age", async (req, res, next) => {
  const { age } = req.params;

  const peopleByAge = data.filter(
    (selectedAge) => selectedAge.age === Number(age)
  );

  if (!peopleByAge) {
    res.json({ message: "There is no one with this age." });
  }

  res.json(peopleByAge);
});

app.get("/people/profession/:profession", async (req, res, next) => {
  const { profession } = req.params;

  const peopleByProfession = data.filter(
    (selectedProfession) => selectedProfession.profession.replace(/\s+/g, '').toLowerCase() === profession
  );

  if (!peopleByProfession) {
    res.json({ message: "There is no one with profession." });
  }

  res.json(peopleByProfession);
});
