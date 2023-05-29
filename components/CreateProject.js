import styles from "../styles/CreateProject.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { addProject, emptyStore } from "../reducers/project";

function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [end_dateError, setEnd_dateError] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [location, setLocation] = useState("");
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true }]);
  let test = new Date(start_date);
  test = test.setDate(test.getDate() + 7);
  test = new Date();

  console.log(test);

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
      start_date: start_date,
      end_date: end_date,
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
  console.log("store", project);

  useEffect(() => {
    fetch("http://localhost:3000/locations/allLocation")
      .then((response) => response.json())
      .then((data) => {
        let formattedData = data.Locations.map((data) => {
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
  let startingDate = new Date(start_date);

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

  const handleEndDate = (change) => {
    if (!start_date) {
      setEnd_dateError("Please select a starting date first");
      return;
    } else {
      setEnd_date(change);
    }
  };

  /////////////////////////////////////////////////////

  return (
    <div className={styles.background}>
      <div className={styles.homeContainer}>
        {/*--------------------- Nav end*----------------------------*/}

        {/*contains the div formContainer and txtAreaContainer*/}
        <div className={styles.leftRightContainer}>
          <h1>Create Your Project</h1>
          <div className={styles.leftRight}>
            <form className={styles.formContainer}>
              {/*--------------------------- Forms ------------------------------*/}
              <div className={styles.inputDiv}>
                <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                  <label htmlFor="projectName">Project Name:</label>
                  <input
                    type="text"
                    id="projectName"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={styles.input}
                    placeholder="Enter project name"
                  />
                </div>
                {/*input  Start Date & End Date FORMS */}
                <div className={styles.endSartContainer}>
                  <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      onChange={(e) => setStart_date(e.target.value)}
                      value={start_date}
                      className={styles.endStart}
                      placeholder="Enter start date"
                      min={dayStartStr}
                    />
                  </div>
                  <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                    <label htmlFor="endDate">
                      End Date:{" "}
                      <span className={styles.errorTxt}>{end_dateError}</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      onChange={(e) => handleEndDate(e.target.value)}
                      onClick={() => setEnd_dateError("")}
                      value={end_date}
                      className={styles.endStart}
                      placeholder="Enter end date"
                      min={dayEndStr}
                    />
                  </div>
                </div>
                {/* input Start Date & End Date FORMS */}

                {/* input job Profile & member count */}
                <div className={styles.jobInputContainer}>
                  <div>
                    <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                      <label htmlFor="jobProfile">Location:</label>
                      <Select
                        id="jobProfile"
                        className={styles.jobProfile}
                        // devra etre remplacé par les data de location
                        options={locationData}
                        onChange={handleSelectChange}
                      />
                    </div>
                  </div>
                </div>
                {/* old button that was used to add the job div */}
                {/* <button
                onClick={() => addMemberClick()}
                className={styles.addButton}
              >
                Add Member
              </button> */}
                {/* old button that was used to add the job div */}
              </div>
              {/*--------------------------- Forms ------------------------------*/}

              {/*------------------------- div txtAreaContainer ----------------------*/}
              <div className={styles.txtAreaContainer}>
                <label
                  className={styles.labelStyle}
                  htmlFor="projectDescription"
                >
                  Project description:
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  maxLength="2500"
                  className={styles.txtArea}
                  placeholder="Enter project description"
                ></textarea>
                <div className={styles.btnCreatCountainer}>
                  <button
                    onClick={(e) => clickCreatProject(e)}
                    className={styles.btnCreateProject}
                  >
                    Next Step ADD Members
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/*------------------------- div txtAreaContainer fin ----------------------*/}
        </div>
        {/* contains the div formContainer and txtAreaContainer */}
      </div>
    </div>
  );
}
/************************ section for the logical part of the job component ******************************/

export default CreateProject;
