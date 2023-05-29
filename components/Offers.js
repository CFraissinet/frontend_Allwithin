import Link from "next/link";
import styles from "../styles/Offers.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Select from "react-select";
import Button from "../components/Button";

function Offers() {
  const router = useRouter();
  const [jobBox, setJobBox] = useState([{ id: 0, isFirst: true, jobData: [] }]);
  const [data, setData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [jobsSelected, setJobsSelected] = useState([]);

  const user = useSelector((state) => state.user.value);
  const project = useSelector((state) => state.project.value);

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

  const clickCreatProject = () => {
    console.log("project", project);
    jobsSelected.map((data) => {
      let dataPush = {
        offers: data,
        project: project[0],
      };

      fetch("http://localhost:3000/offers/newOffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPush),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    });
  };

  const addMemberClick = () => {
    setJobBox([
      ...jobBox,
      { id: jobBox.length, isFirst: false, jobData: jobData },
    ]);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1> Offers </h1>
        <div className={styles.inputContainer}>
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

        <div className={styles.buttonContainer}>
          <a onClick={() => addMemberClick()}>
            <Button
              text="Add Member"
              backgroundColor="#87c0cd"
              borderColor="#87c0cd"
              textColor="#152232"
              backgroundColorHover="#white"
              borderColorHover="#white"
              textColorHover="white"
            />
          </a>

          <Link href="/lobby">
            <a onClick={() => clickCreatProject()}>
              <Button
                text="Confirm Project"
                backgroundColor="#87c0cd"
                borderColor="#87c0cd"
                textColor="#152232"
                backgroundColorHover="#white"
                borderColorHover="#white"
                textColorHover="white"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function JobCard({ id, isFirst, removeJobCard, addJobToParent }) {
  // Creating a state variable 'selectedOptions' with an initial value of empty array. setSelectedOptions is a function that will be used to update this value
  const [selectedOptions, setSelectedOptions] = useState([]);
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

  return (
    <div className={styles.inputComponent}>
      <label className={styles.labelStyle}>Job Profile:</label>
      <div className={styles.inputBox}>
        <Select
          id="jobProfile"
          className={styles.input}
          options={jobData}
          value={selectedOptions}
          onChange={handleSelectChange}
        />
        {!isFirst && (
          <FontAwesomeIcon
            className={styles.removeBtn}
            onClick={() => removeJobCard(id)}
            icon={faXmark}
            style={{ color: "white" }}
          />
        )}
      </div>
    </div>
  );
}

export default Offers;
