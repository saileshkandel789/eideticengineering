import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { API ,imageAPI} from "../../../config";
import Header from "../../layout/Header";
import { RecentProject } from "./RecentProject";



const ProjectDetail = (props) => {
  const [project, setProject] = useState({});
  const [image, setImage] = useState([]);

  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);


  const loadSingleProject = (projectId) => {
    axios
      .get(`${API}/project/${projectId}`)
      .then((res) => {
        setProject(res.data)
        setImage(res.data.image)
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    const projectId = props.match.params.projectId;
    // console.log(props, "pro");
    loadSingleProject(projectId);
    axios
      .get(`${API}/project`)
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err));
  
  }, [props]);

  return (
    <Fragment>
      <Header />
      <section className="pt-100 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="blog-detail-wrap">
                <h2>{project.title}</h2>
                <div className="d-flex blog-calendar">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="1x"
                    // style={{ color: "#ff5e15", marginRight: "10px" }}
                  />

                  <p>Added on {moment(project.createdAt).fromNow()}</p>
                </div>
                {image.map(p => (
                    <img
                    src={`${imageAPI}/${p}`}
                    className="img-fluid"
                    alt="ddd"
                    key={p}
                  />
                ))}
                {/* <img
                  src={`${imageAPI}/${project.image[0]}`}
                  className="img-fluid"
                  alt="ddd"
                /> */}

                <p>{project.description}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="recent-post-wrap">
                <h2>RECENT PROJECTS</h2>
                {projects.map((project) => (
                  <RecentProject
                  key={project._id}
                    id={project._id}
                    title={project.title}
                    image={project.image}
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
});

export default connect(mapStateToProps)(ProjectDetail);
