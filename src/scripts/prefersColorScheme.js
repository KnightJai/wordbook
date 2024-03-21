
const defaultThemeClass = "theme--default";
const lightThemeClass = "theme--light";
const darkThemeClass = "theme--dark";


const toggleElements = getToggleElements();


updateDocumentState();
updateToggleStates();


toggleElements.forEach((toggle) =>
  toggle.addEventListener("click", toggleEventListenerFor(toggle))
);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (evt) => {
   
    if (document.body.classList.contains(defaultThemeClass)) {
      updateToggleStates();
    }
  });



function toggleEventListenerFor(element) {
  return (evt) => {
    const selectedColorScheme = evt.target.checked ? "dark" : "light";

    if (selectedColorScheme === getSystemColorScheme()) {

      removeUserColorScheme();
    } else {
 
      setUserColorScheme(selectedColorScheme);
    }
    updateDocumentState();
    updateToggleStates(evt.target);
  };
}


function updateToggleStates(currentEl) {
  
  const userScheme = getUserColorScheme();

  let checkedState = userScheme
    ? userScheme === "dark"
    : getSystemColorScheme() === "dark";

  toggleElements.forEach((el) => {
    if (el !== currentEl) {
      el.checked = checkedState;
    }
  });
}


function updateDocumentState() {
  const userTheme = getUserColorScheme();

  
  if (userTheme) {
    const userThemeClass =
      userTheme === "dark" ? darkThemeClass : lightThemeClass;

    if (!document.body.classList.contains(userThemeClass)) {
  
      document.body.classList.remove(defaultThemeClass);
      document.body.classList.remove(darkThemeClass);
      document.body.classList.remove(lightThemeClass);

      document.body.classList.add(userThemeClass);
    }
  } else {

    if (!document.body.classList.contains(defaultThemeClass)) {

      document.body.classList.remove(darkThemeClass);
      document.body.classList.remove(lightThemeClass);

      document.body.classList.add(defaultThemeClass);
    }
  }
}

function getSystemColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}


function removeUserColorScheme() {
  localStorage.removeItem("userColorScheme");
}


function setUserColorScheme(scheme) {
  localStorage.setItem("userColorScheme", scheme);
}


function getUserColorScheme() {
  return localStorage.getItem("userColorScheme");
}


function getToggleElements() {
  return Array.from(document.querySelectorAll("[data-dark-mode-toggle]"));
}
