import styles from "../styles/Join.module.css";
import Link from "next/link";
import Button from "../components/Button";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockLocation } from "../reducers/location";
import { stockJob } from "../reducers/job";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "react-modal";
import React from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function Join() {
  const [allOffers, setAllOffers] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectProject, setSelectProject] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [allLocation, setAllLocation] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const locations = useSelector((state) => state.location.value);
  const jobs = useSelector((state) => state.job.value);

  // FETCHING USER'S FULL DATA
  // FETCHING ALL OFFERS FROM DATABASE
  useEffect(() => {
    fetch(`http://localhost:3000/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userData);
      });

    fetch(`http://localhost:3000/offers/allOffers`)
      .then((response) => response.json())
      .then((data) => {
        setAllOffers(data.allOffers);
      });

    fetch(`http://localhost:3000/jobs`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(stockJob(data.jobs));
      });

    fetch(`http://localhost:3000/locations/allLocation`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(stockLocation(data.locations));
      });
  }, []);

  const handleChangeFirstname = (firstname) => {
    setUserData({ ...userData, firstname });
  };

  const handleChangeName = (name) => {
    setUserData({ ...userData, name });
  };

  const handleChangeEmail = (email) => {
    setUserData({ ...userData, email });
  };

  const handleChangePhone = (phone) => {
    setUserData({ ...userData, phone });
  };

  const handleApplyBtn = (selectProject) => {
    fetch("http://localhost:3000/offers/addUserIdOnOffer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        offerId: selectProject.offers.job.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
      });
  };

  const signInToApply = () => {
    location.href = "/signIn";
  };

  let jobOptions = [];
  const mappingJobs = jobs.map((data, i) => {
    jobOptions.push({ value: data._id, label: data.name });
  });

  let locationOptions = [];
  const mappingLocation = locations.map((data, i) => {
    locationOptions.push({ value: data._id, label: data.name });
  });

  //   const handleOnChangeSelectJob = (value) => {

  // let filteredOffer = allOffers.filter(element => element.)
  //     }
  //   };
  console.log("all offers", allOffers);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <Select
            isMulti
            name="jobs"
            options={jobOptions}
            className={styles.jobSelect}
            classNamePrefix="Select..."
            onChange={(e) => handleOnChangeSelectJob(e)}
          />

          <Select
            isMulti
            name="locations"
            options={locationOptions}
            className={styles.jobSelect}
            classNamePrefix="Select..."
            // onChange={(e) => handleOnChangeSelectJob(e)}
          />
        </div>

        <div className={styles.filterContent}></div>

        <div className={styles.projectContainer}>
          {allOffers.map((data, i) => (
            <div className={styles.projectCard}>
              <div className={styles.leftCard}>
                <span className={styles.cardTitle}>{data.project.name}</span>
                <span>Offer : {data.offers.job.label}</span>
                <span>
                  Start {data.project.start_date} End date :{" "}
                  {data.project.end_date}
                </span>
              </div>
              <div className={styles.rigthCard}>
                <a onClick={() => setSelectProject(data)}>
                  <Button
                    text="More details"
                    backgroundColor="#87c0cd"
                    borderColor="#87c0cd"
                    textColor="#152232"
                    backgroundColorHover="#87c0cd"
                    borderColorHover="#87c0cd"
                    textColorHover="white"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.projectContent}>
          {selectProject.offers
            ? [
                <div>
                  <h1>
                    Offer available : {""}
                    {selectProject.offers.job.label}
                  </h1>
                  <p>
                    Project desciption : {selectProject.project.description}
                  </p>
                  <p>Start {selectProject.project.start_date}</p>
                  <p>End date : {selectProject.project.end_date}</p>

                  {user.token
                    ? [
                        <a
                          className={styles.applyBtn}
                          onClick={() => handleApplyBtn(selectProject)}
                        >
                          <Button
                            text="Apply"
                            backgroundColor="#87c0cd"
                            borderColor="#87c0cd"
                            textColor="#152232"
                            backgroundColorHover="#87c0cd"
                            borderColorHover="#87c0cd"
                            textColorHover="white"
                          />
                        </a>,
                      ]
                    : [
                        <Link href="/signIn">
                          <div className={styles.applyBtn}>
                            <Button
                              text="Sign in to apply"
                              backgroundColor="#87c0cd"
                              borderColor="#87c0cd"
                              textColor="#152232"
                              backgroundColorHover="#87c0cd"
                              borderColorHover="#87c0cd"
                              textColorHover="white"
                            />
                          </div>
                        </Link>,
                      ]}
                </div>,
              ]
            : [<h1>Select a project</h1>]}

          {/* {user.token
            ? [
                <a
                  className={styles.applyBtn}
                  onClick={() => handleApplyBtn(selectProject)}
                >
                  <Button
                    text="Apply"
                    backgroundColor="#87c0cd"
                    borderColor="#87c0cd"
                    textColor="#152232"
                    backgroundColorHover="#87c0cd"
                    borderColorHover="#87c0cd"
                    textColorHover="white"
                  />
                </a>,
              ]
            : [
                <Link href="/signIn">
                  <div className={styles.applyBtn}>
                    <Button
                      text="Sign in to apply"
                      backgroundColor="#87c0cd"
                      borderColor="#87c0cd"
                      textColor="#152232"
                      backgroundColorHover="#87c0cd"
                      borderColorHover="#87c0cd"
                      textColorHover="white"
                    />
                  </div>
                </Link>,
              ]} */}
        </div>
      </div>
    </div>
  );
}

export default Join;
