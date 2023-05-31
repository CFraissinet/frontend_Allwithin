import styles from "../styles/CreateProject.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { addProject } from "../reducers/project";
import Button from "../components/Button";

function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [location, setLocation] = useState("");
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true }]);

  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const project = useSelector((state) => state.project.value);

  const removeJobCard = (id) => {
    setJobBox(jobBox.filter((jobCard) => jobCard.id !== id));
  };
  const dispatch = useDispatch();
  const clickCreatProject = (e) => {
    e.preventDefault();
    const myData = {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      location: location,
      token: user.token,
    };

    fetch("http://localhost:3000/projects/addProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("project added", data);
        dispatch(addProject(data.data._id));
        router.push("/offers");
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/locations/allLocation")
      .then((response) => response.json())
      .then((data) => {
        let formattedData = data.locations.map((data) => {
          return { value: data._id, label: data.name };
        });
        setLocationData(formattedData);
      });
  }, []);

  const handleSelectChange = (selected) => {
    setLocation(selected.value);
  };

  // SETTING UP START & END DATE FOR PROJECT
  let now = Date.now();
  let dateToday = new Date(now);
  let startingDate = new Date(startDate);

  let dayStart = dateToday.setDate(dateToday.getDate() + 7);
  dayStart = new Date(dayStart);

  let dateStart = dayStart.getDate();
  dateStart = dateStart.toString();
  if (dateStart.length === 1) {
    dateStart = "0" + dateStart;
  }

  let monthStart = dayStart.getMonth() + 1;
  monthStart = monthStart.toString();
  if (monthStart.length === 1) {
    monthStart = "0" + monthStart;
  }

  let yearStart = dayStart.getFullYear();
  yearStart = yearStart.toString();

  let dayEnd = startingDate.setDate(startingDate.getDate() + 7);
  dayEnd = new Date(dayEnd);

  let dateEnd = dayEnd.getDate();
  dateEnd = dateEnd.toString();
  if (dateEnd.length === 1) {
    dateEnd = "0" + dateEnd;
  }

  let monthEnd = dayEnd.getMonth() + 1;
  monthEnd = monthEnd.toString();
  if (monthEnd.length === 1) {
    monthEnd = "0" + monthEnd;
  }

  let yearEnd = dayEnd.getFullYear();
  yearStart = yearStart.toString();
  let dayStartStr = yearStart + "-" + monthStart + "-" + dateStart;
  let dayEndStr = yearEnd + "-" + monthEnd + "-" + dateEnd;

  /////////////////////////////////////////////////////

  const handleEndDate = (change) => {
    if (!startDate) {
      setEndDateError("Please select a starting date first");
      return;
    } else {
      setEndDate(change);
    }
  };

  return (
    <form className={styles.mainContainer}>
      {/*contains the div formContainer and txtAreaContainer*/}
      <h1 className={styles.title}>Create Your Project</h1>
      <div className={styles.contentContainer}>
        <div className={styles.leftDiv}>
          <div className={`${styles.inputBox} ${styles.labelStyle}`}>
            <label>Project Name:</label>
            <input
              type="text"
              id="projectName"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={styles.input}
              placeholder="Enter project name"
            />
          </div>

          <div className={`${styles.inputBox} ${styles.labelStyle}`}>
            <label>Start Date:</label>
            <input
              type="date"
              id="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              className={styles.input}
              placeholder="Enter start date"
              min={dayStartStr}
            />
          </div>

          <div className={`${styles.inputBox} ${styles.labelStyle}`}>
            <label>
              End Date: <span className={styles.errorTxt}>{endDateError}</span>
            </label>
            <input
              type="date"
              id="endDate"
              onChange={(e) => handleEndDate(e.target.value)}
              onClick={() => setEndDateError("")}
              value={endDate}
              className={styles.input}
              placeholder="Enter end date"
              min={dayEndStr}
            />
          </div>

          <div className={`${styles.inputBox} ${styles.labelStyle}`}>
            <label>Location:</label>
            <Select
              id="jobProfile"
              className={styles.input}
              options={locationData}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        {/*--------------------------- Forms ------------------------------*/}

        {/*------------------------- div txtAreaContainer ----------------------*/}
        <div className={styles.rightDiv}>
          <label className={styles.labelStyle}>Project description:</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            maxLength="2500"
            className={styles.txtArea}
            placeholder="Enter project description"
          ></textarea>
        </div>
      </div>
      <a className={styles.nextStepBtn} onClick={(e) => clickCreatProject(e)}>
        <Button
          text="Next Step"
          backgroundColor="#87c0cd"
          borderColor="#87c0cd"
          textColor="#152232"
          backgroundColorHover="#white"
          borderColorHover="#white"
          textColorHover="white"
        />
      </a>
    </form>
  );
}

export default CreateProject;
