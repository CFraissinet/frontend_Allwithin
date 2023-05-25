import Link from "next/link";
import styles from "../styles/Offers.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState , useEffect} from "react";
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
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true }]);
const [data, setData] = useState(null);  


  const user = useSelector((state) => state.user.value);




useEffect(() => {

if (router.query.myData) {
  setData(JSON.parse(router.query.myData))
};
}, [router.query]);

console.log(data);

const removeJobCard = (id) => {
    setJobBox(jobBox.filter((jobCard) => jobCard.id !== id));
  };

  const clickCreatProject = () => {
    const data = {
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      token: user.token,
    };

    fetch("http://localhost:3000/projects/addProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const addMemberClick = () => {
    setJobBox([...jobBox, { id: jobBox.length, isFirst: false }]);

    console.log("click1111111111111111");
  };

  return (
    <div className={styles.background}>
      <div className={styles.homeContainer}>
        <div className={styles.container}>
          {/*--------------------------- Nav ------------------------------*/}
          {/* <div className={styles.navbar}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src="/path/to/your/logo.png"
                alt="Logo"
              />
            </div>
            <div className={styles.buttons}>
              <Link href="/lobby">
                <button className={styles.btnNav}>My lobby</button>
              </Link>
              <Link href="/signUp">
                <button className={styles.btnNav}>My messages</button>
              </Link>
            </div>
          </div> */}
        {/*--------------------- Nav end*----------------------------*/}
        </div>

        {/*contains the div formContainer and txtAreaContainer*/}
        <div className={styles.leftRightContainer}>
          <h1> Offers </h1>
          <div className={styles.leftRight}>
            <div className={styles.formContainer}>
          
              {/*--------------------------- Forms ------------------------------*/}
              <div className={styles.inputDiv}>
                {/* <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                  <label htmlFor="projectName">Project Name:</label>
                  <input
                    type="text"
                    id="projectName"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={styles.input}
                    placeholder="Enter project name"
                  />
                </div> */}
                {/*input  Start Date & End Date FORMS */}
                {/* <div className={styles.endSartContainer}>
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
                </div> */}
                {/* input Start Date & End Date FORMS */}

                {/* input job Profile & member count */}
                <div className={styles.jobInputContainer}>
                  {jobBox.map((jobCard) => (
                    <JobCard
                      key={jobCard.id}
                      id={jobCard.id}
                      isFirst={jobCard.isFirst}
                      removeJobCard={removeJobCard}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => addMemberClick()}
                className={styles.addButton}
              >
                Add Member
              </button>
            </div>
            {/*--------------------------- Forms ------------------------------*/}

            {/*------------------------- div txtAreaContainer ----------------------*/}
            <div className={styles.txtAreaContainer}>
              <label className={styles.labelStyle} htmlFor="projectDescription">
                Description:
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
                  onClick={() => clickCreatProject()}
                  className={styles.btnCreateProject}
                >
                  CREATE PROJECT
                </button>
              </div>
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
function JobCard({ id, isFirst, removeJobCard }) {
  // Creating a state variable 'counter' with an initial value of 0. setCounter is a function that will be used to update this value
  const [counter, setCounter] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Creating a state variable 'selectedOptions' with an initial value of empty array. setSelectedOptions is a function that will be used to update this value

  // The options available for job profile selection
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobData(data.jobs);
      });
  }, []);
// console.log(jobData)


let options = [];
// console.log('options', options)

jobData.map((data, i) => {
   return options.push({ value: data._id, label: data.name })
}
)


 

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  //component for menu selection with jobs and counter for each job
  return (
    <div>
      <div className={`${styles.inputBox} ${styles.labelStyle}`}>
        <label htmlFor="jobProfile">Job Profile:</label>
        <Select
          id="jobProfile"
          className={styles.jobProfile}
          options={options}
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

