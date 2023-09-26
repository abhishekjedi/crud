import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import classes from "./Home.module.css";
import { useNavigate } from "react-router";
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, orderBy("timeStamp", "desc"));
      onSnapshot(q, (res) => {
        let TempUsers = [];
        res.forEach((ele) => {
          TempUsers.push({ ...ele.data(), id: ele.id });
        });
        setUsers(TempUsers);
      });
    };
    getData();
  }, []);
  console.log(users);
  return (
    <div className={classes.main}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.head}>
            <td>Name</td>
            <td>Email</td>
            <td>Age</td>
            <td>Gender</td>
            <td>City</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr className={classes.body} key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.city}</td>
              <td>
                <button onClick={() => navigate(`/editUser/${item.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    const collectionRef = collection(db, "users");
                    const docRef = doc(collectionRef, item.id);
                    deleteDoc(docRef);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
