import Link from "next/link";
import styles from "../styles/Offers.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select"; // library to add the drop down menu with checkboxes

function Offers() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  // const [crew, setCrew] = useState("");
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true, jobData: [] }]);
  const [data, setData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [jobsSelected, setJobsSelected] = useState([]);

  const user = useSelector((state) => state.user.value);
  const project = useSelector((state) => state.project.value);

  console.log(data);

  const removeJobCard = (id) => {
    setJobsSelected(jobsSelected.filter((job) => job.jobCardId !== id));
    setJobBox(jobBox.filter((jobCard) => jobCard.id !== id));
  };

  const addJobToParent = (job, jobCardId) => {
    let findJobIndex = jobsSelected.findIndex(
      (job) => job.jobCardId === jobCardId
    );
    if (findJobIndex !== -1) {
      let temp = jobsSelected;
      temp[findJobIndex].job = job;
      setJobsSelected([...temp]);
    } else {
      setJobsSelected([...jobsSelected, { job, jobCardId }]);
    }
  };
  console.log("jobtable", jobsSelected);

  const clickCreatProject = () => {
    const data = {
      project: project[0],
    };
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

  const addMemberClick = () => {
    setJobBox([
      ...jobBox,
      { id: jobBox.length, isFirst: false, jobData: jobData },
    ]);
  };

  return (
    <div className={styles.background}>
      <div className={styles.homeContainer}>
        <div className={styles.container}></div>

        {/*contains the div formContainer and txtAreaContainer*/}
        <div className={styles.leftRightContainer}>
          <h1> Offers </h1>
          <div className={styles.leftRight}>
            <div className={styles.formContainer}>
              {/*--------------------------- Forms ------------------------------*/}
              <div className={styles.inputDiv}>
                <div className={styles.jobInputContainer}>
                  {jobBox.map((jobCard) => (
                    <JobCard
                      addJobToParent={addJobToParent}
                      key={jobCard.id}
                      id={jobCard.id}
                      isFirst={jobCard.isFirst}
                      removeJobCard={removeJobCard}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.containerBtnOffers}>
                <button
                  onClick={() => addMemberClick()}
                  className={styles.addButton}
                >
                  Add Member
                </button>

                <Link href="/lobby">
                  <button
                    className={styles.addButton}
                    onClick={() => clickCreatProject()}
                  >
                    Create Project
                  </button>
                </Link>
              </div>
            </div>
            {/*--------------------------- Forms ------------------------------*/}

            {/*------------------------- div txtAreaContainer ----------------------*/}
            <div className={styles.txtAreaContainer}>
              {/* <label className={styles.labelStyle} htmlFor="projectDescription">
                Description:
              </label> */}
              {/* <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength="2500"
                className={styles.txtArea}
                placeholder="Enter project description"
              ></textarea> */}
              <div className={styles.btnCreatCountainer}></div>
            </div>
          </div>
          {/*------------------------- div txtAreaContainer fin ----------------------*/}
        </div>
        {/* contains the div formContainer and txtAreaContainer */}
      </div>
    </div>
  );
}

/************************ section for the logical part of the job component *************************************/

// A React function component named JobCard is defined with three props: id, isFirst, removeJobCard
function JobCard({ id, isFirst, removeJobCard, addJobToParent }) {
  // Creating a state variable 'counter' with an initial value of 0. setCounter is a function that will be used to update this value
  const [selectedOptions, setSelectedOptions] = useState([]); // Creating a state variable 'selectedOptions' with an initial value of empty array. setSelectedOptions is a function that will be used to update this value

  // The options available for job profile selection
  const [jobData, setJobData] = useState([]);

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

  let options = [];

  jobData.map((data, i) => {
    return options.push({ value: data._id, label: data.name });
  });

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    addJobToParent(selected, id);
  };

  //component for menu selection with jobs and counter for each job
  return (
    <div>
      <div className={`${styles.inputBox} ${styles.labelStyle}`}>
        <label htmlFor="jobProfile">Job Profile:</label>
        <Select
          id="jobProfile"
          className={styles.jobProfile}
          options={jobData}
          value={selectedOptions}
          onChange={handleSelectChange}
        />
      </div>
      <div className={styles.counter}>
        {!isFirst && <button onClick={() => removeJobCard(id)}>X</button>}
      </div>
    </div>
  );
}

export default Offers;
