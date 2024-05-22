import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import fetchJobData from './jobAPI'; // Import the fetch function
import './style.css';

function JobList() {
  const jobList = useSelector(state => state.jobList);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
      const fetchJobs = async () => {
          try {
              const data = await fetchJobData(filters);
              dispatch({ type: 'SET_JOB_LIST', payload: data.jdList });
          } catch (error) {
              console.error(error);
          }
      };
      fetchJobs();
  }, [filters, dispatch]);

  const handleViewDetails = (job) => {
      setSelectedJob(job);
      setPopupOpen(true);
  };

  const truncateText = (text, limit) => {
      const words = text.split(' ');
      if (words.length > limit) {
          return words.slice(0, limit).join(' ') + '...';
      }
      return text;
  };

  return (
    <Grid container spacing={3}>
      {jobList.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job.jdUid}>
          <Card className="cardHover" style={{ marginBottom: '20px', borderRadius: '10px', transition: '0.3s' }}>
            <CardContent>
              {/* Posted duration */}
              <div className="cardDay">
                <Typography variant="body3" style={{ textColor: '#737272', fontSize: '13px' }}>⏳ Posted 7 days ago</Typography>
              </div>
              {/* Logo and Company Info */}
              <Grid container alignItems="center" spacing={2} style={{ marginBottom: '10px' }}>
                <Grid item>
                  <img src={job.logoUrl} alt="Company Logo" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2" className="cardHead" style={{ fontSize: '13px' }}>{job.companyName}</Typography>
                  <Typography className="cardSub">{job.jobRole}</Typography>
                  <Typography variant="body1" style={{ fontSize: '11px', fontWeight: 'bold' }}>{job.location}</Typography>
                </Grid>
              </Grid>

              {/* Estimated Salary */}
              <Typography className="cardSal" variant="body1">Estimated Salary: ₹{job.minJdSalary} - ₹{job.maxJdSalary} LPA ✅</Typography>

              {/* About Company */}
              <Typography variant="h6" style={{ fontSize: '16px', marginTop: '10px', fontWeight: 'semiBold' }}>About Company:</Typography>
              <Typography variant="body1" style={{ fontSize: '13px', fontWeight: 'bold' }}>About us</Typography>
              <Typography variant="body1" style={{ fontSize: '15px' }}>
                {truncateText(job.jobDetailsFromCompany, 50)}
                <span style={{ filter: 'blur(10px)', marginLeft: '5px' }}></span>
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography className='cardButton' color="blue" onClick={() => handleViewDetails(job)}>View job</Typography>
              </div>
              {/* Founder/Recruiter profiles */}
              {/* <Typography variant="h6" style={{ marginTop: '10px' }}>Founder/Recruiter profiles:</Typography>
              <Typography variant="body1">Chirag Singh Toor</Typography> */}
              
              
              {/* Minimum Experience */}
              <Typography variant="body2" style={{ marginTop: '10px' }} className="cardHead">Minimum Experience:</Typography>
              <Typography variant="body1" style={{ fontSize: '15px' }}>{job.minExp} years</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <a href="https://jobs.weekday.works/?jobsTab=search&referredId=undefined&connectionId=undefined&publicIdentifier=undefined&candidateId=U2FsdGVkX19B5gIU7gdVjfdnXZNMEBDPpakapQDGWCY%3D&companyGroup=inp&filters=%7B%22roles%22%3A%5B%7B%22label%22%3A%5B%22frontend%22%5D%2C%22value%22%3A%5B%22frontend%22%5D%2C%22category%22%3A%22Engineering%22%7D%5D%2C%22minExp%22%3A2%7D">
  <Button variant="contained" color="primary">Easy Apply</Button>
                   </a>
              </div>

            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Side popup */}
      <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <>
            <div style={{display: "flex"}}>
              <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold' }}>Company Name:</Typography>
              <Typography variant='body1'> {selectedJob.companyName}</Typography>
              </div>
              <div style={{display: "flex"}}>

              <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold' }}>Location: </Typography>
              <Typography variant='body1'>{selectedJob.location}</Typography>
              </div>
              <div style={{display: "flex"}}>

              <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold' }}>Experince: </Typography>
              <Typography variant='body1'>{selectedJob.minExp}</Typography>
              </div>
              <div style={{display: "flex"}}>

              <Typography variant="body1" style={{ fontSize: '16px',  fontWeight: 'bold' }}>Skills: </Typography>
              <Typography variant='body1'>{selectedJob.skills}</Typography>
              </div>
              <div style={{display: "flex"}}>

              <Typography variant="body1" style={{ fontSize: '16px',  fontWeight: 'bold' }}> Details: </Typography>
              <Typography variant='body1'>{selectedJob.jobDetailsFromCompany}</Typography>
              </div>
              <div style={{display: "flex"}}>

              <Typography variant="body1" style={{ fontSize: '16px',  fontWeight: 'bold' }}>Estimated Salary: </Typography>
              <Typography variant='body1'>₹{selectedJob.minJdSalary} - ₹{selectedJob.maxJdSalary}LPA</Typography>
              </div>
              </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default JobList;
