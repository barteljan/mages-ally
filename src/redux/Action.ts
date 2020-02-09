/**
 * An action without payload.
 *
 * @export
 * @interface ActionType
 * @template ActionType
 */
export interface Action<ActionType> {
  type: ActionType;
}
