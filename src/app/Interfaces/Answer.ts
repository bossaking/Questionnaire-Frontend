import {Option} from "./Option";

export interface Answer{
  text: string;
  singleOption: Option;
  multipleOptions: Option[];
}
