import {Option} from "./Option";

export interface Question{
  name:string;
  type:number;
  description:string;
  is_required:boolean;
  options: Option[];
}
