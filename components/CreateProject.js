import Link from "next/link";
import styles from "../styles/CreateProject.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import Select from 'react-select';// library to add the drop down menu with checkboxes




function CreateProject() {

  const router = useRouter();


  

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  // const [token, setToken] = useState(""); // ADDED: State for storing the user's token
  const [jobBox, setJobBox] = useState([<JobCard isFirst={true} />]);


  
  

  const clickCreatProject = () => {
    const data = {
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      // token: token, // ADDED: Including the user's token in the request body
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


// const jobCard= (   <div className={styles.jobInputContainer}>
//   <div className={`${styles.inputBox} ${styles.labelStyle}`}>
//     <label htmlFor="jobProfile">Job Profile:</label>
//     <input
//       type="text"
//       id="jobProfile"
//       className={styles.jobProfile}
//       placeholder="Enter job profile"
//     />
//   </div>
//   <div className={styles.counter}>
//     <div>
//       <button onClick={() => decrement()}>-</button>
//       <span> {counter} </span>
//       <button onClick={() => increment()}>+</button>
//     </div>
//     <button>X</button>
//   </div>
// </div>)

  


const addMemberClick = () => {
setJobBox([...jobBox, <JobCard isFirst={false}/>])
  console.log("click1111111111111111");	

};

  return (
    <div className={styles.background}>
      <div className={styles.homeContainer}>
        <div className={styles.container}>
          {/*--------------------------- Nav ------------------------------*/}
          <div className={styles.navbar}>
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
          </div>
        </div>
        {/* navbar end*/}

        {/* contien la div formContainer et txtAreaContainer */}
        <div className={styles.leftRightContainer}>
          <h1>Create Your Project</h1>
          <div className={styles.leftRight}>
            <div className={styles.formContainer}>
              {/*--------------------------- Nav ------------------------------*/}

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
                      className={styles.endStart}
                      placeholder="Enter start date"
                    />
                  </div>

                  <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      className={styles.endStart}
                      placeholder="Enter end date"
                    />

                  </div>


                </div>
                {/* input Start Date & End Date FORMS */}




                
                {/* input job Profile & member count */}
              <div className={styles.jobInputContainer}>
               {jobBox}
              </div>
              </div>
                <button onClick={() => addMemberClick()}  className={styles.addButton}>Add Member</button>


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
                maxLength="1000"
                className={styles.txtArea}
                placeholder="Enter project description"
              ></textarea>
              <div className={styles.btnCreatCountainer}>
                <button onClick={() => clickCreatProject()}  className={styles.btnCreateProject}>
                
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


function JobCard(props) {
 
  
  const [counter, setCounter] = useState(0); // initialization hook
  const [selectedOptions, setSelectedOptions] = useState([]); // initialization hook for the drop down menu with checkboxes

  const options = [
    { value: 'frontend', label: 'Développeur Frontend' },
    { value: 'backend', label: 'Développeur Backend' },
  ];
  const increment = () => {
    setCounter(counter + 1); // setting of the switch that increments the counter of the jobCard drop-down menu
  };
  
  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1); // setter parameterization that decrements the counter and prevents the counter from going below 0
    }
  };
  
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  
return (
  <div>
  <div className={`${styles.inputBox} ${styles.labelStyle}`}>
    <label htmlFor="jobProfile">Job Profile:</label>
    <Select
      id="jobProfile"
      className={styles.jobProfile}
      options={options}
      isMulti
      value={selectedOptions}
      onChange={handleSelectChange}
    />
  </div>
  <div className={styles.counter}>
    <div>
      <button onClick={() => decrement()}>-</button>
      <span> {counter} </span>
      <button onClick={() => increment()}>+</button>
    </div>
    {
      !props.isFirst && <button >X</button>
    }
  </div>
  </div>

);
}



export default CreateProject;

