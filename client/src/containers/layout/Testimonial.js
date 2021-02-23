import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import RameshKharel from "../../images/rameshkharel.jpg";
// import Sdhungel from "../../images/sdhungel.jpg";
// import Suvasrimal from "../../images/suvasrimal.jpg";
import axios from "axios";
import {imageAPI ,API} from "../../config";

export default class Testimonial extends Component {
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
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
      ],
    };
    return (
      <section id="testimonial">
        <div className="container">
          {/* <div className="row"> */}
          <h2>WHAT CLIENTS SAYS? </h2>
          <div className="testi-slider-wrap">
            <Slider {...settings}>
              {this.state.list.map(li => (
                  <div className="testi-box-wrap">
                  <div className="testi-box">
                    <div className="testi-img">
                      <img
                        src={`${imageAPI}/${li.image}`}
                        alt="client"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="testi-info">
                      <h3>{li.name}</h3>
                      <p>
                        {li.description}
                      </p>
                      <span className="">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </div>
                  </div>
                </div>)
              )}
            {/* <div className="testi-box-wrap">
                <div className="testi-box">
                  <div className="testi-img">
                    <img
                      src={Suvasrimal}
                      alt="client"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="testi-info">
                    <h3>"Suvas Rimal"</h3>
                    <p>
                      I had a great experience to work with Eidetic Engineering.They possess sound & expertise in design as well as construction.I am pleased with their output in case of my party palace design & construction. - Director mahadevsthan Banquet
                    </p>
                    <span className="">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="testi-box-wrap">
                <div className="testi-box">
                  <div className="testi-img">
                    <img
                      src={Sdhungel}
                      alt="client"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="testi-info">
                    <h3>"S. dhungel"</h3>
                    <p>
                      Well with Eidetic engineering , I had my 2.5 storeyed steel building completed at Sallaghari. I am satisfied with their team spirit & wish all the best to the team.
                    </p>
                    <span className="">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="testi-box-wrap">
                <div className="testi-box">
                  <div className="testi-img">
                    <img
                      src={RameshKharel}
                      alt="client"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="testi-info">
                    <h3>"Ramesh Kharel"</h3>
                    <p>
                      They have a good design team. I am satisfied with the prefab house design they have done for me. Keep up the good work.
                    </p>
                    <span className="">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                </div>
              </div> */}
              
            </Slider>
          </div>
        </div>
        {/* </div> */}
      </section>
    );
  }
}
