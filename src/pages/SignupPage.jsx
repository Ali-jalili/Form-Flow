/** @format */

import { useState } from "react";
import useAuth from "../features/Auth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { handleSignup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password });
    if (!name || !email || !password) {
      return toast.error("Please fill in all fields.");
    }

    setIsLoading(true);

    try {
      await handleSignup(email, password, name);
      toast.success("Welcome...");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Your Name..."
          id="name"
        />
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your Email..."
          id="email"
        />

        <label htmlFor="Password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Your password"
        />

        <button disabled={isLoading}>signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
