import styles from "./Login.module.css";
// import { Container } from './styles';
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      {!isPending && (
        <button className="btn" type="submit">
          Login
        </button>
      )}
      {isPending && (
        <button className="btn" disabled>
          loading ...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
