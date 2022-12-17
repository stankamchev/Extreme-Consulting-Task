export interface IInteraction {
  post_id: string;
  state: number;
  user_id: string;
}

export interface IPostInteraction {
  id: string;
  state: number;
  interactions: IInteraction[];
}
