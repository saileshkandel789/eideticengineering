import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { GET_ERRORS } from "../../../actions/types";
import axios from "axios";
import { API } from "../../../config";
import Header from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import AdminNavbar from "../adminNavbar";
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";

class AddVideo extends Component {
  state = {
    _id: "",
    title: "",
    url: "",
    errors: "",
  };

  onSubmit = this.onSubmit.bind(this);

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // componentDidMount() {
  //   if (this.props.match.params && this.props.match.params.videoId) {
  //     axios
  //       .get(`${API}/video/${this.props.match.params.videoId}`)
  //       .then((res) =>
  //         this.setState({
  //           title: res.data.title,
  //           description: res.data.description,
  //           _id: res.data._id,
  //         })
  //       )
  //       .catch((err) => console.log(err));
  //   }
  // }
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors });
  //     }
  //   }

  onSubmit(e) {
    e.preventDefault();
    const variables = {
      title: this.state.title,
      url: this.state.url,
    }

    axios
      .post(`${API}/video`, variables)
      .then((res) => { 
        this.setState({title: "",url : ""})
      }
      )
      .catch((err) => console.log(err));
  }
   

  render() {
    const { errors } = this.state;
    // console.log(this.props, "prop");


    return (
      <Fragment>
        
        <div className="admin-dashboard-section">
          {/* <div className="container"> */}
            <div className="dashboard-header">
              <h3>admin section</h3>
            </div>
            <div className="row">
              <div className="col-md-2">
                <AdminNavbar />
              </div>
              <div className="col-md-10">
                <div className="contact-wrap">
                  <h3 className="large ">
                    {this.props.match.params.videoId ? "Edit Video" : "Add Video"}
                  </h3>

                  <form className="form" onSubmit={this.onSubmit}>
                    <div className="row">
                    <div className="form-group col-md-10 col-sm-10">
                        <input
                          type="text"
                          placeholder="youtube url"
                          name="url"
                          value={this.state.url}
                          onChange={this.onChange.bind(this)}
                        />
                    
                        </div>
                      <div className="form-group col-md-10 col-sm-10">
                        <input
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={this.state.title}
                          onChange={this.onChange.bind(this)}
                        />
                      </div>
                      
                     
                      <div className=" col-md-12 ">
                        <input type="submit" className="btn " value="Submit" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>

      </Fragment>
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(AddVideo));
