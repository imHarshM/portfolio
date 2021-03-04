import React, { useState } from "react";
import useWindowDimensions from "../utils/WindowDimension";
// import { postData } from "../utils/Method";
import axios from "axios";

const Contact = ({ show }) => {
  const [contactData, setContactData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [emailError, setEmailError] = useState(true);
  // const [nameError, setNameError] = useState(true);
  const { width } = useWindowDimensions();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
    // setEmailError(validate(contactData).email);
    // setNameError(validate(contactData).name);
    Object.keys(validate(contactData)).length ? setSubmitDisabled(true) : setSubmitDisabled(false);
  };

  const validate = (contactData) => {
    //Email errors
    const errors = {};
    if (!contactData.email) {
      errors.email = "Check Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contactData.email)) {
      errors.email = "Invalid email address";
    }
    //Name Errors
    if (!contactData.name || contactData.name.length < 6) {
      errors.name = "Please enter fullname";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const API_PATH = "/contact.php";

    axios({
      method: "post",
      mode: "no-cors",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: contactData,
    })
      .then((res) => {
        setSuccessMsg("Thanks, your message is sent successfully.");
        console.log("data1" + res);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error.message);
      });
  };

  return (
    <div
      className={`card-inner animated ${
        width > 1023 ? (show ? "fadeInLeft active" : "fadeOutLeft hidden") : ""
      }`}
      id="contact-card"
    >
      <div className="card-wrap">
        <div className="content contacts">
          <div className="title">
            <span className="first-word">Get</span> in Touch
          </div>

          <div className="row">
            <div className="col col-xl-12 col-md-12 col-sm-12 border-line-v">
              <div id="social-test">
                <ul className="social">
                  <li className="linkedin">
                    <a
                      href="https://www.linkedin.com/in/imharshm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="github">
                    <a href="https://github.com/imHarshM" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="jsfiddle">
                    <a
                      href="https://jsfiddle.net/user/imharshm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-jsfiddle" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="twitter">
                    <a
                      href="https://twitter.com/imharshm_"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="instagram">
                    <a
                      href="https://www.instagram.com/imharshm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="facebook">
                    <a
                      href="https://facebook.com/imharshm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="map-marker">
                    <a
                      href="https://www.google.co.in/maps/contrib/109147557342255815295/contribute/@19.7474337,73.6666569,8z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=en%26authuser=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="youtube">
                    <a
                      href="https://www.youtube.com/channel/UCdgTDgicQbRDMWNEnCNW9JA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="whatsapp">
                    <a href="https://wa.me/919730614181" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-whatsapp" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="phone">
                    <a href="tel:+919730614181">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="envelope-o">
                    <a href="mailto:hmahajan38@gmail.com">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>

        <div className="content contacts">
          <div className="title">
            <span className="first-word">Contact</span> Form
          </div>

          <div className="row">
            <div className="col border-line-v">
              <div className="contact_form">
                {errorMsg && (
                  <div className="alert-error">
                    <p>{errorMsg}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="alert-success">
                    <p>{successMsg}</p>
                  </div>
                )}
                <form
                  id="contact-form"
                  method="post"
                  noValidate="novalidate"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col col-xl-6 col-md-6 col-sm-12">
                      <div className="group-val">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={contactData.name || ""}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col col-xl-6 col-md-6 col-sm-12">
                      <div className="group-val">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email Address"
                          value={contactData.email || ""}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col col-xl-12 col-md-12 col-sm-12">
                      <div className="group-val">
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          value={contactData.message || ""}
                          onChange={(e) => handleChange(e)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="align-left">
                    <button type="submit" disabled={submitDisabled}>
                      <span className="text">Send Message</span>
                      <span className="arrow"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
