import "../styles/Topbar.css";
import CallIcon from "@material-ui/icons/Call";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <div className="topbar__contactInfo">
          <CallIcon />
          <p>Call us: +91-123456789 </p>
        </div>
        <div className="topbar__timing">
          <AccessTimeIcon />
          <p>All week from 7 A.M to 7 P.M</p>
        </div>
      </div>
      <div className="topbar__right">
        <ul>
          <li>
            <a href="#">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <YouTubeIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
