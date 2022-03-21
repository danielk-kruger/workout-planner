const itemInput = document.getElementById("add-item");
const itemAddBtn = document.getElementById("add-btn");
const listContainer = document.querySelector(".list-container");
const contentContainer = document.querySelector(".content-wrapper");

itemAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let item = itemInput.value;
  addItem(item, "li");
  itemInput.value = "";
  itemInput.blur();
  // console.log(item);
});

function addItem(val, type) {
  const listItem = document.createElement(`${type}`);

  if (type == "a") {
    const h5 = document.createElement("h5");
    h5.textContent = val;
    listItem.classList = `collection-item indigo darken-3 indigo-text text-lighten-5`;
    listItem.appendChild(h5);
    listContainer.appendChild(listItem);
  } else {
    listItem.classList = `collection-item indigo lighten-2 grey-text text-darken-4`;
    listItem.textContent = val;
    insertCategoryItem(listItem);
  }
}

function insertCategoryItem(elem) {
  const categories = document.querySelectorAll("a.collection-item");

  categories.forEach((item) => {
    if (item.classList.contains("active")) {
      listContainer.insertBefore(elem, item.nextSibling);

      if (item.nextSibling === document.querySelector("li.collection-item")) {
        console.log("ahah");
      }
    }
  });
}

function initDropdown() {
  const dropDownElems = document.querySelectorAll(".dropdown-trigger");
  const instances = M.Dropdown.init(dropDownElems, {
    alignment: "right",
    container: contentContainer,
    coverTrigger: false,
    constrainWidth: false,
  });
}

function initTags() {
  const tagElems = document.querySelectorAll(".chips");
  const tagInstances = M.Chips.init(tagElems, {
    data: [
      {
        tag: "Chest",
      },
      {
        tag: "Shoulders",
      },
      {
        tag: "Triceps",
      },
    ],
  });

  let chipsArray = tagInstances[0].chipsData;
  // let dataNames = "";

  chipsArray.forEach((data) => addItem(data.tag, "a"));

  // listContainer.innerHTML = dataNames;
}

function setupEditableCategories() {
  const categories = document.querySelectorAll("a.collection-item");

  categories.forEach((item) => {
    // console.log(item);
    // item.classList.remove("active");

    listContainer.addEventListener("click", (e) => {
      if (e.target === item && !item.classList.contains("active"))
        e.target.classList.add("active");

      if (item.classList.contains("active") && e.target !== item)
        item.classList.remove("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initDropdown();
  initTags();
  setupEditableCategories();
});
