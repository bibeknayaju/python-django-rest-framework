import React, { useState, useEffect } from "react";
import {
  getPatient,
  addpatient,
  editpatient,
  deletepatient,
} from "../services/ApiService";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import "./PatientList.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [showAddPatientsForm, setShowAddPatientsForm] = useState(false);
  const [showEditPatientsForm, setShowEditPatientsForm] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState();

  const handleEditBtn = (patient) => {
    setSelectedEditData(patient);
    setShowEditPatientsForm(true);
    setShowAddPatientsForm(false);
  };

  const handleDeleteBtn = (id) => {
    deletepatient(id).then((res) => {
      setPatients(patients.filter((p) => p.patient_id !== id));
    });
  };

  const handleAddSubmit = (e) => {
    addpatient(e.target).then((res) => {
      setPatients(res);
    });
    // console.log("Clicked in the add new patient button");
  };

  const handleEditSubmit = (e, id) => {
    editpatient(id, e.target).then((res) => {
      setPatients(res);
    });
  };

  useEffect(() => {
    let mount = true;
    getPatient().then((res) => {
      console.log("DATA FROM API", res);
      setPatients(res);
      return () => (mount = false);
    });
  }, []);
  return (
    <>
      <div className="filter"></div>
      <h2 className="patient__header">Patient List</h2>
      <table border={"2px"} cellPadding={"10px"}>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Blood Group</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            return (
              <tr key={patient.patient_id}>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.blood}</td>
                <td>
                  <button onClick={() => handleEditBtn(patient)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteBtn(patient.patient_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button__div">
        <button
          className="patient__add"
          onClick={() => setShowAddPatientsForm(true)}>
          Add New Patient
        </button>
      </div>
      {showAddPatientsForm && <AddPatient handleAddSubmit={handleAddSubmit} />}
      {showEditPatientsForm && (
        <EditPatient
          handleEditSubmit={handleEditSubmit}
          selectedEditData={selectedEditData}
        />
      )}
    </>
  );
}
