import { useEffect } from "react";
import { wrapGrid } from 'animate-css-grid'

let randomArray;
let row = 2;
let cols = 3;
const imgTag = document.getElementsByTagName('img');
let correct = 0;
let childCell = [];
let cell;

function check(e) {
  const marked = e.target.getAttribute('marked');
  if (marked === "true") {
    correct++;
    e.target.classList.add('bg-red-400')
    if (correct === randomArray.length) {
      correct = 0;
      reinitailize();

    }
  }
  else if (imgTag.length)
    imgTag[0].remove();
  else {
    var div = document.createElement("div");
    div.innerHTML = "Game Over";
    document.getElementById('main').appendChild(div);
  }

}
function generateRandom() {
  return Array.from({ length: row + 1 }, () => Math.floor(Math.random() * (row * cols)))
}

async function reinitailize() {
  row = row + 1;

  randomArray = generateRandom();

  let totalCell = (row * cols) - childCell.length;


  while (totalCell--) {
    childCell.push(<div className="rounded-2xl bg-white border-2 border-blue-500" style={{ width: '96px', height: '96px' }} key={totalCell} marked="false" onClick={(e) => { check(e) }}></div>);
  }

  cell = await document.getElementsByClassName('rounded-2xl');

  if (cell.length !== 0) {
    randomArray.forEach((num) => {
      cell[num].classList.add('bg-green-400')
      cell[num].setAttribute("marked", "true");
    });
  }
}
function App() {

  reinitailize();

  useEffect(() => {
    randomArray.forEach((num) => {
      cell[num].classList.add('bg-green-400')
      cell[num].setAttribute("marked", "true");
    });
    const grid = document.querySelector(".grid");
    wrapGrid(grid, { easing: 'backIn' });

  }, []);

  return (
    <>
      <div className="flex justify-center " id="main">
        <img src="https://img.icons8.com/ios-filled/100/000000/men-age-group-4.png" />
        <img src="https://img.icons8.com/ios-filled/100/000000/men-age-group-4.png" />
        <img src="https://img.icons8.com/ios-filled/100/000000/men-age-group-4.png" />
        <img src="https://img.icons8.com/ios-filled/100/000000/men-age-group-4.png" />
        <img src="https://img.icons8.com/ios-filled/100/000000/men-age-group-4.png" />
      </div>
      <div className={`App grid mx-auto mt-32 grid-cols-${cols} bg-blue-500`} style={{ width: `${cols * 96}px` }}>
        {
          childCell
        }
      </div>
    </>
  );
}

export default App;



