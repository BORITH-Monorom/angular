import Swal from "sweetalert2";


export class sweetAlert2{
// Function to show a customizable confirmation popup
showConfirmationDialog(
  title: string,
  text: string,
  confirmButtonText: string,
  confirmButtonColor: string = '#3085d6',
  cancelButtonColor: string = '#1c1c1c',
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
}


//
