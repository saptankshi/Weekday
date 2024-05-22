// reducers.js

const initialState = {
    jobList: [], 
    filters: {
      minExperience: 0,
      companyName: '',
      location: '',
      isRemote: false,
      techStack: '',
      role: '',
      minBasePay: 0,
    },
  };
  
  // Define your reducers here
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_JOB_LIST':
        return {
          ...state,
          jobList: action.payload,
        };
      case 'SET_FILTER':
        return {
          ...state,
          filters: {
            ...state.filters,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  