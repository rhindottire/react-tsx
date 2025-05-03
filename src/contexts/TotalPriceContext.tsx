type State = {
  total: number;
};

export type Action = {
  type: "UPDATE";
  payload: { total: number };
};

const totalPriceReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE":
      return { total: action.payload.total };
    default:
      void state;
      throw new Error("Unknown action: " + action.type);
  }
};

export default totalPriceReducer;