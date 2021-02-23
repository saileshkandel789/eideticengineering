import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { projectGet } from "../../../actions/contactUsActions";
import VideoList from "./AdminVideoList";
import AdminNavbar from "../adminNavbar";
import {API} from "../../../config";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

class AdminVideoLists extends Component {
    state = {
        videoList: [],
        errors: "",
      };

  componentDidMount() {
    axios
    .get(`${API}/video`)
    .then((res) =>
      this.setState({
        videoList: res.data
      })
    )
    .catch((err) => console.log(err))
  }
  
      onDelete = (id) => {
        axios
        .post(`${API}/video/${id}`)
        .then((res) =>
        axios
        .get(`${API}/video`)
        .then((res) =>
          this.setState({
            videoList: res.data
          })
        )
        .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err, "err")
        ); }
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.props.projectGet !== prevProps.projectGet) {
//       return this.props.projectGet;
//     }
//   }
// shouldComponentUpdate(prevProps){
//   if (this.props.projectGet !== prevProps.projectGet) {
//     return this.props.projectGet;
//   }
// }
  render() {
    let videolist = this.state.videoList.map((vdo) => (
      <tr key={vdo._id}>
            <td>
                <iframe width="150" height="120" src={vdo.url}>
             </iframe>
            </td>
            <td>
              <h5>{vdo.title}</h5>
            </td>
            <td>
            {/* <Link to={`/project/edit/${props.id}`}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#ff5e15", marginRight: "10px" }}
              />
            </Link> */}
            </td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "#ff5e15" }}
                onClick={() => this.onDelete(vdo._id)}
              />
            </td>
          </tr>
      // <VideoList
      //   key={vdo._id}
      //   id={vdo._id}
      //   title={vdo.title}
      //   url={vdo.url}
      // />
    ));
    return (
      <Fragment>
        <div className="admin-dashboard-section">
          
            <div className="dashboard-header">
              <h3>admin section</h3>
            </div>
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar />
              </div>
              <div className="col-md-10">
              <table className= "table" >
                <thead className= "table-head">
                  <tr className= "table-head-each">
                    <th >Video</th>
                    <th>Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {videolist}
                </tbody>
              </table>
                
                </div>
            </div>
          </div>
        

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  dashboardData: state.dashboard,
});

export default connect(mapStateToProps, {  })(AdminVideoLists);
