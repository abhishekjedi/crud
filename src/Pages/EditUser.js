import React from "react";
import { useParams } from "react-router";
import UserInputForm from "../Components/UserInputForm";

const EditUser = () => {
  const params = useParams();
  console.log(params.id);
  return <UserInputForm id={params.id} />;
};

export default EditUser;
