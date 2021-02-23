import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { API ,imageAPI } from "../../../config";
import Header from "../../layout/Header";
import { RecentService } from "./RecentService";

const ServiceDescription = (props) => {
  const [service, setService] = useState({});
  // const [count, setCount] = useState(1);

  const [error, setError] = useState(false);

  const loadSingleService = (serviceId) => {
    
    axios
      .get(`${API}/service/${serviceId}`)
      .then((res) => {
        setService(res.data)
      })
      .catch((err) => setError(err));
  };

  

  useEffect(() => {
    console.log(service.title,'serv');
    const serviceId = props.match.params.serviceId;
    console.log(serviceId, "pro");
    axios
      .get(`${API}/service/${serviceId}`)
      .then((res) => {
        setService(res.data)

      }).catch((err) => setError(err))
   

    // console.log(service, "srv");

  }, [props]);
useEffect(() => {
  const serviceId = props.match.params.serviceId;

  

})
  return (
    <Fragment>
      <Header />
      <section className="pt-100 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="blog-detail-wrap">
                <h2>{service.title}</h2>
                {/* <h2>{count}</h2> */}

                <div className="d-flex blog-calendar">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="x"
                    // style={{ color: "#ff5e15", marginRight: "10px" }}
                  />

                  <p>Added on {moment(service.createdAt).fromNow()}</p>
                </div>

                <img
                  src={`${imageAPI}/${service.image}`}
                  className="img-fluid"
                  alt="ddd"
                />

                <p>{service.short_description}</p>
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
                {/* <p>{service.description}</p> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="recent-post-wrap">
                <h2>RECENT POSTS</h2>
                {props.dashboardData.serviceData.map((service) => (
                  <RecentService
                    id={service._id}
                    title={service.title}
                    image={service.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  dashboardData: state.dashboard,
  auth: state.auth,
});

export default connect(mapStateToProps)(ServiceDescription);
