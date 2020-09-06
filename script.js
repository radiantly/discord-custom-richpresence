const { ipcRenderer } = require("electron");

document.getElementById("start").addEventListener("click", e => {
  e.preventDefault();
  console.log("Clicked!");
  const formInputs = Array.from(document.querySelectorAll("#rpForm input[type=text]"));

  const formObj = formInputs.reduce((obj, currentInput) => {
    obj[currentInput.id] = currentInput.value;
    return obj;
  }, {});
  console.log(formObj);
  ipcRenderer.send("asynchronous-message", formObj);
});
