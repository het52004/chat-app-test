import React, { useState } from "react";
import "./css/Login.css";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const [uniqueName, setUniquename] = useState();
  const [password, setPassword] = useState();
  const { isLoggingIn, login } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    login({ uniqueName, password });
  }
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2 className="loginTitle">Log In</h2>
        <input
          type="text"
          className="loginInput"
          placeholder="Unique Name"
          onChange={(e) => setUniquename(e.target.value)}
        />
        <input
          type="password"
          className="loginInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          disabled={isLoggingIn}
          className="btn signupButton w-100"
          id="loginBtn"
          onClick={handleSubmit}
          style={{
            background: isLoggingIn && "transparent",
            color: isLoggingIn && "#6a11cb",
            borderColor: isLoggingIn && "#6a11cb",
            cursor: isLoggingIn && "not-allowed",
          }}
        >
          {isLoggingIn ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Login"
          )}
        </button>
        <div className="loginLink">
          <p>
            New to LetsChat? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
