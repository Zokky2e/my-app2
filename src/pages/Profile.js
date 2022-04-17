import React from "react";
import Card from "../components/ui/Card";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const currentUser = auth.currentUser;
const navigate = useNavigate();
  function onSignOutHandler(){
    signOut(auth).then(navigate("/", {replace: true}));

  }
  return (
    <Card>
      <div className="center">
        <div className="profile">
          <h1>Profile</h1>
          <p>
            <strong>Email: </strong>
            {currentUser?.email}
          </p>
          <button onClick={onSignOutHandler}>Sign Out</button>
        </div>
      </div>
    </Card>
  );
}

export default ProfilePage;
