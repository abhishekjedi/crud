import React, { useEffect, useState } from "react";
import classes from "./UserInputForm.module.css";
import useInput from "../hooks/use-input";
import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const nameHandler = (value) => {
  return value.trim().length !== 0;
};
const validateEmail = (email) => {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const validateAge = (age) => {
  if (isNaN(age) || age < 1 || age > 100) return false;
  return true;
};
const UserInputForm = (props) => {
  const [genderSelect, setGenderSelect] = useState("male");
  const navigate = useNavigate();
  const {
    value: name,
    hasError: nameHasError,
    inputHandler: nameInputHandler,
    reset: nameReset,
    inputBlurHandler: nameInputBlurHandler,
    valueHandler: nameInputEnter,
  } = useInput(nameHandler);
  const {
    value: email,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    reset: emailReset,
    inputBlurHandler: emailInputBlurHandler,
    valueHandler: emailInputEnter,
  } = useInput(validateEmail);
  const {
    value: age,
    hasError: ageHasError,
    inputHandler: ageInputHandler,
    reset: ageReset,
    inputBlurHandler: ageInputBlurHandler,
    valueHandler: ageInputEnter,
  } = useInput(validateAge);
  const {
    value: city,
    hasError: cityHasError,
    inputHandler: cityInputHandler,
    reset: cityReset,
    inputBlurHandler: cityInputBlurHandler,
    valueHandler: cityInputEnter,
  } = useInput(nameHandler);

  useEffect(() => {
    if (props && props.id) {
      const docRef = doc(db, "users", props.id);
      getDoc(docRef).then((docSnap) => {
        const docData = docSnap.data();
        setGenderSelect(docData.gender);
        nameInputEnter(docData.name);
        ageInputEnter(docData.age);
        cityInputEnter(docData.city);
        emailInputEnter(docData.email);
      });
    }
  }, [ageInputEnter, nameInputEnter, cityInputEnter, emailInputEnter, props]);

  const formIsValid =
    !nameHasError && !ageHasError && !cityHasError && !emailHasError;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    const payload = {
      name: name,
      age: age,
      city: city,
      email: email,
      gender: genderSelect,
      timeStamp: serverTimestamp(),
    };

    const collectionRef = collection(db, "users");
    if (props && props.id) {
      try {
        toast("User is being updated");
        await setDoc(doc(collectionRef, props.id), payload);
        toast.dismiss();
        toast.success("User updated Succesfully");
        nameReset();
        cityReset();
        emailReset();
        ageReset();
        navigate("/");
      } catch (err) {
        toast.dismiss();
        toast.error("User could not be updated");
        console.log(err);
      }
    } else {
      try {
        toast("User is being added");
        await addDoc(collectionRef, payload);
        toast.dismiss();
        toast.success("User Added Succesfully");
        nameReset();
        cityReset();
        emailReset();
        ageReset();
        navigate("/");
      } catch (err) {
        toast.dismiss();
        toast.error("User could not be added");
        console.log(err);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Add New User</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={nameInputHandler}
        value={name}
        onBlur={nameInputBlurHandler}
        className={nameHasError ? classes.error : null}
      />
      {nameHasError && <p>please Enter a Valid Name</p>}
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={emailInputHandler}
        onBlur={emailInputBlurHandler}
        className={emailHasError ? classes.error : null}
      />
      {emailHasError && <p>please Enter a Valid Email</p>}
      <label htmlFor="age">age</label>
      <input
        type="text"
        name="age"
        onChange={ageInputHandler}
        value={age}
        onBlur={ageInputBlurHandler}
        className={ageHasError ? classes.error : null}
      />
      {ageHasError && <p>please Enter a Valid number between 0 to 100</p>}
      <label htmlFor="city">city</label>
      <input
        type="text"
        name="city"
        value={city}
        onChange={cityInputHandler}
        onBlur={cityInputBlurHandler}
        className={cityHasError ? classes.error : null}
      />

      {cityHasError && <p>please Enter a Valid city</p>}
      <label htmlFor="gender">gender</label>
      <select
        name="gender"
        value={genderSelect}
        onChange={(event) => setGenderSelect(event.target.value)}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="NotDisclosed">Prefer Not to Say</option>
      </select>
      <button type="submit" className={classes.button} disabled={!formIsValid}>
        {props && props.id ? "Update " : "Add"}
      </button>
    </form>
  );
};

export default UserInputForm;
