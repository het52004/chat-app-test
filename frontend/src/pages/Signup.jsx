import React, { useState } from "react";
import "./css/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";

function Signup() {
  const [userName, setUsername] = useState();
  const [uniqueName, setUniquename] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { singup, isSigningUp } = useAuthStore();
  function handleSubmit(e) {
    e.preventDefault();
    singup({ userName, uniqueName, password, email });
  }
  return (
    <div className="signupContainer d-flex justify-content-center align-items-center">
      <div className="signupBox p-5 shadow-lg">
        <h3 className="signupTitle text-center mb-4">Create Account</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control signupInput"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control signupInput"
              placeholder="Unique Name"
              onChange={(e) => setUniquename(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control signupInput"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control signupInput"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            disabled={isSigningUp}
            className="btn signupButton w-100"
            id="signupBtn"
            onClick={handleSubmit}
            style={{
              background: isSigningUp && "transparent",
              color: isSigningUp && "#6a11cb",
              borderColor: isSigningUp && "#6a11cb",
              cursor: isSigningUp && "not-allowed",
            }}
          >
            {isSigningUp ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <p className="signupLink text-center mt-4">
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
