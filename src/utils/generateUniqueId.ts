function randomNoOne() {
  return Math.floor(Math.random() * 2);
}

function randomNoTwo() {
  return Math.floor(Math.random() * 10);
}

function randomNoThree() {
  return Math.floor(Math.random() * 26);
}

export function generateUniqueId() {
  let id = "";
  const idLen = 20;
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
  const integers = "0123456789";

  const digitTypes = ["alphabets", "integers"];

  for (let i = 0; i <= idLen; i++) {
    const digitType = digitTypes[randomNoOne()];
    let digit = "";

    if (digitType == "integers") {
      digit = integers[randomNoTwo()];
    } else {
      digit = alphabets[randomNoThree()];
    }

    id += digit;

    if (i == 4 || i == 9 || i == 14) {
      id += "-";
    }
  }

  return id;
}
