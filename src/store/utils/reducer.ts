const utilReducer = {
  unknownType: (state: any, action: Action) => {
    // 사이드 이팩트만이 존재하기에 유닛 테스트를 하지 않았음
    const isDevMode = process.env.NODE_ENV === "development";

    if (isDevMode) {
      console.error("undefined action type: ", action.type);
    }

    return state;
  },
};

export default utilReducer;
