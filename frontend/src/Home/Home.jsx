import { useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, showData] = useState("");

  const handleWrite = async () => {
    try {
      const response = await axios.post("http://localhost:3000/writedata", {
        name: name,
        address: address,
        message: message,
      });

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while saving the file");
    }
  };

  const handleRead = async () => {
    try {
      const response = await axios.get("http://localhost:3000/readdata");

      if (response.data.success) {
        showData(response.data.data);
        console.log(response.data.data);
      } else {
        alert("Failed to read data");
      }
    } catch (error) {
      console.log(error);
      alert("Error reading data");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post("http://localhost:3000/deletefile");
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="container">
      <div className="opsContainer">
        <h1 className="heading">File Operation Demonstration</h1>

        <h2>Read File</h2>
        <div className="readfile">
          <button onClick={handleRead}>Read</button>
          <p>{data}</p>
        </div>

        <h2>Write file</h2>
        <div className="writefile">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            required
          />
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
            required
          ></textarea>
          <button onClick={handleWrite}>Write</button>
        </div>

        <h2>Delete file</h2>
        <div className="deletefile">
          {/* <p>filename</p> */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
