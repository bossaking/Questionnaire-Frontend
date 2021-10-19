export interface OldQuestionRequest{
  id: number;
  type: number;
  name:string;
  description:string;
  is_required:boolean;
  options:[] | null;
}
