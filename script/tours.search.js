document
  .querySelector(".tour-form input").addEventListener("input", (ev) => {
    const newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?username=" +
      ev.target.value;

    window.history.pushState({ path: newURL }, "", newURL);
  });

