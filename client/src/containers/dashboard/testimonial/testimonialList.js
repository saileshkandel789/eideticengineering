import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AdminNavbar from "../adminNavbar";
import axios from "axios";
import {API ,imageAPI} from "../../../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
class TestimonialList extends Component {
    state = {
        list : []
    }
    componentDidMount() {
        axios
        .get(`${API}/testimonial`)
        .then((res) =>
          this.setState({
            list: res.data
          })
        )
        .catch((err) => console.log(err))
      }
  
      onDelete = (id) => {
        axios
        .post(`${API}/testimonial/${id}`)
        .then((res) =>
        axios
        .get(`${API}/testimonial`)
        .then((res) =>
          this.setState({
            list: res.data
          })
        )
        .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err, "err")
        ); }

  render() {
    let testimoniallist = this.state.list.map((testi) => (
        <tr  key={testi._id}>
        <td>
          <img
              className="img-fluid"
              src={`${imageAPI}/${testi.image}`}
              style={{ width: "100px" }}
            />
        </td>
        <td>
          <h5>{testi.name}</h5>
        </td>
        <td>
          <Link to={`/testimonial/edit/${testi._id}`}>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ color: "#ff5e15", marginRight: "10px" }}
            />
          </Link>
        </td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#ff5e15" }}
            onClick={() => this.onDelete(testi._id)}
          />
        </td>
      </tr>
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
                    <th >Image</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {testimoniallist}
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

export default connect(mapStateToProps, {  })(TestimonialList);
