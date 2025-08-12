import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function Upload() {
  const { currentUser } = useSelector((state) => state.user);
  // const user = auth ? JSON.parse(auth) : null;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(currentUser._id);
    // console.log("a");
    // console.log(currentUser.teachSclass._id);
    // console.log("a");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("user", currentUser.teachSclass._id);
    // console.log(title, file);
    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };

  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
  };

  return (
    <div className="upload-container">
      <form className="formStyle" onSubmit={handleSubmit}>
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}>
          Upload PDF
        </h2>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title...."
            value={title}
            onChange={handleTitleChange}
            style={{ width: "450px", padding: "10px", fontSize: "20px" }}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ width: "350px", padding: "10px", fontSize: "15px" }}
            required
          />
        </div>
        <div className="form-group">
          <button className="showbtn" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="uploaded">
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}>
          Uploaded PDF:
        </h2>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map(
                (data, index) =>
                  // Check if the user field value is equal to "123"
                  data.user === currentUser.teachSclass._id && (
                    <div className="inner-div" key={index}>
                      <h6>Title: {data.title}</h6>
                      <button
                        className="showbtn"
                        onClick={() => showPdf(data.pdf)}>
                        Show Pdf
                      </button>
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
