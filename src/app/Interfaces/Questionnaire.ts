import {Question} from "./Question";

export interface Questionnaire{
  lang:string;
  name:string;
  description:string;
  password:string;
  is_active:boolean;
  expiration_at:string;
  questions: Question[];
}
