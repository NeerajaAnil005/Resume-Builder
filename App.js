import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const getAISuggestions = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/suggest", {
        content: `
        Name: ${name}
        Email: ${email}
        Skills: ${skills}
        Experience: ${experience}
        `
      });

      setSuggestions(response.data.suggestions);
    } catch (error) {
      alert("AI request failed");
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save("Resume.pdf");
  };

  return (
    <div style={{ display: "flex", padding: "40px", gap: "40px" }}>
      
      {/* FORM SECTION */}
      <div style={{ width: "40%" }}>
        <h2>Resume Form</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={getAISuggestions}>
          Get AI Suggestions
        </button>

        <br /><br />

        <button onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      {/* PREVIEW SECTION */}
      <div
        id="resume-preview"
        style={{
          width: "60%",
          padding: "20px",
          border: "1px solid #ccc",
          background: "#fff"
        }}
      >
        <h1>{name}</h1>
        <p>{email}</p>

        <h3>Skills</h3>
        <p>{skills}</p>

        <h3>Experience</h3>
        <p>{experience}</p>

        {suggestions && (
          <>
            <h3>AI Improved Version</h3>
            <p>{suggestions}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;