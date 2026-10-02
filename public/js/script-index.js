if(location.href.indexOf('delete=true') != -1) {
  document.getElementById("alertSuccess").innerHTML = `<strong>Success!</strong> Deleted client with success!`;
  showMessage("alertSuccess");
  document.getElementById("alertErro").style.display = "none";
} else {
  if(location.href.indexOf('edit=true') != -1) {
    document.getElementById("alertSuccess").innerHTML = `<strong>Success!</strong> Edited client with success!`;
    showMessage("alertSuccess");
    document.getElementById("alertErro").style.display = "none";
  } else {
    if(location.href.indexOf('new=true') != -1) {
      document.getElementById("alertSuccess").innerHTML = `<strong>Success!</strong> Registered client with success!`;
      showMessage("alertSuccess");
      document.getElementById("alertErro").style.display = "none";
    } else {
      if(location.href.indexOf('erro') != -1) {
      document.getElementById("alertErro").textContent =
        `An error ocurred! ${new URLSearchParams(location.search).get('erro')}`;
      showMessage("alertErro");
      document.getElementById("alertSuccess").style.display = "none";
      } else {
        document.getElementById("alertSuccess").style.display = "none";
        document.getElementById("alertErro").style.display = "none";
      }
    }
  }
}

function showMessage(message) {
  document.getElementById(message).style.display = "block";
  setTimeout(() => {
      document.getElementById(message).style.display = "none"
  }, 5000);
}

document.querySelectorAll(".js-delete-form").forEach((form) => {
  form.addEventListener("submit", (evt) => {
    if (!confirm(`Excluir ${form.dataset.name}?`)) {
      evt.preventDefault()
    }
  })
})
