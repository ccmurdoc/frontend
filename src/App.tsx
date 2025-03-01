import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://attendancetracker-1b7022d6ac82.herokuapp.com/"; // Replace with your actual Heroku backend URL

type Student = {
  id: number;
  name: string;
  attended: boolean;
};

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/students`)
        .then(response => setStudents(response.data))
        .catch(error => console.error("Error fetching students:", error));
  }, []);

  const markAttendance = () => {
    axios.post(`${BACKEND_URL}/students`, { name, attended: true })
        .then(() => {
          setStudents([...students, { id: students.length + 1, name, attended: true }]);
          setName("");
        })
        .catch(error => console.error("Error marking attendance:", error));
  };

  return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Student Attendance</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter student name" />
        <button onClick={markAttendance}>Mark Attendance</button>
        <ul>
          {students.map(student => (
              <li key={student.id}>{student.name} - {student.attended ? "✅ Present" : "❌ Absent"}</li>
          ))}
        </ul>
      </div>
  );
};

export default App;
