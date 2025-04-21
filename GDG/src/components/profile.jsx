import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import profilePic from "../assets/6997676.png";
import ProfileNavbar from "./profilenav";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handlePasswordChange = async () => {
    const user = auth.currentUser;

    if (!currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      // Step 1: Reauthenticate
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update password
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password") {
        alert("Incorrect current password.");
      } else {
        alert(`Failed to update password: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <ProfileNavbar />

      <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-10">
          {/* Profile Image */}
          <div className="w-1/3 flex justify-center items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
            />
          </div>

          {/* Profile Info */}
          <div className="w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">User Profile</h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={userEmail}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={handlePasswordChange}
                className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700"
              >
                Update Password
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
