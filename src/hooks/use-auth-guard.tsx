import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const { currentUser } = auth;

  useEffect(() => {
    if (!currentUser?.uid) return navigate("/auth");
    setUserId(currentUser.uid);
  }, []);
  return userId;
};

export default useAuthGuard;
