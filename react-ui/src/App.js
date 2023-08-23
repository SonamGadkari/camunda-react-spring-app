import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewDetails from './ViewDetails';
import GetAllRecords from './GetAllRecords';


const App = () => {
  const [record, setRecord] = useState();

  const getRecordDetails = (record) => {
    setRecord(record);
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/recordDetails" Component={() => <ViewDetails record={record} />}></Route>
          <Route path="/" Component={() => <GetAllRecords getRecord={getRecordDetails} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
