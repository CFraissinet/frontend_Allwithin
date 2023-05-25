import Link from "next/link";
import styles from "../styles/CreateProject.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select"; // library to add the drop down menu with checkboxes

function CreateProject() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [location, setLocation] = useState("");
  const [jobData, setJobData] = useState([]);

  // const [crew, setCrew] = useState("");

  const user = useSelector((state) => state.user.value);
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true }]);

  const removeJobCard = (id) => {
    setJobBox(jobBox.filter((jobCard) => jobCard.id !== id));
  };

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
      router.push({
        pathname: '/offers',
        query: {project : data.id},
    });
      console.log(data);
      });
  };


  useEffect(() => {
    fetch("http://localhost:3000/users/jobs")
      .then((response) => response.json())
      .then((data) => {
        let formattedData = data.jobs.map((job) => {
          return { value: job._id, label: job.name };
        });
        setJobData(formattedData);
        
      });
  }, []);

  // const addMemberClick = () => {
  //   setJobBox([...jobBox, { id: jobBox.length, isFirst: false }]);

  //   console.log("click1111111111111111");
  // };
  const handleSelectChange = (selected) => {
    console.log(selected);  
    setLocation(selected.value);
  };


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
                    />
                  </div>

                  <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      onChange={(e) => setEnd_date(e.target.value)}
                      value={end_date}
                      className={styles.endStart}
                      placeholder="Enter end date"
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
                      options={jobData}
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
              <label className={styles.labelStyle} htmlFor="projectDescription">
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
/************************ section for the logical part of the job component *************************************/


export default CreateProject;
