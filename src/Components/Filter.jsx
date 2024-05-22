import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Select, MenuItem, Button, Grid, FormControl, InputLabel, Box, IconButton } from '@material-ui/core';
import fetchJobData from './jobAPI'; // Import the fetch function

function Filters() {
    // Redux state and dispatch
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
  
    // Handle filter changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      dispatch({ type: 'SET_FILTER', payload: { [name]: value } });
    };
  
    // Fetch job listings based on filters
    const handleSearch = async () => {
      try {
        const data = await fetchJobData(filters); // Pass filters to the fetch function
        // Dispatch action to set the fetched job listings in Redux state
        dispatch({ type: 'SET_JOB_LIST', payload: data.jdList });
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <Grid className='mt-20' container spacing={2}>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <TextField
            name="companyName"
            label="Company Name"
            value={filters.companyName}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <TextField
            name="experience"
            label="Experience (years)"
            type="number"
            value={filters.experience}
            onChange={handleChange}
            fullWidth
          />
                    {/* <IconButton>
            <ArrowDropDownIcon />
          </IconButton> */}

        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <TextField
            name="salary"
            label="Salary"
            type="number"
            value={filters.salary}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={filters.role}
              onChange={handleChange}
            >
              <MenuItem value="frontend">Frontend Developer</MenuItem>
              <MenuItem value="backend">Backend Developer</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <TextField
            name="location"
            label="Job Location"
            value={filters.location}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box border={1} borderRadius={5} p={1}>
          <FormControl fullWidth>
            <InputLabel id="remote-label">Remote/Hybrid</InputLabel>
            <Select
              labelId="remote-label"
              name="remote"
              value={filters.remote}
              onChange={handleChange}
            >
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="office">In Office</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default Filters;
