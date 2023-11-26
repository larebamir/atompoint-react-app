// Dashboard.js
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import './Dashboard.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const StatusCard = ({ temperature, humidity, timestamp }) => {
  return (
    timestamp !== undefined ? (
      <div className="status-card mx-2 mt-2">
       <div className="row">
       <div className="col-md-3"> <h3>Current Statistics</h3>
       </div>
        <div className="col-md-3"> <strong>Temperature:</strong> {temperature.toFixed(2)}°C
        </div>
        <div className="col-md-3">
          <strong>Humidity:</strong> {humidity.toFixed(2)}%
          </div>
        <div className="col-md-3">
          <strong>Time:</strong> {new Date(timestamp.seconds * 1000).toLocaleString()}
          </div>
          </div>
      </div>
    ) : null
  );
};

const Dashboard = () => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [statusHistory, setStatusHistory] = useState([]);

  useEffect(() => {
    // Set up Firebase listener for real-time updates
    const unsubscribe = firebase.firestore().collection('statusUpdate').orderBy('timestamp', 'desc').limit(1)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          setCurrentStatus(snapshot.docs[0].data());
        }
      });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch entire status history
    const fetchStatusHistory = async () => {
      const snapshot = await firebase.firestore().collection('statusUpdate').orderBy('timestamp', 'desc').get();
      setStatusHistory(snapshot.docs.map(doc => doc.data()));
    };

    fetchStatusHistory();
  }, []);

  return (
    <div>
      <StatusCard {...currentStatus} />
        
      <div className="status-card mx-2 mt-2">
      <h3>Time History</h3>
      <div className="card p-3">
      <div className="line-chart-container"><LineChart width={1400} height={200} data={statusHistory}>
        <XAxis dataKey="timestamp" />
        <YAxis  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}>
          <Label value="Time (Sec)" angle={-90} position="insideLeft" />
        </YAxis>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
      </LineChart>
      </div>
      </div>
    <div className="card p-3 mt-3">
    <div className="line-chart-container">
        <LineChart width={ 1400} height={200} data={statusHistory}>
        <XAxis dataKey="timestamp" />
        <YAxis  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}>
          <Label value="Time (Sec)" angle={-90} position="insideLeft" />
        </YAxis >
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
      </LineChart>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
