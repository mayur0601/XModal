import "./App.css";
import { useState,useRef,useEffect } from "react";

export default function App() {
  const [formVisible, setFormVisible] = useState(false);

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modal = useRef(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        setFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openForm = () => {
    setFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(inputData.phone)) {
      alert("Invalid phone number. Please enter a valid 10-digit phone number");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(inputData.dob);
    if (selectedDate >= currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

      setInputData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  }

  return (
      <div
        className="background"
        style={{ backgroundColor: `${formVisible ? "#7f7f7f" : "#fff"}` }}
      >
      <div className={`${formVisible ? "disabled" : ""}`}>
        <h1>User Details Modal</h1>
        <button onClick={openForm}>Open Form</button>
      </div>

        {formVisible &&  <div ref={modal} className="modal">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
          <h1>Fill Details</h1>
          <label htmlFor="username" className="block">Username:</label>
          <input 
            type="text" 
            className="block"
            id="username"
            value={inputData.username}
            onChange={(e)=>setInputData({...inputData, username:e.target.value})}
            required
            />

            <label htmlFor="email" className="block">Email Address:</label>
            <input 
              type="email" 
              className="block"
              id="email"
              value={inputData.email}
              onChange={(e)=>setInputData({...inputData, email:e.target.value})}
              required
              />


            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={inputData.phone}
              onChange={(e) => {
                  setInputData({ ...inputData, phone: e.target.value });
              }}
              required
            />
            <label htmlFor="dob" className="block">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="block"
              value={inputData.dob}
              onChange={(e) => {
                  setInputData({ ...inputData, dob: e.target.value });
              }}
              required
            />

            <button className="submit-button" type="submit">
              Submit
            </button>
            </form>
        </div>
      </div>}
    </div>
  );
}
