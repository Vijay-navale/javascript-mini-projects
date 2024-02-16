const commentContainer = document.getElementById("commentContainer");

const createElement = (element = "div", properties = {}, ...children) => {
  const el = document.createElement(element);
  for (let key in properties) {
    el[key] = properties[key];
  }
  children.forEach((childEl) => el.appendChild(childEl));
  return el;
};

const createComment = (name, text, settings = {}) => {
  const nameEl = createElement("p", {
    textContent: name,
    className: "text-bold name",
  });
  const textEl = createElement("p", {
    textContent: text,
    className: "comment-text",
  });
  const btnHolder = createElement("div", {
    className: "btn-holder",
  });
  const replyBtn = createElement("button", {
    textContent: "Reply",
    className: "btn btn-primary small reply",
  });
  btnHolder.appendChild(replyBtn);
  if (!settings?.hasNoEdit) {
    const editBtn = createElement("button", {
      textContent: "Edit",
      className: "btn btn-primary small edit",
    });
    btnHolder.appendChild(editBtn);
  }
  if (!settings?.hasNoDelete) {
    const deleteBtn = createElement("button", {
      textContent: "Delete",
      className: "btn btn-primary small delete",
    });
    btnHolder.appendChild(deleteBtn);
  }
  const mainComment = createElement(
    "div",
    {
      className: "main-comment",
    },
    nameEl,
    textEl,
    btnHolder
  );
  const subComments = createElement("div", {
    className: "sub-comments",
  });
  const comment = createElement(
    "div",
    {
      className: "comment",
    },
    mainComment,
    subComments
  );
  return comment;
};

commentContainer.appendChild(
  createComment("vijay", "hello there", { hasNoEdit: true, hasNoDelete: true })
);

const getInputComment = () => {
  const inputEl = createElement("input", {
    className: "text-bold name",
    placeholder: "Your name",
  });
  const textAreaEl = createElement("textArea", {
    className: "comment-text",
    placeholder: "comment",
    rows: "2",
    cols: "30",
  });
  const postBtn = createElement("button", {
    textContent: "Post",
    className: "btn btn-primary small post",
  });
  const cancelBtn = createElement("button", {
    textContent: "Cancel",
    className: "btn btn-primary small cancel",
  });
  const btnHolder = createElement(
    "div",
    {
      className: "btn-holder",
    },
    postBtn,
    cancelBtn
  );
  const comment = createElement(
    "div",
    {
      className: "comment",
    },
    inputEl,
    textAreaEl,
    btnHolder
  );
  return comment;
};

let isCommentOn = false;

commentContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName.toLowerCase() === "button") {
    if (target.classList.contains("reply") && !isCommentOn) {
      const mainComment = target.closest(".main-comment");
      mainComment.nextElementSibling.appendChild(getInputComment());
      isCommentOn = true;
      return;
    }
    if (target.classList.contains("cancel")) {
      target.closest(".comment").remove();
      isCommentOn = false;
      return;
    }
    if (target.classList.contains("post")) {
      const comment = target.closest(".comment");
      const subComments = target.closest(".sub-comments");
      const name = comment.children[0].value;
      const text = comment.children[1].value;
      if (!name || !text) {
        return;
      }
      comment.remove();
      subComments.appendChild(createComment(name, text));
      isCommentOn = false;
      return;
    }
    if (target.classList.contains("delete")) {
      target.closest(".comment").remove();
      return;
    }
    if (target.classList.contains("edit")) {
      const text = target.closest(".main-comment");
      text.children[1].contentEditable = true;
      target.previousElementSibling.disabled = true;
      target.nextElementSibling.disabled = true;
      target.textContent = "Save";
      target.classList = "btn btn-primary small save";
      return;
    }
    if (target.classList.contains("save")) {
      const text = target.closest(".main-comment");
      text.children[1].contentEditable = false;
      target.previousElementSibling.disabled = false;
      target.nextElementSibling.disabled = false;
      target.textContent = "Edit";
      target.classList = "btn btn-primary small edit";
      return;
    }
  }
});
