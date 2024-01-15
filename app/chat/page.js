"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { io } from "socket.io-client";
import {toast} from 'react-toastify';

const socket = io("http://localhost:8000");

const page = () => {
  const [message, setMessage] = useState("");
  const [getMessage, setGetMessage] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("App connected to the socket");
    });

    socket.on("message", (data) => {
        setGetMessage((pre) => [...pre, data.message]);
      });

  }, [socket]);

  async function handleSendMessage() {
    socket.emit("message", { message });

    let a = document.createElement("p");
    let b = document.getElementById("messages");

    a.textContent = message;
    b.appendChild(a);
    toast.success("Message sent!");
  }

  return (
    <div>
      <div>
        <h1>Superchat</h1>
      </div>
      <div>
        <input
          type="text"
          className="p-3 rounded hover:bg-slate-200 border-[0px] hover:border-[0px] text-black"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSendMessage}>
          Send
        </Button>
      </div>

      <div id="messages">
        {
            getMessage.map((message) => {
                return (
                    <p>{message}</p>
                )
            })
        }
      </div>
    </div>
  );
};

export default page;
