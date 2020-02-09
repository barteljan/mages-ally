export interface PayloadedAction<ActionType, ActionPayload> {
  type: ActionType;
  payload: ActionPayload;
}
