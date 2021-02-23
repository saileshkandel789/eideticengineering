import React , {Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API } from "../../../config";
import Header from "../../layout/Header";
import {Footer} from "../../layout/Footer";





class VideoHome extends React.Component {

    state = {
      videoList: []
    }
  

  componentDidMount() {
    
      axios.get(`${API}/video`).then(res => {
        this.setState({
          videoList: res.data
        });
      });
    
  }

  render() {

    const videos = this.state.videoList.map(video => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-5" key={video._id}>
            <iframe  src={video.url}>
            </iframe>
        </div>
      );
    });

    return (
        <Fragment>
            <Header/>
            <section className="videohome">
                <div className="container ">
                <h2 style= {{textAlign:"center", marginBottom: "30px"}}> Our Videos</h2>

                <div className="streams row">
                    {videos}

                </div>
                </div>
            </section>
            <Footer/>
        </Fragment>
    );
  }
}

export default VideoHome;