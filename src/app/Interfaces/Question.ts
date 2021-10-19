import {Option} from "./Option";

export interface Question{
  id:number;
  name:string;
  type:number;
  description:string;
  is_required:boolean;
  options: Option[] | null;
}
