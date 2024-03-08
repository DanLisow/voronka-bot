document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lesson-form");
  const text = document.getElementById("task_text");
  const modal = document.getElementById("modal");
  const modalError = document.getElementById("modal-error");

  form.addEventListener("submit", formSubmit);

  async function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const answer = formData.get("answer");
    const lesson = formData.get("lesson");
    const userId = formData.get("userId");

    if (!answer) {
      text.classList.add("warning");
      text.focus();

      setTimeout(() => {
        text.classList.remove("warning");
      }, 2000);

      return;
    }

    const res = await fetch(`http://localhost:5000/${lesson}/${userId}`, {
      method: "POST",
      body: JSON.stringify({ answer, lesson, userId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

    console.log(res);

    if (!res.success) {
      modalError.showModal();
      document.body.classList.add("lock");

      return;
    }

    modal.showModal();
    document.body.classList.add("lock");
    event.target.reset();

    return;
  }

  modal.addEventListener("click", handlerClick);
  modalError.addEventListener("click", handlerClick);

  function handlerClick({ target, currentTarget }) {
    const dialogElem = target === currentTarget;

    if (dialogElem || target.type === "submit") {
      currentTarget.close();
      document.body.classList.remove("lock");
    }
  }
});
