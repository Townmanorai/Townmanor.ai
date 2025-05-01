import React, { useState, useEffect } from "react";
import { FaCamera, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "./UserProfileModernCardStyles.css";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import UserDashboardNavbar from "./UserDashboardNavbar";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserProfileModernCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Example toggle state for notification preferences
  const [notificationPrefs, setNotificationPrefs] = React.useState({
    lead: true,
    updates: true,
    reports: false,
    newsletter: true,
  });

  const handleToggle = (key) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Get token and decode username
  useEffect(() => {
    console.log('Checking for JWT token...');
    const token = Cookies.get('jwttoken');
    console.log('Token from cookies:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);  
        console.log('Decoded Token:', decodedToken);
        console.log('Setting username to:', decodedToken.username);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Failed to decode user token');
      }
    } else {
      console.warn('No token found in cookies');
      setError('No authentication token found');
    }
  }, []);

  // Debug log for username changes
  useEffect(() => {
    console.log('Username updated:', username);
  }, [username]);

  // Fetch user data and package details when username is available
  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          console.log('Fetching user details...');
          const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          console.log('User data received:', userData);
          setUserData(userData);
    
          console.log('Fetching user package details...');
          const packageResponse = await fetch(`https://www.townmanor.ai/api/userpackage/${username}`);
          if (!packageResponse.ok) {
            throw new Error('Failed to fetch package data');
          }
          const packageData = await packageResponse.json();
          console.log('Package data received:', packageData);
          setPackageData(packageData);
          
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return <div className="upmc_loading">Loading...</div>;
  }

  if (error) {
    return <div className="upmc_error">Error: {error}</div>;
  }
 
  return (
    <>
    <UserDashboardNavbar/>
    <div className="upmc_main_wrap">
      <div className="upmc_back_link">{"<"} Back to Dashboard</div>
      <div className="upmc_title">My Profile</div>
      <div className="upmc_card upmc_profile_card">
        <div className="upmc_profile_info_section">
          <div className="upmc_profile_photo_block">
            <img
              src="/dummyagent.jpg"
              alt="profile"
              className="upmc_profile_photo"
            />
            {/* <button className="upmc_change_photo_btn">
              <FaCamera className="upmc_icon_camera" />
              <span className="upmc_change_photo_text">Change Photo</span>
            </button> */}
            <div className="upmc_profile_name">{userData?.name_surname || username}</div>
            <div className="upmc_profile_role">{userData?.user_type || "User"}</div>
          </div>
          <div className="upmc_personal_info_block">
            <div className="upmc_section_title">Personal Information</div>
            <form className="upmc_personal_info_form">
              <label className="upmc_form_label">
                <span className="upmc_label_text">Username</span>
                <input 
                  className="upmc_input" 
                  defaultValue={userData?.username || ''} 
                  disabled 
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">Full Name</span>
                <input 
                  className="upmc_input" 
                  defaultValue={userData?.name_surname || ''} 
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">Email Address</span>
                <input
                  className="upmc_input"
                  defaultValue={userData?.email || ''}
                  type="email"
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">Phone Number</span>
                <input 
                  className="upmc_input" 
                  defaultValue={userData?.phone || ''} 
                  type="tel"
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">GST Number</span>
                <input
                  className="upmc_input"
                  defaultValue={userData?.gstNo || ''}
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">Address</span>
                <input
                  className="upmc_input"
                  defaultValue={userData?.address || ''}
                />
              </label>
              <label className="upmc_form_label">
                <span className="upmc_label_text">Description</span>
                <textarea
                  className="upmc_textarea"
                  defaultValue={userData?.description || ""}
                />
              </label>
              <button className="upmc_save_btn" type="button">
                Save Personal Information
              </button>
            </form>
          </div>
        </div>
        <div className="upmc_last_updated">
          Last updated: {userData?.updated_on ? new Date(userData.updated_on).toLocaleDateString() : "Not available"}
        </div>
      </div>
      <div className="upmc_card upmc_account_card">
        <div className="upmc_section_title">Account Settings</div>
        <div className="upmc_account_settings_grid">
          <div className="upmc_change_password_block">
            <div className="upmc_label_text">Change Password</div>
            <form className="upmc_change_password_form">
              <input 
                type="password" 
                className="upmc_input" 
                placeholder="Current Password" 
              />
              <input 
                type="password" 
                className="upmc_input" 
                placeholder="New Password" 
              />
              <input 
                type="password" 
                className="upmc_input" 
                placeholder="Confirm New Password" 
              />
              <button className="upmc_update_password_btn" type="button">
                Update Password
              </button>
            </form>
          </div>
          <div className="upmc_notification_block">
            <div className="upmc_label_text">Notification Preferences</div>
            <div className="upmc_notification_pref_row">
              <span className="upmc_notify_title">New Lead Notifications</span>
              <span className="upmc_notify_desc">
                Receive notifications when you get new leads
              </span>
              <span
                className="upmc_toggle_icon"
                onClick={() => handleToggle("lead")}
              >
                {notificationPrefs.lead ? (
                  <FaToggleOn color="#D81212" size={28} />
                ) : (
                  <FaToggleOff color="#333" size={28} />
                )}
              </span>
            </div>
            <div className="upmc_notification_pref_row">
              <span className="upmc_notify_title">Property Updates</span>
              <span className="upmc_notify_desc">
                Get notified about your property status changes
              </span>
              <span
                className="upmc_toggle_icon"
                onClick={() => handleToggle("updates")}
              >
                {notificationPrefs.updates ? (
                  <FaToggleOn color="#D81212" size={28} />
                ) : (
                  <FaToggleOff color="#333" size={28} />
                )}
              </span>
            </div>
            <div className="upmc_notification_pref_row">
              <span className="upmc_notify_title">Market Reports</span>
              <span className="upmc_notify_desc">
                Weekly market trend reports and analysis
              </span>
              <span
                className="upmc_toggle_icon"
                onClick={() => handleToggle("reports")}
              >
                {notificationPrefs.reports ? (
                  <FaToggleOn color="#D81212" size={28} />
                ) : (
                  <FaToggleOff color="#333" size={28} />
                )}
              </span>
            </div>
            <div className="upmc_notification_pref_row">
              <span className="upmc_notify_title">Newsletter Subscription</span>
              <span className="upmc_notify_desc">
                Monthly newsletter with real estate tips and news
              </span>
              <span
                className="upmc_toggle_icon"
                onClick={() => handleToggle("newsletter")}
              >
                {notificationPrefs.newsletter ? (
                  <FaToggleOn color="#D81212" size={28} />
                ) : (
                  <FaToggleOff color="#333" size={28} />
                )}
              </span>
            </div>
            <button className="upmc_save_notify_btn" type="button">
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfileModernCard;