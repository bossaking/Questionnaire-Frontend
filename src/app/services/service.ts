import {ToastrService} from "ngx-toastr";

export class Service{
  constructor(protected toastr: ToastrService) {
  }

  showSuccess(message: string){
    this.toastr.success(message, 'Success');
  }

  showError(message: string){
    this.toastr.error(message, 'Error');
  }
}
