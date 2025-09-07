import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./profile.css";
import {
  User,
  Calendar,
  Package,
  LogOut,
  FileText,
  Camera,
  Clock,
  ShoppingCart,
} from "lucide-react";
import Footer from "./footer";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [appointments] = useState([]);
  const [orders] = useState([]);
  const [hearingTests, setHearingTests] = useState([]);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  // Function to refresh hearing tests
  const refreshHearingTests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log('Fetching hearing tests for user:', user.id);
        const { data: testsData, error } = await supabase
          .from('hearing_tests')
          .select('*')
          .eq('user_id', user.id)
          .order('test_date', { ascending: false })
          .limit(3);
        
        console.log('Hearing tests data:', testsData);
        console.log('Hearing tests error:', error);
        
        if (testsData) {
          setHearingTests(testsData);
          console.log('Set hearing tests state:', testsData);
        }
      }
    } catch (error) {
      console.error('Error refreshing hearing tests:', error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Error fetching user:', error);
          navigate('/login');
          return;
        }

        if (user) {
          // Fetch hearing tests
          console.log('Initial fetch - User ID:', user.id);
          const { data: testsData, error: testsError } = await supabase
            .from('hearing_tests')
            .select('*')
            .eq('user_id', user.id)
            .order('test_date', { ascending: false })
            .limit(3);
          
          console.log('Initial hearing tests data:', testsData);
          console.log('Initial hearing tests error:', testsError);
          
          if (testsData && testsData.length > 0) {
            // Debug: Check the data structure
            testsData.forEach((test, index) => {
              console.log(`Test ${index + 1}:`, {
                id: test.id,
                left_ear_results: test.left_ear_results,
                right_ear_results: test.right_ear_results,
                left_type: typeof test.left_ear_results,
                right_type: typeof test.right_ear_results
              });
            });
            
            setHearingTests(testsData);
            console.log('Initial set hearing tests:', testsData);
          }

          // First try to get profile from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileData && !profileError) {
            // Profile exists in table, use that data
            const nameParts = profileData.name ? profileData.name.split(' ') : ['', ''];
            setProfile({
              firstName: nameParts[0] || "",
              lastName: nameParts.slice(1).join(' ') || "",
              email: profileData.email || user.email || "",
              phone: profileData.phone || "",
              gender: profileData.gender || "",
              dob: profileData.date_of_birth || "",
              address: profileData.address || "",
            });
          } else {
            // No profile in table, use user metadata as fallback
            setProfile({
              firstName: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || "",
              lastName: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "",
              email: user.email || "",
              phone: user.user_metadata?.phone || "",
              gender: user.user_metadata?.gender || "",
              dob: user.user_metadata?.dob || "",
              address: user.user_metadata?.address || "",
            });
          }
        } else {
          // No user logged in, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Debug: Log hearing tests state changes
  useEffect(() => {
    console.log('Hearing tests state updated:', hearingTests);
  }, [hearingTests]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        alert('User not authenticated');
        return;
      }

      const profileData = {
        id: user.id,
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        email: user.email,
        date_of_birth: profile.dob || null,
        gender: profile.gender || null,
      };

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      const { error: profileError } = existingProfile
        ? await supabase.from('profiles').update(profileData).eq('id', user.id)
        : await supabase.from('profiles').insert([profileData]);

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: profile.firstName,
          last_name: profile.lastName,
          full_name: `${profile.firstName} ${profile.lastName}`,
          phone: profile.phone,
          gender: profile.gender,
          dob: profile.dob,
          address: profile.address,
        }
      });

      if (profileError) {
        alert('Error updating profile: ' + profileError.message);
      } else {
        console.log('Profile updated successfully in profiles table');
        if (metadataError) {
          console.warn('User metadata update failed, but profile table updated:', metadataError);
        }
        setIsEditing(false);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (error) {
      console.error('Error in handleSave:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log('Logout function called');
    try {
      // Clear any local storage or session storage if needed
      localStorage.clear();
      sessionStorage.clear();
      
      // Attempt Supabase logout but don't wait for it
      supabase.auth.signOut().catch(err => console.log('Supabase logout error:', err));
      
      // Navigate immediately
      console.log('Navigating to login...');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Navigate regardless of error
      navigate('/login');
    }
  };

  return (
    <div className="profile-page">
      {/* Reserved Navbar Space */}
      <div className="navbar-space"></div>

      {loading ? (
        <div className="loading-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '60vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading profile...
        </div>
      ) : (
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="sidebar slide-in">
            <h2 className="sidebar-title">My Account</h2>
            <ul className="menu">
              <li
                className={`menu-item ${activeTab === "Profile" ? "active" : ""}`}
                onClick={() => setActiveTab("Profile")}
              >
                <User size={18} /> Profile
              </li>
              <li
                className={`menu-item ${activeTab === "Appointments" ? "active" : ""}`}
                onClick={() => setActiveTab("Appointments")}
              >
                <Calendar size={18} /> My Appointments
              </li>
              <li
                className={`menu-item ${activeTab === "Orders" ? "active" : ""}`}
                onClick={() => setActiveTab("Orders")}
              >
                <Package size={18} /> My Orders
              </li>
              <li
                className={`menu-item ${activeTab === "Tests" ? "active" : ""}`}
                onClick={() => setActiveTab("Tests")}
              >
                <FileText size={18} /> My Hearing Test
              </li>
              <li className="menu-item logout" onClick={() => {
                console.log('Logout button clicked'); // Debug log
                handleLogout();
              }}>
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className={`profile-content fade-in ${activeTab}`}>
            {activeTab === "Profile" && (
              <>
                <div className="profile-header pop-in">
                  <div className="avatar-container">
                    <img
                      src={
                        profilePic ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Profile"
                      className="profile-avatar"
                    />
                    <label htmlFor="file-upload" className="upload-icon">
                      <Camera size={18} />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePicUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="profile-info">
                    <h3>
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <section className="profile-info card-animate">
                  <h4 className="info-title">Personal Information</h4>
                  <div className="form-grid">
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </section>

                {/* Hearing Test Results Section */}
                <section className="profile-info card-animate">
                  <h4 className="info-title">My Last Hearing Tests</h4>
                  {hearingTests.length > 0 ? (
                    <div className="hearing-tests-grid">
                      {hearingTests.map((test, index) => (
                        <div key={test.id} className="test-card">
                          <div className="test-header">
                            <span className="test-date">
                              {new Date(test.test_date).toLocaleDateString()}
                            </span>
                            <span className="test-score">
                              Score: {test.overall_score || 'N/A'}
                            </span>
                          </div>
                          <div className="test-results">
                            <div className="ear-result">
                              <span>Left Ear:</span>
                              <span className="result-data">
                                {(() => {
                                  try {
                                    if (!test.left_ear_results) return 'Not tested';
                                    
                                    // Check if it's already an object
                                    const results = typeof test.left_ear_results === 'string' 
                                      ? JSON.parse(test.left_ear_results) 
                                      : test.left_ear_results;
                                    
                                    return Array.isArray(results) 
                                      ? `${results.length} frequencies tested`
                                      : 'Tested';
                                  } catch (error) {
                                    console.error('Error parsing left ear results:', error);
                                    return 'Data available';
                                  }
                                })()}
                              </span>
                            </div>
                            <div className="ear-result">
                              <span>Right Ear:</span>
                              <span className="result-data">
                                {(() => {
                                  try {
                                    if (!test.right_ear_results) return 'Not tested';
                                    
                                    // Check if it's already an object
                                    const results = typeof test.right_ear_results === 'string' 
                                      ? JSON.parse(test.right_ear_results) 
                                      : test.right_ear_results;
                                    
                                    return Array.isArray(results) 
                                      ? `${results.length} frequencies tested`
                                      : 'Tested';
                                  } catch (error) {
                                    console.error('Error parsing right ear results:', error);
                                    return 'Data available';
                                  }
                                })()}
                              </span>
                            </div>
                            <div className="test-time">
                              <Clock size={14} />
                              <span>{new Date(test.test_date).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-tests">
                      <FileText size={32} style={{ color: '#ccc', marginBottom: '10px' }} />
                      <p>No hearing tests available. Take your first test to see results here.</p>
                    </div>
                  )}
                </section>
              </>
            )}

            {activeTab === "Appointments" &&
              (appointments.length === 0 ? (
                <div className="empty-state fade-in">
                  <Calendar size={48} className="empty-state-icon" />
                  <h3 className="empty-state-title">
                    No Appointments Available
                  </h3>
                  <p className="empty-state-text">
                    You don't have any appointments scheduled.
                    <br />
                    Book your first appointment to get started.
                  </p>
                  <button className="empty-state-btn">
                    <Clock size={16} /> Book Appointment
                  </button>
                </div>
              ) : (
                <h2>Your Appointments</h2>
              ))}

            {activeTab === "Orders" &&
              (orders.length === 0 ? (
                <div className="empty-state fade-in">
                  <Package size={48} className="empty-state-icon" />
                  <h3 className="empty-state-title">No Orders Found</h3>
                  <p className="empty-state-text">
                    You haven't placed any orders yet. Start shopping
                    <br />
                    to see your orders here.
                  </p>
                  <button className="empty-state-btn">
                    <ShoppingCart size={16} /> Start Shopping
                  </button>
                </div>
              ) : (
                <h2>Your Orders</h2>
              ))}

            {activeTab === "Tests" && (
              <div className="tests-section fade-in">
                <div className="tests-header">
                  <h2>📝 My Hearing Test History</h2>
                  <button 
                    className="take-test-btn"
                    onClick={() => navigate('/hearingtest')}
                  >
                    <FileText size={16} />
                    Take New Test
                  </button>
                </div>
                
                {hearingTests.length > 0 ? (
                  <div className="detailed-tests-grid">
                    {hearingTests.map((test, index) => (
                      <div key={test.id} className="detailed-test-card">
                        <div className="test-card-header">
                          <div className="test-number">Test #{hearingTests.length - index}</div>
                          <div className="test-date-time">
                            <div className="test-date">{new Date(test.test_date).toLocaleDateString()}</div>
                            <div className="test-time">{new Date(test.test_date).toLocaleTimeString()}</div>
                          </div>
                          <div className="overall-score">
                            <span className="score-label">Overall Score</span>
                            <span className="score-value">{test.overall_score || 'N/A'}</span>
                          </div>
                        </div>
                        
                        <div className="ear-results-detailed">
                          <div className="ear-result-section">
                            <h4>Left Ear Results</h4>
                            {(() => {
                              try {
                                if (!test.left_ear_results) {
                                  return <p className="no-data">No data available</p>;
                                }
                                
                                // Check if it's already an object
                                const results = typeof test.left_ear_results === 'string' 
                                  ? JSON.parse(test.left_ear_results) 
                                  : test.left_ear_results;
                                
                                if (!Array.isArray(results)) {
                                  return <p className="no-data">Invalid data format</p>;
                                }
                                
                                return (
                                  <div className="frequency-results">
                                    {results.map((result, idx) => (
                                      <div key={idx} className="frequency-item">
                                        <span>{result.freq}Hz: </span>
                                        <span className={result.heard ? 'heard' : 'not-heard'}>
                                          {result.heard ? '✓ Heard' : '✗ Not heard'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              } catch (error) {
                                console.error('Error parsing left ear results:', error);
                                return <p className="no-data">Error loading data</p>;
                              }
                            })()}
                          </div>
                          
                          <div className="ear-result-section">
                            <h4>Right Ear Results</h4>
                            {(() => {
                              try {
                                if (!test.right_ear_results) {
                                  return <p className="no-data">No data available</p>;
                                }
                                
                                // Check if it's already an object
                                const results = typeof test.right_ear_results === 'string' 
                                  ? JSON.parse(test.right_ear_results) 
                                  : test.right_ear_results;
                                
                                if (!Array.isArray(results)) {
                                  return <p className="no-data">Invalid data format</p>;
                                }
                                
                                return (
                                  <div className="frequency-results">
                                    {results.map((result, idx) => (
                                      <div key={idx} className="frequency-item">
                                        <span>{result.freq}Hz: </span>
                                        <span className={result.heard ? 'heard' : 'not-heard'}>
                                          {result.heard ? '✓ Heard' : '✗ Not heard'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              } catch (error) {
                                console.error('Error parsing right ear results:', error);
                                return <p className="no-data">Error loading data</p>;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-tests-detailed">
                    <FileText size={64} style={{ color: '#ccc', marginBottom: '20px' }} />
                    <h3>No Hearing Tests Available</h3>
                    <p>Take your first hearing test to see detailed results here.</p>
                    <button 
                      className="take-first-test-btn"
                      onClick={() => navigate('/hearingtest')}
                    >
                      <FileText size={16} />
                      Take Your First Test
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}

      {showPopup && <div className="popup">✅ Changes Saved!</div>}

      <Footer />
    </div>
  );
}
