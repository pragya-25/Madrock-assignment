import React, { useState } from "react";
import Modal from "react-modal";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";  // Import react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";  // Import yupResolver
import * as yup from "yup";  // Import yup for validation
import { db } from "../firebaseConfig"; // Firebase config for Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

// Yup validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive("Age must be a positive number"),
  class: yup.string().required("Class is required"),
  section: yup.string().required("Section is required"),
  rollNumber: yup.number().required("Roll Number is required").positive("Roll Number must be a positive number"),
  address: yup.string().required("Address is required"),
  phoneNumber: yup.string().required("Phone Number is required").matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
  parentName: yup.string().required("Parent's Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  guardianPhone: yup.string().required("Guardian Phone is required").matches(/^[0-9]{10}$/, "Guardian Phone must be 10 digits"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
}).required();

const AddStudentModal = ({ open, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)  // Use yupResolver to apply the validation schema
  });

  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    class: "",
    section: "",
    rollNumber: "",
    address: "",
    phoneNumber: "",
    parentName: "",
    email: "",
    guardianPhone: "",
    city: "",
    country: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const onSubmit = async (data) => {
    try {
      // Add data to Firestore
      await addDoc(collection(db, "students"), data);
      handleClose(); // Close the modal after submission
    } catch (err) {
      console.error("Error adding student: ", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          padding: 4,
          width: 400,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Add New Student
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={studentData.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.age}
            helperText={errors.age?.message}
            {...register("age")}
          />
          <TextField
            label="Class"
            name="class"
            value={studentData.class}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.class}
            helperText={errors.class?.message}
            {...register("class")}
          />
          <TextField
            label="Section"
            name="section"
            value={studentData.section}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.section}
            helperText={errors.section?.message}
            {...register("section")}
          />
          <TextField
            label="Roll Number"
            name="rollNumber"
            type="number"
            value={studentData.rollNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.rollNumber}
            helperText={errors.rollNumber?.message}
            {...register("rollNumber")}
          />
          <TextField
            label="Address"
            name="address"
            value={studentData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.address}
            helperText={errors.address?.message}
            {...register("address")}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={studentData.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
          <TextField
            label="Parent's Name"
            name="parentName"
            value={studentData.parentName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.parentName}
            helperText={errors.parentName?.message}
            {...register("parentName")}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={studentData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="Guardian Phone"
            name="guardianPhone"
            value={studentData.guardianPhone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.guardianPhone}
            helperText={errors.guardianPhone?.message}
            {...register("guardianPhone")}
          />
          <TextField
            label="City"
            name="city"
            value={studentData.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.city}
            helperText={errors.city?.message}
            {...register("city")}
          />
          <TextField
            label="Country"
            name="country"
            value={studentData.country}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.country}
            helperText={errors.country?.message}
            {...register("country")}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;