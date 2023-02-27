const initialState = {
  content: "没有内容",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_EDITOR_CONTENT":
      return Object.assign({}, state, {
        content: action.content,
      });
    default:
      return state;
  }
}

export default reducer;
