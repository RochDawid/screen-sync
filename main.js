const myBugElement = document.getElementById("myBug");
const otherBugElement = document.getElementById("otherBug");

let bugId = 1;
let otherBugId = 2;
let xMovement = 0;
let yMovement = 0;

const decideBugId = () => {
  if (localStorage.getItem("bug1")) {
    if (!localStorage.getItem("bug2")) {
      bugId = 2;
      otherBugId = 1;
    }
  }
};

const getBugPosition = () => {
  const { x, y } = myBugElement.getBoundingClientRect();
  const bugLeftRelativeToScreen = x + screenX;
  const bugTopRelativeToScreen = y + screenY;

  return {
    x: bugLeftRelativeToScreen,
    y: bugTopRelativeToScreen,
  };
};

const calculateMovement = () => {
  if (!localStorage.getItem(`bug${otherBugId}`)) {
    xMovement = 0;
    yMovement = 0;
    return;
  }

  const { x: myX, y: myY } = JSON.parse(localStorage.getItem(`bug${bugId}`));
  const { x: otherX, y: otherY } = JSON.parse(
    localStorage.getItem(`bug${otherBugId}`)
  );

  const xDiff = otherX - myX;
  const yDiff = otherY - myY;

  xMovement = xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1;
  yMovement = yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1;
};

const move = () => {
  if (!localStorage.getItem(`bug${otherBugId}`)) {
    const { width, height } = myBugElement.getBoundingClientRect();
    const bugLeft = (innerWidth - width) / 2;
    const bugTop = (innerHeight - height) / 2;

    myBugElement.style.left = `${bugLeft}px`;
    myBugElement.style.top = `${bugTop}px`;
  } else {
    const { x, y } = myBugElement.getBoundingClientRect();
    if (x === 0 || y === 0 || x === innerWidth || y === innerHeight) {
      return;
    }
    const newX = x + xMovement;
    const newY = y + yMovement;

    myBugElement.style.left = `${newX}px`;
    myBugElement.style.top = `${newY}px`;
  }
};

const updateBugPosition = () => {
  const bug = getBugPosition();
  localStorage.setItem(`bug${bugId}`, JSON.stringify(bug));
};

// ***************************** MAIN LOGIC ********************************

decideBugId();
setInterval(() => {
  updateBugPosition();
  calculateMovement();
  move();
}, 33.33);

addEventListener("beforeunload", () => {
  localStorage.removeItem(`bug${bugId}`);
  localStorage.removeItem(`bug${otherBugId}`);
});

myBugElement.addEventListener("click", () => {
  alert("Bad decision! Now your code will be full of bugs, watch out!");
});
