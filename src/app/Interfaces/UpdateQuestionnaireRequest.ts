export interface UpdateQuestionnaireRequest{
  lang:string;
  name:string;
  description:string;
  password:string | null;
  is_active: boolean;
  expiration_at:string;
  questions:[];
}
