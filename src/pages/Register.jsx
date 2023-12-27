import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // Handle file change if needed
  };

  const handleRegistration = async (displayName, email, password, file) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(userCredential.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", userCredential.user.uid), {});

      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErr(true);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    handleRegistration(displayName, email, password, file);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chit Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required onChange={handleFileChange} className="file-input" type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && <span>Loading...</span>}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
