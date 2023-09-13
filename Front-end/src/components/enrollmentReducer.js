const initialState = {
    enrolled: false,
  };
  
  const enrollmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ENROLL_STUDENT":
        return { ...state, enrolled: true };
      default:
        return state;
    }
  };
  
  export default enrollmentReducer;
  