import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");

        const data =
          response.data.user ||
          response.data.profile ||
          response.data;

        setProfile(data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Unable to load profile"
        );
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p>{message}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <p>
        <strong>Name:</strong> {profile.name}
      </p>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {profile.phone ?? "Not provided"}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {profile.address ?? "Not provided"}
      </p>
    </div>
  );
}

export default Profile;