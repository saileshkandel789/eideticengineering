import React from "react";
import { Link } from "react-router-dom";
import {imageAPI} from "../../../config";


export const RecentProject = (props) => {
  return (
    <Link to={`/project/${props.id}`}>
      <div className="post-box-recent">
        <img
          className="img-fluid"
          src={`${imageAPI}/${props.image[0]}`}
        />
        <h6>{props.title}</h6>
      </div>
    </Link>
  );
};
