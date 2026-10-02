document.getElementById("alertRegister").style.display = "none";

    document.getElementById("frmRegister").onsubmit = (evt) => {
        if(!document.querySelector('input[name="name"]').value) {
            document.getElementById("alertRegister").innerHTML = `<strong>Error!</strong> Name cannot be empty!`;
            showMessage("alertRegister");
            evt.preventDefault();
        } else {
            if(!isNaN(document.querySelector('input[name="name"]').value)) {
            document.getElementById("alertRegister").innerHTML = `<strong>Error!</strong> Name cannot be number!`;
            showMessage("alertRegister");
            evt.preventDefault();
            }
        }
    }

function showMessage(message) {
  document.getElementById(message).style.display = "block";
  setTimeout(() => {
      document.getElementById(message).style.display = "none";
  }, 5000);
}