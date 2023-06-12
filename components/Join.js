import styles from "../styles/Join.module.css";
import Link from "next/link";
import Button from "../components/Button";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockLocation } from "../reducers/location";
import { stockJob } from "../reducers/job";
import { stockOffer } from "../reducers/offer";
import { Document, Page, pdfjs } from "react-pdf";
import React from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function Join() {
  const [userId, setUserId] = useState("");
  const [selectProject, setSelectProject] = useState({});
  const [filterOffer, setFilterOffer] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const locations = useSelector((state) => state.location.value);
  const jobs = useSelector((state) => state.job.value);
  const offers = useSelector((state) => state.offer.value);

  // FETCHING USER'S FULL DATA
  // FETCHING ALL OFFERS FROM DATABASE
  useEffect(() => {
    fetch(`https://backend-allwithin.vercel.app/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setUserId(data._id);
      });

    fetch(`https://backend-allwithin.vercel.app/offers/allOffers`)
      .then((response) => response.json())
      .then((data) => {
        setFilterOffer(data.allOffers);
        setFilterLocation(data.allOffers);
        dispatch(stockOffer(data.allOffers));
      });

    fetch(`https://backend-allwithin.vercel.app/jobs`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(stockJob(data.jobs));
      });

    fetch(`https://backend-allwithin.vercel.app/locations/allLocation`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(stockLocation(data.locations));
      });
  }, []);

  const handleApplyBtn = (selectProject) => {
    fetch("https://backend-allwithin.vercel.app/offers/addUserIdOnOffer", {
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

  // FILTER SETUP //////////////////////
  let jobOptions = [];
  const mappingJobs = jobs.map((data, i) => {
    jobOptions.push({ value: data._id, label: data.name });
  });

  let locationOptions = [];
  const mappingLocation = locations.map((data, i) => {
    locationOptions.push({ value: data._id, label: data.name });
  });

  let filter = [];
  const handleOnChangeSelectJob = (value) => {
    if (value.length === 0) {
      setFilterOffer(offers);
    }

    if (value.length > 5) {
      return;
    }

    for (const obj of value) {
      let hold = offers.filter(
        (element) => element.offers.job.label === obj.label
      );
      for (const obj of hold) {
        if (filter.some((e) => e._id === obj._id)) {
        } else {
          filter.push(obj);
          setFilterOffer(filter);
        }
      }
    }
  };

  const handleOnChangeSelectLocation = (value) => {
    if (value.length === 0) {
      setFilterLocation(offers);
    }
    if (value.length > 5) {
      return;
    }

    for (const obj of value) {
      let hold = offers.filter(
        (element) => element.project.location.name === obj.label
      );
      for (const obj of hold) {
        if (filter.some((e) => e._id === obj._id)) {
        } else {
          filter.push(obj);
          setFilterLocation(filter);
        }
      }
    }
  };
  let fusion = filterOffer.concat(filterLocation);
  let unique = fusion.filter((element, index) => {
    return fusion.indexOf(element) !== index;
  });
  unique = unique.filter((e) => e.project.user !== userId);

  //////////////////////

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <div className={styles.selectBox}>
            <div className={styles.filterTxtContainer}>
              <span className={styles.subTxt}>Job post filter</span>
            </div>
            <Select
              isMulti
              name="jobs"
              options={jobOptions}
              className={styles.jobSelect}
              classNamePrefix="Select..."
              onChange={(e) => handleOnChangeSelectJob(e)}
            />
          </div>
          <div className={styles.selectBox}>
            <div className={styles.filterTxtContainer}>
              <span className={styles.subTxt}>Location filter</span>
            </div>
            <Select
              isMulti
              name="locations"
              options={locationOptions}
              className={styles.jobSelect}
              classNamePrefix="Select..."
              onChange={(e) => handleOnChangeSelectLocation(e)}
            />
          </div>
        </div>

        <div className={styles.filterContent}></div>

        <div className={styles.projectContainer}>
          {unique.map((data, i) => (
            <div className={styles.projectCard}>
              <div className={styles.leftCard}>
                <span className={styles.cardTitle}>{data.project.name}</span>
                <span>
                  <span className={styles.subTxt}>Location :</span>{" "}
                  {data.project.location.name}
                </span>
                <span>
                  <span className={styles.subTxt}>Job Post :</span>{" "}
                  {data.offers.job.label}
                </span>
                <span>
                  <span className={styles.subTxt}>Start date :</span>{" "}
                  {data.project.startDate}
                  {" / "}
                  <span className={styles.subTxt}>End date :</span>{" "}
                  {data.project.endDate}
                </span>
              </div>
              <div className={styles.rigthCard}>
                <a
                  className={styles.detailsBtn}
                  onClick={() => setSelectProject(data)}
                >
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
                <div className={styles.content}>
                  <h1>
                    Job Post : {""}
                    {selectProject.offers.job.label}
                  </h1>
                  <div className={styles.contentTxt}>
                    <span className={styles.subTxt}>Project desciption : </span>{" "}
                    {selectProject.project.description}
                    <span className={styles.subTxt}>Start date : </span>
                    {selectProject.project.startDate}
                    <span className={styles.subTxt}>End date : </span>
                    {selectProject.project.endDate}
                    <span className={styles.subTxt}>Location : </span>
                    {selectProject.project.location.name}
                  </div>

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
        </div>
      </div>
    </div>
  );
}

export default Join;
