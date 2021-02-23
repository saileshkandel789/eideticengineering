import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AdminNavbar from "../adminNavbar";
import {API} from "../../../config";
import axios from "axios";

class BookNowUs extends Component {
    state = {
        list : []
    }
    componentDidMount() {
        axios
        .get(`${API}/booknow`)
        .then((res) =>
          this.setState({
            list: res.data
          })
        )
        .catch((err) => console.log(err))
      }

  render() {
    let booklist = this.state.list.map((book) => (
        <div className="col-md-4 col-sm-6 " key= {book._id}>
            <div className="contactbox">
                <div className="contact-info">
                <h3>name : {book.name}</h3>
                <p>email: {book.email}</p>
                <p>phone no : {book.phone}</p>
                <p>message : {book.message}</p>
                <p>location: {book.location}</p>
                <p>address : {book.address}</p>
                service :
                    {book.service.map(booo => (
                        <span> {booo} ,</span>
                    ))}
                </div>
            </div>
        </div>
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
                <div className="container">
                  <div className="row">{booklist}</div>
                </div>
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

export default connect(mapStateToProps, {  })(BookNowUs);
