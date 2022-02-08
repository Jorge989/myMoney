import styles from "./Signup.module.css";
import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };
  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </label>
      <label>
        <span>password:</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        ></input>
      </label>
      <label>
        <span>display name:</span>
        <input
          onChange={(e) => setdisplayName(e.target.value)}
          value={displayName}
          type="text"
        ></input>
      </label>
      {!isPending && (
        <button className="btn" type="submit">
          Signup
        </button>
      )}
      {isPending && (
        <button disabeld className="btn">
          loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
