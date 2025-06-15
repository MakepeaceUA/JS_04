document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("entry-form");
  const titleInput = document.getElementById("entry-title");
  const textInput = document.getElementById("entry-text");
  const entriesContainer = document.getElementById("entries");
  const themeToggle = document.getElementById("toggle-theme");
  const body = document.body;

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    if (!title || !text) return;

    const entry = createEntry(title, text);
    entriesContainer.appendChild(entry);

    console.log("parentNode:", entry.parentNode);
    console.log("firstChild:", entry.firstChild);
    console.log("lastChild:", entry.lastChild);
    console.log("nextElementSibling:", entry.nextElementSibling);
    console.log("previousElementSibling:", entry.previousElementSibling);

    form.reset();
  });

  function createEntry(title, text) {
    const entry = document.createElement("div");
    entry.classList.add("entry");

    const heading = document.createElement("h6");
    heading.textContent = "Запись";

    const entryTitle = document.createElement("h3");
    entryTitle.textContent = title;

    const entryText = document.createElement("p");
    entryText.textContent = text;

    const buttons = document.createElement("div");
    buttons.classList.add("entry-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.addEventListener("click", () => editEntry(entry, title, text));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => entry.remove());

    buttons.append(editBtn, deleteBtn);
    entry.append(heading, entryTitle, entryText, buttons);
    return entry;
  }

  function editEntry(entry, oldTitle, oldText) {
    const titleInput = document.createElement("input");
    titleInput.value = oldTitle;
    const textArea = document.createElement("textarea");
    textArea.value = oldText;
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Сохранить";

    entry.innerHTML = "";
    entry.append(titleInput, textArea, saveBtn);

    saveBtn.addEventListener("click", () => {
      const newTitle = titleInput.value.trim();
      const newText = textArea.value.trim();
      if (!newTitle || !newText) return;

      const updatedEntry = createEntry(newTitle, newText);
      entry.replaceWith(updatedEntry);
    });
  }
});