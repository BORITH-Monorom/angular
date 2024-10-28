import Swal from "sweetalert2";


export class sweetAlert2{



// Function to show a customizable confirmation popup
showConfirmationDialog(
  title: string,
  text: string,
  confirmButtonText: string,
  confirmButtonColor: string = '#C3002F',
  cancelButtonColor: string = '#333C4D',
): Promise<any>{
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor
  })
}

showInputConfirmationDialog(
  title: string,
  text: string,
  confirmButtonText: string,
  inputValue:string, //Optinal parameter for the input's initial value
  confirmButtonColor: string = '#C3002F',
  cancelButtonColor: string = '#333C4D',
): Promise<any>{
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    input: "text",
    inputValue: inputValue, //Use inputValue here to perfill the input field
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor
  })
}


// Function to show a Customzable success alert
showSuccessAlert(
  title: string = "Success",
  text: string = "Operation completed successfully",
): void{
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
  })
}

// Function to show a Customzable error alert
showErrorAlert(
  title: string = "Error",
  text: string = "An error occurred during the operation"
): void{
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
  })
}

Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
showToastSuccess(title:string):void{
this.Toast.fire({
  icon: "success",
  title: title,
})
}
showToastError(title:string):void{
this.Toast.fire({
  icon: "error",
  title: title,
})
}


}


//
