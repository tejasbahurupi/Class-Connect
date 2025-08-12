import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function Showpdf() {
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
    console.log(currentUser._id);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("user", currentUser._id);
    console.log(title, file);
    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(result);
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
      <div className="uploaded">
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Uploaded PDF:
        </h2>
        <div className="output-div">
        
          {allImage == null
            ? ""
            : allImage.map(
                (data, index) =>
                  // Check if the user field value is equal to "123"
                  data.user === currentUser.sclassName._id && (
                    <div className="inner-div" key={index}>
                      <h5>Title: {data.title}</h5>
                      <button
                        className="showbtn"
                        onClick={() => showPdf(data.pdf)}
                      >
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

export default Showpdf;
