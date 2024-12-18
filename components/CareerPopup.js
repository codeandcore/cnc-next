import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

const CareerPopup = ({ BASE_URL, isVisible, onClose, title, CareerpageData }) => {
    const [fileName, setFileName] = useState('Upload CV/Resume *');
    const [captcha, setCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        shortlisted: '',
        resume: '',
        code: '',
        jobtitle: title, 
    });
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');
    const router = useRouter();
    const [userIp, setUserIp] = useState('');
    const [userCountry, setUserCountry] = useState('');

    const getUserIp = () => {
        axios
            .get('https://api.ipify.org?format=json')
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (file) {
            if (validFileTypes.includes(file.type)) {
                setFileName(file.name);
                setFormData({ ...formData, resume: file });
                setFileError('');
            } else {
                setFileName('Upload CV/Resume *');
                setFormData({ ...formData, resume: '' });
                setFileError('Only PDF or DOC files are allowed');
            }
        } else {
            setFileName('Upload CV/Resume *');
            setFormData({ ...formData, resume: '' });
        }
    };

    const generateCaptcha = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    useEffect(() => {
        setCaptcha(generateCaptcha());
        getUserIp();
    }, []);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            jobtitle: title,
        }));
    }, [title]);

    const handleRegenerateCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? e.target.files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        const queryParams1 = new URLSearchParams(router.query);
        formData.jobtitle = title;
        formData.ip = userIp;
        formData.country = userCountry;
        formData.source = queryParams1.get('source');
        formData.from_page = router.pathname;
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const formDataToSend = new FormData();
                for (const key in formData) {
                    if (key === 'resume') {
                        formDataToSend.append(key, formData[key], formData[key].name);
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
                const response = await fetch(`${BASE_URL}/wp-json/custom/v1/apply-job`, {
                    method: 'POST',
                    body: formDataToSend,
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLoading(false);
                window.location.href = '/thankyou';
            } catch (error) {
                setLoading(false);
                console.error('Error submitting form:', error);
            }
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!/^\d{9,10}$/.test(data.phone)) {
            errors.phone = 'Phone number should be 9 to 10 digits';
        }
        if (!data.experience.trim()) {
            errors.experience = 'Experience is required';
        }
        if (!data.shortlisted.trim()) {
            errors.shortlisted = 'Shortlisted details are required';
        }
        if (!data.resume) {
            errors.resume = 'Resume is required';
        }

        if (!data.code || !data.code.trim()) {
            errors.code = 'Captcha code is required';
        } else if (data.code !== captcha) {
            errors.code = 'Captcha code is incorrect';
        }
        return errors;
    };

    return (
        <section className={`careerpopup ${isVisible ? 'open' : ''}`}>
            <div className="bg" onClick={onClose}></div>
            <div className="inner">
                <div className="close" onClick={onClose}>
                    x
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="top_ban">
                        <h2 dangerouslySetInnerHTML={{ __html: CareerpageData.acf.jon_opening_title }}></h2>
                        <p dangerouslySetInnerHTML={{ __html: CareerpageData.acf.job_form_content }}></p>
                    </div>
                    <div className="contents">
                        <div className="colin d_flex">
                            <input
                                type="text"
                                id="name"
                                placeholder={CareerpageData.acf.job_form_name_placeholder}
                                name="name"
                                className={`in ${errors.name ? 'error' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                id="email"
                                placeholder={CareerpageData.acf.job_form_email_placeholder}
                                name="email"
                                className={`in ${errors.email ? 'error' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="colin d_flex">
                            <input
                                type="text"
                                id="phone"
                                placeholder={CareerpageData.acf.job_form_phone_placeholder}
                                name="phone"
                                className={`in ${errors.phone ? 'error' : ''}`}
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <select
                                className={`in ${errors.experience ? 'error' : ''}`}
                                name="experience"
                                id="experience"
                                value={formData.experience}
                                onChange={handleChange}
                            >
                                <option value="">Select your Experience</option>
                                {CareerpageData.acf.job_form_experience_options.map((job, index) => (
                                    <option key={index} value={job.option}>
                                        {job.option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <textarea
                            placeholder={CareerpageData.acf.job_form_description_placeholder}
                            name="shortlisted"
                            className={`in ${errors.shortlisted ? 'error' : ''}`}
                            value={formData.shortlisted}
                            onChange={handleChange}
                        ></textarea>
                        <div className="colin d_flex">
                            <div className="custom-file-input field">
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    className="file-input"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                                <label htmlFor="resume" className={`file-label ${errors.resume ? 'error' : ''}`}>
                                    <span>{CareerpageData.acf.job_form_resume_placeholder}</span>
                                </label>
                                <span className="file-name">{fileName}</span>
                                {fileError && <span className="error-message">{fileError}</span>}
                            </div>
                            <div className="captcha-container field">
                                <input
                                    type="text"
                                    id="code"
                                    placeholder={CareerpageData.acf.job_form_captcha_placeholder}
                                    name="code"
                                    className={`in ${errors.code ? 'error' : ''}`}
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                                <div className="captcha">{captcha}</div>
                                <button type="button" className="regenerate-btn" onClick={handleRegenerateCaptcha}>
                                    <Image height={20}
                    width={20} src="/images/rotate-right.png" alt="rotate-right" />
                                </button>
                            </div>
                        </div>
                        <input type="hidden" className="job-title" value={title} name="jobtitle" />
                        <div className="subk">
                            <button type="submit" className="btn sub" disabled={loading}>
                                {loading ? (
                                    <span className="loaderdata" style={{ display: loading ? 'inline-flex' : 'none' }}>
                                        <Image height={20}
                    width={20} src="/images/sync.png" alt="rotate-right" />
                                    </span>
                                ) : (
                                    <em>{CareerpageData.acf.job_form_submit_text}</em>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CareerPopup;
