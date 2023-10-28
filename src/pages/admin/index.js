import React from "react";
import { useRouter } from "next/router";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call the signIn function from next-auth/client with the username and password
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Redirect manually after handling the result
    });

    if (result.error) {
      // Handle authentication error, such as displaying an error message
      console.error("Authentication failed:", result.error);
    } else {
      router.push("/");
    }
  };

  if (!session) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    return <button type="button" onClick={() => signOut()}></button>;
  }
}
