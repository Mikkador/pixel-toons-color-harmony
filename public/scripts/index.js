const getColor = (string) => {
  const r = parseInt(string.substr(1, 2), 16);
  const g = parseInt(string.substr(3, 2), 16);
  const b = parseInt(string.substr(5, 2), 16);
  return { r, g, b };
};

window.onload = () => {
  const picker = document.getElementById('pick-color');
  const output = document.getElementById('pick-output');
  picker.oninput = () => {
    const color = getColor(picker.value);
    output.innerText = `${color.r} ${color.g} ${color.b}`;
  };
};
