// App.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import Filters from './Components/Filter';
import JobList from './Components/Joblist';

function App() {
  const jobList = useSelector(state => state.jobList);

  return (
    <Container>
      <Filters />
      <JobList jobList={jobList} />
    </Container>
  );
}

export default App;
