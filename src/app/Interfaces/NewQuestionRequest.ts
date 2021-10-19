import {Option} from "./Option";

export interface NewQuestionRequest{
  type:number;
  name: string;
  description: string;
  is_required: boolean;
  options:Option[] | null;
}
