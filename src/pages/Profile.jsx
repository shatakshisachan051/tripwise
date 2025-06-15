import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { updateUserProfile, getUserProfile } from '../services/firestore';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    location: '',
    preferences: {
      theme: 'day',
      notifications: true,
      language: 'en'
    }
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (currentUser) {
          const userProfile = await getUserProfile(currentUser.uid);
          if (userProfile) {
            setProfile(userProfile);
          }
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserProfile(currentUser.uid, profile);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="profile-card" style={{ backgroundColor: currentTheme.colors.surface }}>
        <h1 style={{ color: currentTheme.colors.text }}>Profile</h1>
        
        {error && <div className="error-message" style={{ color: currentTheme.colors.error }}>{error}</div>}
        {success && <div className="success-message" style={{ color: currentTheme.colors.success }}>{success}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName" style={{ color: currentTheme.colors.text }}>Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={profile.displayName}
              onChange={handleInputChange}
              className="profile-input"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio" style={{ color: currentTheme.colors.text }}>Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="profile-textarea"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" style={{ color: currentTheme.colors.text }}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="profile-input"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="theme" style={{ color: currentTheme.colors.text }}>Theme Preference</label>
            <select
              id="theme"
              name="theme"
              value={profile.preferences.theme}
              onChange={handlePreferenceChange}
              className="profile-select"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border
              }}
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <label style={{ color: currentTheme.colors.text }}>
              <input
                type="checkbox"
                name="notifications"
                checked={profile.preferences.notifications}
                onChange={handlePreferenceChange}
              />
              Enable Notifications
            </label>
          </div>

          <button
            type="submit"
            className="profile-button"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            }}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 