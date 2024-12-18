import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const HirePopup = ({
  BASE_URL,
  isVisible,
  onClose,
  title,
  content,
  contact_form_service_label,
  contact_form_service_list,
  contact_form_budget_label,
  contact_form_budget_list,
  className,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    website: "",
    title: title,
    projectDescription: "",
    service: [],
    budget: "",
  });

  const [errors, setErrors] = useState({});
  const [showChooseYour, setShowChooseYour] = useState(false);
  const [showProjectBudget, setShowProjectBudget] = useState(false);
  const router = useRouter();
  const [userIp, setUserIp] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const generateCaptcha = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedServices = checked
        ? [...formData.service, value]
        : formData.service.filter((service) => service !== value);
      setFormData({
        ...formData,
        service: updatedServices,
      });
    } else if (type === "radio") {
      setFormData({
        ...formData,
        budget: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTextareaKeyPress = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.length > 2) {
      setShowChooseYour(true);
    } else {
      setShowChooseYour(false);
      setShowProjectBudget(false);
      setFormData((prevData) => ({
        ...prevData,
        service: [], 
      }));
    }
  };

  const getUserIp = () => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        if (response && response.data && response.data.ip) {
          setUserIp(response.data.ip);
          axios
            .get(`https://ipapi.co/${response.data.ip}/json/`)
            .then((res) => {
              setUserCountry(res.data.country_name);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData); 
    setErrors(validationErrors);

    const queryParams1 = new URLSearchParams(router.query); 
    formData.ip = userIp;
    formData.country = userCountry;
    formData.source = queryParams1.get("source");
    formData.from_page = router.pathname;

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/wp-json/custom/v1/contact-form`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoading(false);
        router.push("/thankyou"); 
      } catch (error) {
        setLoading(false);
        console.error("Error submitting form:", error);
      }
    } else {
      handleSmoothScroll();
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.code || !data.code.trim()) {
      errors.code = "Captcha code is required";
    } else if (data.code !== captcha) {
      errors.code = "Captcha code is incorrect";
    }
    if (!data.name || !data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email || !data.email.trim()) {
      errors.email = "Email is required";
    }
    if (!data.phone || !data.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{9,10}$/.test(data.phone)) {
      errors.phone = "Phone number should be 9 to 10 digits";
    }

    if (data.service.length === 0) {
      errors.checkbox = "At least one service must be selected";
    }
    if (!data.budget) {
      errors.budget = "Please select a budget option";
    }

    return errors;
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
    getUserIp();
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: title,
    }));
  }, [title]);

  const handleSmoothScroll = () => {
    const section = document.querySelector(".hire_popup .contents");
    if (section) {
      section.scrollIntoView({
        top: 0,
        behavior: "auto",
      });
    }
  };

  return (
    <section className={`hire_popup ${className} ${isVisible ? "open" : ""}`}>
      <div className="bg" onClick={onClose}></div>
      <div className="inner">
        <div className="close" onClick={onClose}>
          x
        </div>
        <form onSubmit={handleSubmit}>
          <div className="top_ban">
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </div>
          <div className="contents">
            <div className="middle_ban">
              <div className="colin d_flex">
                <input
                  type="text"
                  id="name"
                  placeholder="Name & Company*"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`in ${errors.name ? "error" : ""}`}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`in ${errors.email ? "error" : ""}`}
                />
              </div>
              <div className="colin d_flex">
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`in ${errors.phone ? "error" : ""}`}
                  pattern="[0-9]{9,10}"
                />
                <input
                  type="text"
                  placeholder="Please add your website here"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`in ${errors.website ? "error" : ""}`}
                />
              </div>
              <textarea
                placeholder="Tell us more about your project :"
                name="projectDescription"
                onChange={handleTextareaKeyPress}
                className="in"
              ></textarea>
            </div>
            {contact_form_service_list && showChooseYour && (
              <div className="choose_your">
                {contact_form_service_label && <h3>{contact_form_service_label}</h3>}
                {contact_form_service_list && (
                  <div className="col d_flex d_flex_js">
                    {contact_form_service_list.map((service, index) => (
                      <label htmlFor={`checkbox${index}`} key={index}>
                        <input
                          type="checkbox"
                          id={`checkbox${index}`}
                          name="service"
                          checked={formData.service.includes(service.label)}
                          onChange={handleChange}
                          value={service.label}
                        />
                        {service.label}
                      </label>
                    ))}
                    {errors.checkbox && <span className="error-msg">{errors.checkbox}</span>}
                  </div>
                )}
              </div>
            )}
            {contact_form_budget_list && showChooseYour && (
              <div className="project_budget">
                {contact_form_budget_label && <h3>{contact_form_budget_label}</h3>}
                <div className="col d_flex d_flex_js">
                  {contact_form_budget_list.map((service, index) => {
                    const checkboxId = `radio${index + 1}`;
                    return (
                      <label htmlFor={checkboxId} key={index}>
                        <input
                          type="radio"
                          id={checkboxId}
                          name="budget"
                          checked={formData.budget === service.label}
                          onChange={handleChange}
                          value={service.label}
                        />
                        {service.label}
                      </label>
                    );
                  })}
                  {errors.budget && <span className="error-msg">{errors.budget}</span>}
                </div>
                <div className="captcha-container">
                  <input
                    type="text"
                    id="code"
                    placeholder="Input this code"
                    name="code"
                    className={`in ${errors.code ? "error" : ""}`}
                    value={formData.code}
                    onChange={handleChange}
                  />
                  <div className="captcha">{captcha}</div>
                  <button
                    type="button"
                    className="regenerate-btn"
                    onClick={handleRegenerateCaptcha}
                  >
                    <Image
                      src="/public/images/rotate-right.png"
                      alt="rotate-right"
                      width={100}  
                      height={100} 
                    />
                  </button>
                </div>
                <input
                  type="hidden"
                  className="title"
                  value={title}
                  name="title"
                />
                <button
                  type="submit"
                  onClick={handleSmoothScroll}
                  className="btn sub"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loaderdata" style={{ display: "inline-flex" }}>
                      <Image  
                width={100}  
                height={100}  src="/public/images/sync.png" alt="rotate-right" />
                    </span>
                  ) : (
                    <em>Submit</em>
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default HirePopup;
