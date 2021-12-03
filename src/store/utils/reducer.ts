const utilReducer = {
  unknownType: (state: any, action: Action) => {
    console.error("undefined action type: ", action.type);
    return state;
  },
};

export default utilReducer;
