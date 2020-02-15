export type PayloadedAction<ActionType, ActionPayload> = {
  type: ActionType;
  payload: ActionPayload;
};
