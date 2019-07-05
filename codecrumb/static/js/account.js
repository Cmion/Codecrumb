const proImg = document.querySelector(".pro-img");
const proImgIcon = document.querySelector(".pro-img-icon");
const userImg = document.querySelector(".user-image");
const fpLabels = document.querySelectorAll(".fp-labels");
const fpInput = document.querySelectorAll(".fp-wrapper input");
const delInput = document.querySelector(".del-wrapper input");
const snippetCode = document.querySelector("#snippet-code");
const loader = document.querySelector(".loader");
const submitSnippet = document.querySelector(".submit-snippet");
const snippetSource = document.querySelector("#snippets");

const snippetFormatted = snippetSource.value;

if (userImg) {
  proImgIcon.addEventListener("click", () => proImg.click());
  userImg.addEventListener("click", () => proImg.click());
}

const imageMenu = document.querySelector(".user-crumb img");
const userCrumbMenu = document.querySelector(".user-crumb-menu");
let is_out = false;
imageMenu.addEventListener("click", e => {
  userCrumbMenu.style.animation = "hoverin .1s linear forwards";
  is_out = true;
});
// userCrumbMenu.style.animation = "hoverout .0000000005s linear forwards";
// userCrumbMenu.style.animation = "hoverout .2s linear forwards";
window.addEventListener("click", function(e) {
  if (is_out) {
    if (e.target != imageMenu && e.target != userCrumbMenu) {
      userCrumbMenu.style.animation = "hoverout .1s linear forwards";
      is_out = false;
    }
  }
});

if (fpInput) {
  Array.from(fpInput).forEach(input => {
    input.addEventListener("keyup", () => {
      if (input.value.length > 0) {
        input.classList.add("filled");
      } else if (input.value.length == 0) {
        input.classList.remove("filled");
      }
    });
    if (input.value.length > 0) {
      input.classList.add("filled");
    } else if (input.value.length == 0) {
      input.classList.remove("filled");
    }
  });
}
// for the delete form
delInput.addEventListener("keyup", () => {
  if (delInput.value.length > 0) {
    delInput.classList.add("filled");
  } else if (delInput.value.length == 0) {
    delInput.classList.remove("filled");
  }
});
if (delInput.value.length > 0) {
  delInput.classList.add("filled");
} else if (delInput.value.length == 0) {
  delInput.classList.remove("filled");
}

window.addEventListener("load", function() {
  // eslint-disable-next-line no-undef
  loader.classList.add("load-off");
  loader.style.animation = "none";
  loader.style.display = "none";
});

function crumbEditor(mode) {
  return {
    mode: mode,
    lineNumbers: true,
    theme: "neo",
    scrollbarStyle: "simple",

    autoCloseTags: true,

    styleActiveLine: false,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autoRefresh: true,
    markTagPairs: true,
    autoRenameTags: true,
    jsxBracket: true,
    undoDepth: 500,
    lint: true,
    matchTags: {
      bothTags: true
    },

    // lint: {
    //     "esversion": 6
    // },

    extraKeys: {
      "Ctrl-Q": function(cm) {
        cm.foldCode(cm.getCursor());
      },

      "Alt-f": "findPersistent",

      "Ctrl-/": "toggleComment"
    },
    value: document.documentElement.innerHTML,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers"
    ]
  };
}

//eslint-disable-next-line no-undef
const snippetEditor = CodeMirror.fromTextArea(
  snippetCode,
  crumbEditor("application/json")
);

snippetEditor.setSize("80%", "100%");

const examp = `
{
  "globals": {
    "markup": {
      "snippets": {
        "foo": "div.foo[bar=baz]>span.hello"
      }
    },
    "stylesheet": {
      "snippets": {
        "myp": "my-super: property"
      }
    }
  }
}


`;

if (snippetFormatted == "None") {
  snippetEditor.setOption("value", examp);
} else {
  snippetEditor.setOption("value", snippetFormatted);
}

function getSnippets() {
  const origin = window.origin;

  fetch(`${origin}/user/crumbs/snippets`, {
    method: "POST",
    credentials: "include",
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ snippet: snippetEditor.getValue() })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => new Error(err));
}

submitSnippet.addEventListener("click", getSnippets);
console.log(snippetFormatted);
