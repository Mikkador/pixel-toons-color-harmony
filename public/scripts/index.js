window.onload = () => {
  const picker = document.getElementById('pick-color');
  const output = document.getElementById('pick-output');
  picker.oninput = () => {
    output.innerText = picker.value;
  };
};
