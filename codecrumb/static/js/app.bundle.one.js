const HtmlModes = {
  HTML: "html",
  PUG: "pug",
  MARKDOWN: "markdown"
};
const CSSModes = {
  CSS: "css",
  SCSS: "scss",
  SASS: "sass",
  LESS: "less",
  STYLUS: "stylus"
};
const JSModes = {
  JS: "javascript",
  CS: "coffeescript",
  TS: "typescript",
  BABEL: "babel",
  JSX: "jsx"
};

const modes = {};

//HTMLMODES
modes[HtmlModes.HTML] = {
  tdMimeType: "htmlmixed",
  name: "HTML",
  parser: "html"
};
modes[HtmlModes.PUG] = {
  tdMimeType: {
    name: "pug",
    alignCDATA: true
  },
  name: "Pug",
  parser: "html"
};
modes[HtmlModes.MARKDOWN] = {
  tdMimeType: {
    name: "gfm",
    tokenTypeOverrides: {
      emoji: "emoji"
    }
  },
  name: "Markdown",
  parser: "markdown"
};

//CSsMODES
modes[CSSModes.CSS] = {
  tdMimeType: "css",
  name: "CSS",
  parser: "css"
};
modes[CSSModes.SCSS] = {
  tdMimetype: "text/x-scss",
  name: "SCSS",
  parser: "css"
};
modes[CSSModes.SASS] = {
  tdMimeType: "sass",
  name: "SASS",
  parser: "css"
};
modes[CSSModes.LESS] = {
  tdMimeType: "text/x-less",
  name: "LESS",
  parser: "css"
};
modes[CSSModes.STYLUS] = {
  tdMimeType: "stylus",
  name: "Stylus",
  parser: "css"
};

//JSMODES
modes[JSModes.JS] = {
  tdMimeType: "javascript",
  name: "JavaScript",
  parser: "babylon"
};

modes[JSModes.CS] = {
  tdMimeType: "text/coffeescript",
  name: "CoffeeScript",
  parser: "babylon"
};
modes[JSModes.TS] = {
  tdMimeType: "text/typescript-jsx",
  name: "TypeScript",
  parser: "babylon"
};

modes[JSModes.BABEL] = {
  tdMimeType: "text/jsx",
  name: "Babel",
  parser: "babylon"
};
modes[JSModes.JSX] = {
  tdMimeType: "jsx",
  name: "JSX",
  parser: "babylon"
};

const {
  htmlArea,
  cssArea,
  jsArea,
  preview,
  pen,
  code,
  codeHead,
  htmlPen,
  cssPen,
  jsPen,
  editorTab,
  editorPreview,
  editorContainer,
  editorBody,
  getView,
  htmlTab,
  cssTab,
  jsTab,
  htmlMode,
  cssMode,
  jsMode,
  htmlResize,
  cssResize,
  jsResize,
  htmlHead,
  cssHead,
  jsHead,
  run,

  saveCrumb,
  cssLib,
  jsLib,
  metaLib,
  submitLib,
  generalSettings,
  languageSettings,
  balanceSettings,
  behaviourSettings,
  kbdSettings,
  profileSettings,
  customSettings,
  customTab,
  languageTab,
  generalTab,
  balanceTab,
  behaviourTab,
  kbdTab,
  profileTab,
  editorMenuMain,
  settingsBtn,
  gutterHori,
  crumbName,
  loader,
  userValue,
  cmDark,
  keymaps,
  fontFm,
  sizes,
  preset,
  consoleText,
  out,
  c_name,
  clearConsole,
  htmlPre,
  cssPre,
  jsPre,
  saveAnonCrumb,
  snippetSource,
  outnum,
  consoleBtn,
  preserveLog,
  htmlChangesMade,
  cssChangesMade,
  jsChangesMade,
  exportFile,
  linterITag,
  toggleLinter,
  consoleBar,
  openDebugConsole,
  tabSizeCustom,
  fontFmCustom,
  customFSize,
  fontLigatures,
  colorPickerType,
  autoRunDelay,
  consoleInput,
  resizeFrame,
  editorSkins,
  consoleOutput,
  tabSize,
  indentUnit,
  linterCh,
  activeLineCh,
  autoCompleteCh,
  footerLeft,
  footerRight,
  loopTimeout
} = elementDeclaration();

const csse = {
  html: "html",
  css: "css",
  js: "javascript"
};
// this code below doesn't to anything
// just prevents error caused by sharing js files between to html fils
// crazy naming convention? i know!!.
const dataItems = {
  author: false
};

const dataItem = userValue.value;
let jsChangeNum = 0,
  cssChangeNum = 0,
  htmlChangeNum = 0,
  saveCrumbClicked = false,
  delay;

const snippetFormatted = snippetSource.value;
const examp = {
  globals: {
    markup: {
      snippets: {
        foo: "div.foo[bar=baz]>span.hello{Hey crumber, this is a code snippet}"
      }
    },
    stylesheet: {
      snippets: {
        myp:
          "body{\n height: 100vh; \n color: #888; \n width: 100vw;\n background: #20232E;\n overflow: hidden; \n display: flex; \n align-items: center; \n justify-content: center; \n} \n .hello{ \n font-size: 30px; \n padding: 10px; \n color: white; \n text-transform: capitalize; \n}"
      }
    }
  }
};

animate();

function crumbEditor(mode) {
  return {
    mode: mode,
    lineNumbers: true,
    theme: "andromeda",
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
    showCursorWhenSelecting: true,
    matchTags: {
      bothTags: true
    },

    _extraKeys: {
      "Ctrl-Q": function(cm) {
        cm.foldCode(cm.getCursor());
      },
      "Alt-f": "findPersistent",
      "Ctrl-Enter": updatePreview,
      "Alt-A": function() {
        prettify(htmlEditor, cssEditor, jsEditor);
      },
      "Alt-J": function() {
        beautifySingleFile(jsEditor, csse.js);
      },
      "Alt-C": function() {
        beautifySingleFile(cssEditor, csse.css);
      },
      "Alt-H": function() {
        beautifySingleFile(htmlEditor, csse.html);
      },
      Tab: "emmetExpandAbbreviationAll",
      "Ctrl-E": "emmetExpandAbbreviationAll",
      Enter: "emmetInsertLineBreak",
      "Ctrl-Space": "autocomplete",
      "Ctrl-W": "emmetWrapWithAbbreviation",
      "Ctrl-/": "toggleComment"
    },
    get extraKeys() {
      return this._extraKeys;
    },
    set extraKeys(value) {
      this._extraKeys = value;
    },
    value: document.documentElement.innerHTML,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers"
    ],
    _emmet: snippetFormatted == "None" ? examp : JSON.parse(snippetFormatted),
    get emmet() {
      return this._emmet;
    },
    set emmet(value) {
      this._emmet = value;
    }
  };
}

const htmlEditor = CodeMirror.fromTextArea(htmlArea, crumbEditor("text/html"));
const cssEditor = CodeMirror.fromTextArea(cssArea, crumbEditor("css"));
const jsEditor = CodeMirror.fromTextArea(jsArea, crumbEditor("javascript"));

const consoleEditor = CodeMirror.fromTextArea(consoleText, {
  theme: "console-code",

  readOnly: true,
  lineWrapping: true,
  mode: "jsx",
  indentUnit: 2,
  tabSize: 2,
  indentWithTabs: true,
  scrollbarStyle: "simple",
  disableInput: true,
  showCursorWhenSelecting: true,
  extraKeys: {
    Tab: false
  },
  foldGutter: true,
  gutters: ["CodeMirror-foldgutter"]
});

// editors size
htmlEditor.setSize("100%", "100%");
cssEditor.setSize("100%", "100%");
jsEditor.setSize("100%", "100%");
consoleEditor.setSize("100%", "100%");

(function() {
  // html default value
  const htmlDefValue = `<!-- Every code written here is placed within the body tag -->
  <div class=\"foo\" bar=\"baz\">Hello World</div>`;
  htmlEditor.setOption("value", htmlDefValue);

  // css default value
  const cssDefValue = `/* toggle the settings button to use a preprocessor, like SCSS */
  body {
    font-family: "Raleway", sans-serif;
    color: #222222;
    font-size: 2em;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, #ffffff 0%, #6284ff 50%, #ff0000 100%)
  }
  .foo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }`;
  cssEditor.setOption("value", cssDefValue);

  // javascript default value
  const jsDefValue = `/* Click the Console button to view your logs */
  const codeCrumb = x => {
     console.log("Hey "+ x + ", Press Alt-R or Click Run to Preview your code.");
    };
    codeCrumb("Programmer");`;
  jsEditor.setOption("value", jsDefValue);

  consoleEditor.setOption("value", "# Your logs will appear here.... ");
  beautifySingleFile(htmlEditor, csse.html);
  beautifySingleFile(cssEditor, csse.css);
  beautifySingleFile(jsEditor, csse.js);
})();
const editors = [htmlEditor, cssEditor, jsEditor];

function setPreload(bool, path = false, e = false) {
  const moreRequire = returnStates();
  const htmlMode = moreRequire.html;
  const cssMode = moreRequire.css;
  const jsMode = moreRequire.js;

  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const htmlMeta = metaLib.value;
  const cssLibrary = cssLib.value;
  const jsLibrary = jsLib.value;

  const name = crumbName.crumb.value;

  const getPreload = JSON.stringify({
    modes: {
      htmlMode,
      cssMode,
      jsMode
    },
    codes: {
      html,
      css,
      js
    },
    libs: {
      htmlMeta: htmlMeta,
      cssLib: cssLibrary,
      jsLib: jsLibrary
    },
    title: {
      name
    },
    isNew: true,
    editorSettings: {
      keymap: keymaps.selectedOptions[0].getAttribute("name"),
      font: fontFm.selectedOptions[0].getAttribute("name"),
      theme: cmDark.selectedOptions[0].getAttribute("name"),
      fSize: sizes.selectedOptions[0].getAttribute("name")
    }
  });

  if (bool) {
    const org = window.origin;

    fetch(`${org}${path}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      cache: "no-cache",
      body: getPreload
    })
      .then(res => res.json())
      .then(data => {
        const newPath = data.path;
        const unsavedDraft = document.querySelector(".unsaved-draft");
        localStorage.removeItem("crumb");
        unsavedDraft.style.visibility = "hidden";
        saveCrumbClicked = e.target.classList.contains("save-crumb");
        const newUrl = `${org}/${newPath}`;
        window.location.href = newUrl;
      })
      .catch(err => console.warn(err));
  } else {
    localStorage.setItem("crumb", getPreload);
  }
}

(function() {
  if (localStorage.crumb) {
    const discard = document.querySelector(".discard-draft");
    const loadDraft = document.querySelector(".load-draft");
    const unsavedDraft = document.querySelector(".unsaved-draft");
    const alertModal = document.querySelector(".alert-md-body");
    unsavedDraft.style.visibility = "visible";
    document.addEventListener("DOMContentLoaded", function(e) {
      setTimeout(() => {
        alertModal.style.animation = "alertModal .15s linear forwards";
      }, 2500);
    });
    unsavedDraft.addEventListener("click", function(e) {
      e.preventDefault();
      alertModal.style.animation = "alertModal .15s linear forwards";
    });
    window.addEventListener("click", function(e) {
      if (e.target == alertModal) {
        alertModal.style.animation = "alertModalOut .15s linear forwards";
      }
    });

    discard.addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("crumb");
      unsavedDraft.style.visibility = "hidden";
      alertModal.style.animation = "alertModalOut .15s linear forwards";
    });

    loadDraft.addEventListener("click", function(e) {
      e.preventDefault();
      const editorItems = JSON.parse(localStorage.crumb);
      computePreloadPreview(editorItems);
      setTimeout(() => {
        alertModal.style.animation = "alertModalOut. 15s linear forwards";
      }, 500);
    });
  }
})();

function computePreloadPreview(editorItems) {
  const codes = editorItems.codes;
  const modes = editorItems.modes;
  const libs = editorItems.libs;
  const title = editorItems.title;

  const getSettings = editorItems.editorSettings;

  htmlEditor.getDoc().setValue(codes.html);
  cssEditor.getDoc().setValue(codes.css);
  jsEditor.getDoc().setValue(codes.js);
  cssLib.value = libs.cssLib || "";
  jsLib.value = libs.jsLib || "";
  metaLib.value = libs.htmlMeta || "";
  crumbName.crumb.value = title.name || "";

  htmlPenState(htmlEditor, modes.htmlMode);
  cssPenState(cssEditor, modes.cssMode);
  jsPenState(jsEditor, modes.jsMode);

  const htmlPre = document.querySelector("#html-pre");

  const cssPre = document.querySelector("#css-pre");

  const jsPre = document.querySelector("#js-pre");

  const htmlName = document.querySelector(".html-mode-name");
  const cssName = document.querySelector(".css-mode-name");

  const jsName = document.querySelector(".js-mode-name");

  const cssP = cssPre.namedItem(modes.cssMode);

  const htmlP = htmlPre.namedItem(modes.htmlMode);

  const jsP = jsPre.namedItem(modes.jsMode);

  const htmlAttr = htmlP.getAttribute("data-name");
  const cssAttr = cssP.getAttribute("data-name");
  const jsAttr = jsP.getAttribute("data-name");

  csse.html = modes.htmlMode;
  csse.css = modes.cssMode;
  csse.js = modes.jsMode;

  htmlName.innerHTML = `<span>${htmlAttr}</span>`;
  cssName.innerHTML = `<span>${cssAttr}</span>`;
  jsName.innerHTML = `<span>${jsAttr}</span>`;

  cssPre.options.selectedIndex = cssP.index;
  htmlPre.options.selectedIndex = htmlP.index;
  jsPre.options.selectedIndex = jsP.index;

  updatePreview();
}

function unsavedChange() {
  let t;

  htmlEditor.on("keyup", function() {
    clearTimeout(t);
    t = setTimeout(() => {
      htmlChangeNum++;
      htmlChangesMade.setAttribute(
        "data-change",
        `${htmlChangeNum} unsaved change`
      );
      document.documentElement.style.setProperty("--html", "1");
    }, 2000);
  });

  cssEditor.on("keyup", function() {
    clearTimeout(t);
    t = setTimeout(() => {
      cssChangeNum++;
      cssChangesMade.setAttribute(
        "data-change",
        `${cssChangeNum} unsaved change`
      );
      document.documentElement.style.setProperty("--css", "1");
    }, 2000);
  });

  jsEditor.on("keyup", function() {
    clearTimeout(t);
    t = setTimeout(() => {
      jsChangeNum++;
      jsChangesMade.setAttribute(
        "data-change",
        `${jsChangeNum} unsaved change`
      );
      document.documentElement.style.setProperty("--js", "1");
    }, 2000);
  });
}
unsavedChange();

function savedChange() {
  document.documentElement.style.setProperty("--html", "0");
  document.documentElement.style.setProperty("--css", "0");
  document.documentElement.style.setProperty("--js", "0");

  cssChangeNum = 0;
  jsChangeNum = 0;
  htmlChangeNum = 0;
}

function updatePreview() {
  const moreRequire = returnStates(htmlEditor, cssEditor, jsEditor);

  const htmlRequire = moreRequire.html;
  const cssRequire = moreRequire.css;
  const jsRequire = moreRequire.js;

  const getHTMLMode = HtmlCompile(htmlEditor, htmlRequire);
  const getCSSMode = CSSCompile(cssEditor, cssRequire);
  const getJSMode = JSCompile(jsEditor, jsRequire);

  Promise.all([getHTMLMode, getCSSMode, getJSMode]).then(data => {
    const url = getPreview({
      html: data[0].code,
      css: data[1].code,
      js: data[2].code,
      meta: metaLib,
      cssExt: cssLib,
      jsExt: jsLib,
      mode: jsRequire
    });

    printError(data[0].error);
    printError(data[1].error);
    printError(data[2].error);

    const animationFrame = requestAnimationFrame || webkitRequestAnimationFrame;
    requestAnimationFrame(() => {
      preview.src = url;
    });
  });
  localStorage.removeItem("crumb");

  // console.clear();
}

function printError(x) {
  let errorCount = parseInt(outnum.getAttribute("data-error"));
  let consoleBError = parseInt(consoleBar.getAttribute("data-label"));

  if (x) {
    const mess = x.data[0].message;
    const language = x.lang;

    const lineNo = x.data[0].lineNumber;
    const dashes = "-----------------------------------------";

    const errorOutput = `\n${dashes}\n[${language.toUpperCase()}] ${mess} \n\t\t\t\t at line ${lineNo}\n${dashes}`;

    // updates the  console.
    if (preserveLog.checked) {
      errorCount++;
      consoleBError++;
      outnum.setAttribute("data-error", `${errorCount}`);
      consoleBError > 1
        ? consoleBar.setAttribute("data-label", `${consoleBError} errors.`)
        : consoleBar.setAttribute("data-label", `${consoleBError} error.`);
      consoleEditor.replaceRange(
        errorOutput,
        CodeMirror.Pos(consoleEditor.lastLine() + 1)
      );
    } else if (!preserveLog.checked) {
      consoleEditor.getDoc().setValue(errorOutput);
      ++errorCount;
      ++consoleBError;
      outnum.setAttribute("data-error", `${errorCount}`);
      consoleBError > 1
        ? consoleBar.setAttribute("data-label", `${consoleBError} errors.`)
        : consoleBar.setAttribute("data-label", `${consoleBError} error.`);
    }

    // updates textContent / error numbers and set text color.

    outnum.textContent = `${errorCount}`;
  }
}
submitLib.addEventListener("click", () => {
  updatePreview();
});
crumbName.crumb.addEventListener("blur", e => {
  if (e.target.value === "" || e.target.value.length < 1) {
    e.target.value = "Unnamed Crumb";
  }
});
crumbName.crumb.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    if (e.target.value === "" || e.target.value.length < 1) {
      e.target.value = "Unnamed Crumb";
    }
    crumbName.crumb.blur();
  }
});
crumbName.addEventListener("submit", e => {
  e.preventDefault();
});

run.addEventListener("click", e => {
  e.preventDefault();

  updatePreview();

  //console.log(JSON.parse(p))
});

function __setEditorPreset__(type, value) {
  if (localStorage.__defineEditorPresets__) {
    const x = JSON.parse(localStorage.__defineEditorPresets__);
    if (!x.type) {
      const addType = { ...x, [type]: value };
      localStorage.setItem("__defineEditorPresets__", JSON.stringify(addType));
    } else {
      localStorage.setItem(
        "__defineEditorPresets__",
        JSON.stringify({
          ...x,
          [type]: value
        })
      );
    }
  }
  if (
    localStorage.__defineEditorPresets__ === undefined &&
    type === undefined &&
    value === undefined
  ) {
    let __defineEditorPresets__ = {
      skin: "dark",
      layout: "column",
      colorPicker: "default",
      linter: true,
      autoComplete: true,
      runDelayTimeout: 2000,
      tab: 2,
      indent: 2,
      fontLigatures: true,
      activeLine: false,
      loopTimeout: 1000
    };
    localStorage.setItem(
      "__defineEditorPresets__",
      JSON.stringify(__defineEditorPresets__)
    );
  }
}
__setEditorPreset__();
settingButtons(
  htmlEditor,
  cssEditor,
  jsEditor,
  editors,
  updatePreview,
  cmDark,
  fontFm,
  sizes,
  keymaps
);
initState(htmlEditor, cssEditor, jsEditor, updatePreview);

keyboardShortCuts(updatePreview, htmlEditor, cssEditor, jsEditor);

const anonymousModal = document.querySelector(".save-md-body");

if (dataItem === "True") {
  saveCrumb.addEventListener("click", e => {
    e.preventDefault();
    const unsavedDraft = document.querySelector(".unsaved-draft");
    localStorage.removeItem("crumb");
    unsavedDraft.style.visibility = "hidden";
    setPreload(true, "/crumbs/save", e);
  });
  const editorPreset = JSON.parse(preset.value);
  const getSettings = editorPreset.editorSettings;
  changeEditorSettings(
    htmlEditor,
    cssEditor,
    jsEditor,
    getSettings,
    cmDark,
    fontFm,
    sizes,
    keymaps
  );
} else {
  saveCrumb.addEventListener("click", e => {
    e.preventDefault();
    setPreload(false);
    savedChange();
    anonymousModal.style.animation = "alertModal .15s linear  forwards";
  });

  window.addEventListener("click", e => {
    if (e.target == anonymousModal) {
      anonymousModal.style.animation = "alertModalOut .15s linear forwards";
    }
  });

  saveAnonCrumb.addEventListener("click", function(e) {
    e.preventDefault();

    setPreload(true, "/anon/crumbs", e);
  });
}

function redirectUser(url) {
  const org = window.origin;
  // const path = window.location.pathname;
  // const urlString = path.split("/")[3];

  // const getPreload = {
  //   path: urlString,
  //   author: dataItems.author
  // };

  fetch(`${org}${url}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    cache: "no-cache",
    body: JSON.stringify(getPreload)
  })
    .then(res => res.json())
    .then(data => {
      const newPath = data.path;
      const newUrl = `${org}/${newPath}`;
      window.location.href = newUrl;
    })
    .catch(err => console.warn(err));
}

function elementDeclaration() {
  const htmlArea = document.querySelector("#html");
  const cssArea = document.querySelector("#css");
  const jsArea = document.querySelector("#js");
  const preview = document.querySelector("#transcend-preview");
  const pen = document.querySelector(".pen");
  const code = document.querySelector(".code-pen");
  const codeHead = document.querySelectorAll(".code-head");
  const htmlPen = document.querySelector(".html-pen");
  const cssPen = document.querySelector(".css-pen");
  const jsPen = document.querySelector(".js-pen");
  const editorTab = document.querySelectorAll(".editor-tab");
  const editorPreview = document.querySelector(".editor-preview ");
  const editorContainer = document.querySelector(".editor-container");
  const editorBody = document.querySelector(".editor-body");
  const getView = document.querySelector(".get-view");
  const htmlTab = document.querySelector(".htmlTab");
  const cssTab = document.querySelector(".cssTab");
  const jsTab = document.querySelector(".jsTab");
  const htmlMode = document.querySelector(".html-mode");
  const cssMode = document.querySelector(".css-mode");
  const jsMode = document.querySelector(".js-mode");
  const htmlResize = document.querySelector(".html-resize");
  const cssResize = document.querySelector(".css-resize");
  const jsResize = document.querySelector(".js-resize");
  const htmlHead = document.querySelector("#html-head");
  const cssHead = document.querySelector("#css-head");
  const jsHead = document.querySelector("#js-head");
  const run = document.querySelector(".run-preview");

  const saveCrumb = document.querySelector(".save-crumb");
  const cssLib = document.querySelector("#csslib");
  const jsLib = document.querySelector("#jslib");
  const metaLib = document.querySelector("#metalib");
  const submitLib = document.querySelector("#submit-lib");
  const generalSettings = document.querySelector(".general-settings");
  const languageSettings = document.querySelector(".language");
  const customSettings = document.querySelector(".sc-custom");
  const balanceSettings = document.querySelector(".balance");
  const behaviourSettings = document.querySelector(".behaviour-settings");
  const kbdSettings = document.querySelector(".keyboard-shortcuts");
  const profileSettings = document.querySelector(".profile-settings");
  const generalTab = document.querySelector(".general-tab");
  const languageTab = document.querySelector(".language-tab");
  const customTab = document.querySelector(".custom-tab");
  const balanceTab = document.querySelector(".balance-tab");
  const behaviourTab = document.querySelector(".behaviour-tab");
  const kbdTab = document.querySelector(".keyboard-tab");
  const profileTab = document.querySelector(".profile-tab");
  const editorMenuMain = document.querySelector(".editor-menu-main");
  const consoleBtn = document.querySelector(".open-console");
  const settingsBtn = document.querySelector(".settings-button");
  const gutterHori = document.querySelector(".resize-both");
  const crumbName = document.forms.crumbName;
  const loader = document.querySelector(".loader");
  const userValue = document.querySelector("#userValue");
  const cmDark = document.querySelector(".theme-dark");
  const keymaps = document.querySelector(".keymaps");
  const fontFm = document.querySelector(".fonts");
  const sizes = document.querySelector(".font-size");
  const preset = document.querySelector("#preset");
  const consoleText = document.querySelector("#error-log");
  const out = document.querySelector(".out");
  const c_name = document.querySelector(".console-name");
  const clearConsole = document.querySelector(".out-clear");
  const htmlPre = document.querySelector("#html-pre");
  const cssPre = document.querySelector("#css-pre");
  const jsPre = document.querySelector("#js-pre");
  const saveAnonCrumb = document.querySelector(".save-anon-crumb");
  const snippetSource = document.querySelector("#snippets");
  const outnum = document.querySelector(".console-label");
  const preserveLog = document.querySelector("#preserve-log");
  const htmlChangesMade = document.querySelector(".html-changes-made");
  const cssChangesMade = document.querySelector(".css-changes-made");
  const jsChangesMade = document.querySelector(".js-changes-made");
  const openPseudocode = document.querySelector(".toggle-pseudo-code");
  const exportFile = document.querySelector(".export-file");
  const linterITag = document.querySelector(".tg-l");
  const toggleLinter = document.querySelector(".toggle-linter");
  const consoleBar = document.querySelector(".console-bar");
  const openDebugConsole = document.querySelector(".open-debug-console");
  const tabSizeCustom = document.querySelector("#tab-size-custom");
  const fontFmCustom = document.querySelector("#font-family-custom");
  const customFSize = document.querySelector("#font-size-custom");
  const fontLigatures = document.querySelector("#font-ligatures");
  const colorPickerType = document.querySelector("#color-picker-type");
  const autoRunDelay = document.querySelector("#auto-run-delay");
  const consoleInput = document.querySelector("#input-log");
  const resizeFrame = document.querySelector(".frame-in");
  const editorSkins = document.querySelector("#editor-skin");
  const consoleOutput = document.querySelector(".output-console");
  const tabSize = document.querySelector(".tab-size");
  const indentUnit = document.querySelector(".indent-unit");
  const linterCh = document.querySelector("#linter-check");
  const activeLineCh = document.querySelector("#active-line");
  const autoCompleteCh = document.querySelector("#complete");
  const footerLeft = document.querySelector(".footer-left");
  const footerRight = document.querySelector(".footer-right");
  const loopTimeout = document.querySelector("#loop-timeout");

  return {
    htmlArea,
    cssArea,
    jsArea,
    preview,
    pen,
    code,
    codeHead,
    htmlPen,
    cssPen,
    jsPen,
    editorTab,
    editorPreview,
    editorContainer,
    editorBody,
    getView,
    htmlTab,
    cssTab,
    jsTab,
    htmlMode,
    cssMode,
    jsMode,
    htmlResize,
    cssResize,
    jsResize,
    htmlHead,
    cssHead,
    jsHead,
    run,
    consoleBtn,
    saveCrumb,
    cssLib,
    jsLib,
    metaLib,
    submitLib,
    generalSettings,
    languageSettings,
    balanceSettings,
    behaviourSettings,
    kbdSettings,
    profileSettings,
    customSettings,
    customTab,
    languageTab,
    generalTab,
    balanceTab,
    behaviourTab,
    kbdTab,
    profileTab,
    editorMenuMain,
    settingsBtn,
    gutterHori,
    crumbName,
    loader,
    userValue,
    cmDark,
    keymaps,
    fontFm,
    sizes,
    preset,
    consoleText,
    out,
    c_name,
    clearConsole,
    htmlPre,
    cssPre,
    jsPre,
    saveAnonCrumb,
    snippetSource,
    outnum,
    preserveLog,
    htmlChangesMade,
    cssChangesMade,
    jsChangesMade,
    openPseudocode,
    exportFile,
    linterITag,
    toggleLinter,
    consoleBar,
    openDebugConsole,
    tabSizeCustom,
    fontFmCustom,
    customFSize,
    fontLigatures,
    colorPickerType,
    autoRunDelay,
    consoleInput,
    resizeFrame,
    editorSkins,
    consoleOutput,
    tabSize,
    indentUnit,
    linterCh,
    activeLineCh,
    autoCompleteCh,
    footerLeft,
    footerRight,
    loopTimeout
  };
}

window.addEventListener("beforeunload", function(e) {
  if (
    (htmlChangeNum > 0 && !saveCrumbClicked) ||
    (cssChangeNum > 0 && !saveCrumbClicked) ||
    (jsChangeNum > 0 && !saveCrumbClicked)
  ) {
    e.returnValue =
      "Changes you made have not been saved, Do you still want to reload?";
    return "Changes you made have not been saved, Do you still want to reload?";
  }
});
function deferred() {
  const s = {};
  const promise = new Promise(function(resolve, reject) {
    s.resolve = resolve;
    s.reject = reject;
  });
  s.promise = promise;
  return Object.assign(s, promise);
}
function htmlPenState(editor, mode) {
  const d = deferred();

  if (mode === HtmlModes.HTML) {
    editor.setOption("mode", modes.html.tdMimeType);
    const gMode = editor.getOption("mode");
    d.resolve({
      mode: gMode
    });
  } else if (mode === HtmlModes.MARKDOWN) {
    editor.setOption("mode", modes.markdown.tdMimeType);
    const gMode = editor.getOption("mode");
    d.resolve({
      mode: gMode
    });
  } else if (mode === HtmlModes.PUG) {
    editor.setOption("mode", modes.pug.tdMimeType);
    const gMode = editor.getOption("mode");
    d.resolve({
      mode: gMode
    });
  }
  return d.promise;
}

function cssPenState(editor, mode) {
  if (mode === CSSModes.CSS) {
    editor.setOption("mode", modes.css.tdMimeType);
  } else if (mode === CSSModes.SASS || mode === CSSModes.SCSS) {
    if (mode === CSSModes.SASS) {
      editor.setOption("mode", modes.sass.tdMimeType);
    } else if (mode === CSSModes.SCSS) {
      editor.setOption("mode", modes.scss.tdMimetype);
      // console.log(mode, modes.scss.tdModePath, modes.scss.tdMimetype)
      // console.info(editor.getOption("mode"))
    }
  } else if (mode === CSSModes.STYLUS) {
    editor.setOption("mode", modes.stylus.tdMimeType);
  } else if (mode === CSSModes.LESS) {
    editor.setOption("mode", modes.less.tdMimeType);
  }
}

function jsPenState(editor, mode) {
  if (mode === JSModes.JS) {
    editor.setOption("mode", modes.javascript.tdMimeType);
  } else if (mode === JSModes.CS) {
    editor.setOption("mode", modes.coffeescript.tdMimeType);
  } else if (mode === JSModes.TS) {
    editor.setOption("mode", modes.typescript.tdMimeType);
  } else if (mode === JSModes.BABEL) {
    editor.setOption("mode", modes.babel.tdMimeType);
  } else if (mode === JSModes.JSX) {
    editor.setOption("mode", modes.jsx.tdMimeType);
  }
}

/* eslint-disable no-console */

const loopProtect = ({ code, timeout }) => {
  let m = [];
  const prefix = "$THIS_IS_CC_LOOP_PROTECT_VARIABLE";
  const loopVariable = "\nconst %d = Date.now();\n";
  let loopStr =
    "\n\tif((Date.now() - %d) > " +
    timeout +
    "){\n\tthrow new RangeError(`Potential infinite loop prevented,\n if you want the loop to iterate a little longer, \n use the custom panel in the settings panel to change the duration\nnote: these page might not be responsive if the duration is or more than 2000ms\n`);\n}\n";
  let loopID = 0;
  // esprima's AST is used to parse the script

  // These infinite loop prevention method uses the insertion method
  // it inserts checks into any loop
  // the checks contains a timestamp and once the time stamp is exceeded the loop breaks.
  try {
    esprima.parseScript(
      code,
      {
        tolerant: true,
        jsx: true,
        range: true
      },
      function(node) {
        switch (node.type) {
          case "DoWhileStatement":
          case "ForStatement":
          case "ForInStatement":
          case "WhileStatement":
          case "ForOfStatement":
            let p = loopStr;
            let e = "";
            let range = 1 + node.body.range[0];
            if (node.body.type !== "BlockStatement") {
              p = "{" + p;
              e = "\n}";
              --range;
            }
            m.push({ pos: range, str: p.replace("%d", prefix + loopID) });
            m.push({ pos: node.body.range[1], str: e });
            m.push({
              pos: node.range[0],
              str: loopVariable.replace("%d", prefix + loopID)
            });
            loopID++;
            break;
          default:
            break;
        }
      }
    );

    m.sort((x, y) => y.pos - x.pos).forEach(n => {
      code = code.slice(0, n.pos) + n.str + code.slice(n.pos);
    });

    return code;
  } catch (e) {}
};

function HtmlCompile(editor, mode) {
  const d = deferred();

  let userCode = editor.getValue();
  let error;
  if (mode === HtmlModes.HTML) {
    editor.setOption("mode", modes.html.tdMimeType);
    try {
      prettier.format(userCode, {
        parser: "html",
        plugins: prettierPlugins
      });
    } catch (e) {
      error = {
        lang: "HTML",
        data: [
          {
            lineNumber: editor.lineCount(),
            message: e.message
          }
        ]
      };
    } finally {
      d.resolve({
        code: userCode,
        error
      });
    }
  } else if (mode === HtmlModes.MARKDOWN) {
    editor.setOption("mode", modes.markdown.tdMimeType);
    showdown.setFlavor("github");
    const converter = new showdown.Converter();
    const code = converter.makeHtml(userCode);
    d.resolve({
      code: code
    });
  } else if (mode === HtmlModes.PUG) {
    editor.setOption("mode", modes.pug.tdMimeType);
    try {
      userCode = jade.render(editor.getValue());
    } catch (e) {
      error = {
        lang: "Pug",
        data: [
          {
            lineNumber: editor.lineCount(),
            message: e.message
          }
        ]
      };
    } finally {
      d.resolve({
        code: userCode,
        error
      });
    }
  }

  return d.promise;
}

function CSSCompile(editor, mode) {
  const d = deferred();
  let error;
  const userCode = editor.getValue();
  if (mode === CSSModes.CSS) {
    editor.setOption("mode", modes.css.tdMimeType);
    try {
      prettier.format(userCode, {
        parser: "css",
        plugins: prettierPlugins
      });
    } catch (e) {
      error = {
        lang: "CSS",
        data: [
          {
            lineNumber: editor.lineCount(),
            message: e.message
          }
        ]
      };
    } finally {
      d.resolve({
        code: userCode,
        error
      });
    }
  } else if (mode === CSSModes.SASS || mode === CSSModes.SCSS) {
    const sass = new Sass();

    if (mode === CSSModes.SASS) {
      editor.setOption("mode", modes.sass.tdMimeType);

      sass.compile(
        userCode,
        {
          indentedSyntax: true
        },
        function(result) {
          if (result.line && result.message) {
            error = {
              lang: "SASS",
              data: [
                {
                  lineNumber: result.line,
                  message: result.message
                }
              ]
            };
          }
          d.resolve({
            code: result.text,
            error
          });
        }
      );
    } else if (mode === CSSModes.SCSS) {
      editor.setOption("mode", modes.scss.tdMimetype);
      sass.compile(
        userCode,
        {
          indentedSyntax: false
        },
        function(result) {
          if (result.line && result.message) {
            error = {
              lang: "SCSS",
              data: [
                {
                  lineNumber: result.line,
                  message: result.message
                }
              ]
            };
          }
          d.resolve({
            code: result.text,
            error
          });
        }
      );
    }
  } else if (mode === CSSModes.STYLUS) {
    editor.setOption("mode", modes.stylus.tdMimeType);
    stylus(editor.getValue()).render(function(err, result) {
      console.log(err);
      if (err) {
        error = {
          lang: "STYLUS",
          data: [
            {
              lineNumber: editor.lineCount(),
              message: err.message.split("}")
            }
          ]
        };
        d.resolve({
          code: "",
          error
        });
      }
      d.resolve({
        code: result
      });
    });
  } else if (mode === CSSModes.LESS) {
    editor.setOption("mode", modes.less.tdMimeType);
    less
      .render(editor.getValue())
      .then(data => {
        d.resolve({
          code: data.css
        });
      })
      .catch(err => {
        error = {
          lang: "LESS",
          data: [
            {
              lineNumber: err.line,
              message: err.message
            }
          ]
        };
        d.resolve({
          code: "",
          error
        });
      });
  }

  return d.promise;
}

function JSCompile(editor, mode) {
  let infiniteLoopTimeout = localStorage.getItem("__defineEditorPresets__")
    ? JSON.parse(localStorage.getItem("__defineEditorPresets__")).loopTimeout
    : 1000;
  let userCode = editor.getValue();
  const d = deferred();
  let error;

  if (mode === JSModes.JS) {
    editor.setOption("mode", modes.javascript.tdMimeType);
    try {
      prettier.format(userCode, {
        parser: "babylon",
        plugins: prettierPlugins
      });
    } catch (e) {
      const x = e.message.split("\n")[0].split(" ");
      const y = x[x.length - 1];
      const o = y.slice(1, y.length - 1);
      error = {
        lang: "JS",
        data: [
          {
            lineNumber: o,
            message: e.message
          }
        ]
      };
    } finally {
      const code = loopProtect({
        code: userCode,
        timeout: parseInt(infiniteLoopTimeout, 10)
      });
      d.resolve({
        code: code,
        error
      });
    }
  } else if (mode === JSModes.CS) {
    editor.setOption("mode", modes.coffeescript.tdMimeType);
    try {
      userCode = CoffeeScript.compile(userCode, {
        bare: true
      });
    } catch (e) {
      error = {
        lang: "CoffeeScript",
        data: [
          {
            lineNumber: e.location.first_line + 1,
            message: e.message
          }
        ]
      };
    } finally {
      const code = loopProtect({
        code: userCode,
        timeout: parseInt(infiniteLoopTimeout, 10)
      });
      d.resolve({
        code: code,
        error
      });
    }
  } else if (mode === JSModes.TS) {
    editor.setOption("mode", modes.typescript.tdMimeType);
    try {
      userCode = ts.transpileModule(userCode, {
        reportDiagnostics: true,
        compilerOptions: {
          noEmitOnError: false,
          diagnostics: true,
          module: ts.ModuleKind.ES2015,
          jsx: "react",
          jsxEmit: "react"
        }
      });

      if (userCode.diagnostics.length) {
        error = {
          lang: "TypeScript",
          data: [
            {
              message: userCode.diagnostics[0].messageText,
              lineNumber:
                ts.getLineOfLocalPosition(
                  userCode.diagnostics[0].file,
                  userCode.diagnostics[0].start
                ) - 1
            }
          ]
        };
      }
      const code = loopProtect({
        code: userCode.outputText,
        timeout: parseInt(infiniteLoopTimeout, 10)
      });
      d.resolve({
        code: code,
        error
      });
    } catch (e) {}
  } else if (mode === JSModes.BABEL) {
    editor.setOption("mode", modes.babel.tdMimeType);

    try {
      prettier.format(userCode, {
        parser: "babylon",
        plugins: prettierPlugins
      });
      userCode = Babel.transform(userCode, {
        presets: ["latest", "stage-3", "react"]
      }).code;
    } catch (e) {
      const x = e.message.split("\n")[0].split(" ");
      const y = x[x.length - 1];
      const o = y.slice(1, y.length - 1);
      error = {
        lang: "Babel",
        data: [
          {
            lineNumber: o,
            message: e.message
          }
        ]
      };
      // eslint-disable-next-line no-console
    } finally {
      const code = loopProtect({
        code: userCode,
        timeout: parseInt(infiniteLoopTimeout, 10)
      });
      d.resolve({
        code: code,
        error
      });
    }
  } else if (mode === JSModes.JSX) {
    editor.setOption("mode", modes.jsx.tdMimeType);

    try {
      prettier.format(userCode, {
        parser: "babylon",
        plugins: prettierPlugins
      });
      userCode = Babel.transform(userCode, {
        presets: ["latest", "stage-3", "react"]
      }).code;
    } catch (e) {
      const x = e.message.split("\n")[0].split(" ");
      const y = x[x.length - 1];
      const o = y.slice(1, y.length - 1);

      error = {
        lang: "JSX",
        data: [
          {
            lineNumber: o,
            message: e.message
          }
        ]
      };
      // eslint-disable-next-line no-console
    } finally {
      const code = loopProtect({
        code: userCode,
        timeout: parseInt(infiniteLoopTimeout, 10)
      });
      d.resolve({
        code: code,
        error
      });
    }
  }
  return d.promise;
}

function initState(htmlEditor, cssEditor, jsEditor, updatePreview) {
  htmlPre.addEventListener("change", e => {
    const modeName = document.querySelector(".html-mode-name");
    const current = e.currentTarget.selectedOptions[0];
    const nameAttr = current.getAttribute("data-name");

    modeName.textContent = `${nameAttr}`;
    // modeName.style.paddingLeft = "7px";

    const mode = current.getAttribute("data-mode");

    csse.html = mode || "";

    htmlPenState(htmlEditor, mode);
    updatePreview();
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
  });

  cssPre.addEventListener("change", e => {
    const modeName = document.querySelector(".css-mode-name");
    const current = e.currentTarget.selectedOptions[0];
    const nameAttr = current.getAttribute("data-name");

    modeName.textContent = `${nameAttr}`;
    // modeName.style.paddingLeft = "7px";
    const mode = current.getAttribute("data-mode");
    csse.css = mode || "";
    cssPenState(cssEditor, mode);
    updatePreview();
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
  });

  jsPre.addEventListener("change", e => {
    const modeName = document.querySelector(".js-mode-name");
    const current = e.currentTarget.selectedOptions[0];
    const nameAttr = current.getAttribute("data-name");

    modeName.textContent = `${nameAttr}`;
    // modeName.style.paddingLeft = "7px";
    const mode = current.getAttribute("data-mode");
    csse.js = mode || "";

    jsPenState(jsEditor, mode);
    updatePreview();
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
  });
}

function returnStates() {
  const html = csse.html;
  const css = csse.css;
  const js = csse.js;

  return {
    html,
    css,
    js
  };
}

// called in main js file

// eslint-disable-next-line no-unused-vars
function getPreview({ html, css, js, meta, cssExt, jsExt, mode }) {
  // data is converted to a blob;
  // strictly frontend.
  const consoleJs = window.location.origin + "/static/preview/console-min.js";

  const otherScript = [consoleJs];

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], {
      type
    });

    return URL.createObjectURL(blob);
  };

  // eslint-disable-next-line no-undef
  if (mode == JSModes.BABEL || mode == JSModes.JSX) {
    otherScript.push(
      window.origin + "/static/lib/transpilers/babel-polyfill.min.js"
    );
  }

  const jsURL = getBlobURL(js, "text/javascript");

  const externalCss = cssExt.value.split("\n").reduce(function(links, url) {
    return (
      links +
      (url
        ? '\n<link rel="stylesheet" type="text/css" href="' + url + '">'
        : "")
    );
  }, "");
  const externalJs = jsExt.value.split("\n").reduce(function(links, url) {
    return links + (url ? '\n<script src="' + url + '"></script>' : "");
  }, "");
  const externalMeta = meta.value.split("\n").reduce(function(links, url) {
    return links + (url ? url : "");
  }, "");

  const miscScript = otherScript.reduce((script, src) => {
    return script + (src ? "\n <script src='" + src + "'></script>" : "");
  }, "");

  const source = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${externalMeta || ""}
    ${externalCss || ""}
    <title>CodeCrumb - ${crumbName.crumb.value}</title>
</head>
${miscScript || ""}
<body>
  <style>
    body{
      font-family: Helvetica, Arial, sans-serif;
      background: white;
    }
    ${css || ""}
  </style>
      ${html || ""}

  ${externalJs || ""}
  <script id="codecrumb-script" src="${jsURL || ""}"></script>
</body>
</html>`;

  return getBlobURL(source, "text/html");
}

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function animate() {
  function classToggler(e) {
    const html = htmlTab.getAttribute("data-tab");

    const css = cssTab.getAttribute("data-tab");
    const js = jsTab.getAttribute("data-tab");
    const tabs = [htmlPen, cssPen, jsPen];
    tabs.forEach(tab => {
      const attr = tab.getAttribute("data-pen");
      if (e.currentTarget.getAttribute("data-tab") === html && attr === html) {
        tab.classList.add("pen-active");
      } else if (
        e.currentTarget.getAttribute("data-tab") === css &&
        attr === css
      ) {
        tab.classList.add("pen-active");
      } else if (
        e.currentTarget.getAttribute("data-tab") == js &&
        attr === js
      ) {
        tab.classList.add("pen-active");
      } else {
        tab.classList.remove("pen-active");
      }
    });
  }
  requestAnimationFrame(function() {
    const tabs = [htmlTab, cssTab, jsTab];

    tabs.forEach(tab => {
      tab.addEventListener("click", e => {
        e.preventDefault();
        const current = e.currentTarget.classList;
        const htmlClass = htmlTab.classList;
        const cssClass = cssTab.classList;
        const jsClass = jsTab.classList;

        //css
        if (
          (!current.contains("active") && htmlClass.contains("active")) ||
          jsClass.contains("active")
        ) {
          htmlClass.remove("active") || jsClass.remove("active");

          current.add("active");
          classToggler(e);
        } //js
        else if (
          (!current.contains("active") && htmlClass.contains("active")) ||
          cssClass.contains("active")
        ) {
          htmlClass.remove("active") || cssClass.remove("active");

          current.add("active");

          classToggler(e);
        }
        //html
        else if (
          (!current.contains("active") && cssClass.contains("active")) ||
          jsClass.contains("active")
        ) {
          cssClass.remove("active") || jsClass.remove("active");

          current.add("active");

          classToggler(e);
        }
      });
    });

    const settings = [
      generalSettings,
      languageSettings,
      customSettings,
      balanceSettings,
      behaviourSettings,
      kbdSettings
    ];

    const settingsTabs = [
      generalTab,
      languageTab,
      customTab,
      balanceTab,
      behaviourTab,
      kbdTab
    ];
    settingsTabs.forEach(tabs => {
      tabs.addEventListener("click", e => {
        const currentClass = e.currentTarget.classList;
        const genClass = generalTab.classList;
        const langClass = languageTab.classList;
        const libClass = customTab.classList;
        const balClass = balanceTab.classList;
        const behClass = behaviourTab.classList;
        const kbdClass = kbdTab.classList;
        // for language

        if (
          (!currentClass.contains("cover-active") &&
            genClass.contains("cover-active")) ||
          balClass.contains("cover-active") ||
          behClass.contains("cover-active") ||
          kbdClass.contains("cover-active") ||
          libClass.contains("cover-active")
        ) {
          genClass.remove("cover-active");
          balClass.remove("cover-active");
          behClass.remove("cover-active");
          kbdClass.remove("cover-active");
          libClass.remove("cover-active");
          currentClass.add("cover-active");
        }
        // for general
        else if (
          (!currentClass.contains("cover-active") &&
            langClass.contains("cover-active")) ||
          balClass.contains("cover-active") ||
          behClass.contains("cover-active") ||
          kbdClass.contains("cover-active") ||
          libClass.contains("cover-active")
        ) {
          langClass.remove("cover-active");
          balClass.remove("cover-active");
          behClass.remove("cover-active");
          kbdClass.remove("cover-active");
          libClass.remove("cover-active");
          currentClass.add("cover-active");
        }
        // for balance
        else if (
          (!currentClass.contains("cover-active") &&
            langClass.contains("cover-active")) ||
          genClass.contains("cover-active") ||
          behClass.contains("cover-active") ||
          kbdClass.contains("cover-active") ||
          libClass.contains("cover-active")
        ) {
          langClass.remove("cover-active");
          genClass.remove("cover-active");
          behClass.remove("cover-active");
          kbdClass.remove("cover-active");
          libClass.remove("cover-active");
          currentClass.add("cover-active");
        }
        // for behaviour
        else if (
          (!currentClass.contains("cover-active") &&
            langClass.contains("cover-active")) ||
          genClass.contains("cover-active") ||
          balClass.contains("cover-active") ||
          kbdClass.contains("cover-active") ||
          libClass.contains("cover-active")
        ) {
          langClass.remove("cover-active");
          genClass.remove("cover-active");
          balClass.remove("cover-active");
          kbdClass.remove("cover-active");
          libClass.remove("cover-active");
          currentClass.add("cover-active");
        }
        // for keyboard
        else if (
          (!currentClass.contains("cover-active") &&
            langClass.contains("cover-active")) ||
          genClass.contains("cover-active") ||
          balClass.contains("cover-active") ||
          behClass.contains("cover-active") ||
          libClass.contains("cover-active")
        ) {
          langClass.remove("cover-active");
          genClass.remove("cover-active");
          balClass.remove("cover-active");
          behClass.remove("cover-active");
          libClass.remove("cover-active");
          currentClass.add("cover-active");
        }

        // for lib
        else if (
          (!currentClass.contains("cover-active") &&
            langClass.contains("cover-active")) ||
          genClass.contains("cover-active") ||
          balClass.contains("cover-active") ||
          behClass.contains("cover-active") ||
          kbdClass.contains("cover-active")
        ) {
          langClass.remove("cover-active");
          genClass.remove("cover-active");
          balClass.remove("cover-active");
          behClass.remove("cover-active");
          kbdClass.remove("cover-active");
          currentClass.add("cover-active");
        }
        toggleSettings(tabs);
      });
    });

    function toggleSettings(tabs) {
      settings.forEach(sets => {
        if (tabs == generalTab) {
          sets.classList.remove("settings-active");
          generalSettings.classList.add("settings-active");
        } else if (tabs == languageTab) {
          sets.classList.remove("settings-active");
          languageSettings.classList.add("settings-active");
        } else if (tabs == balanceTab) {
          sets.classList.remove("settings-active");
          balanceSettings.classList.add("settings-active");
        } else if (tabs == behaviourTab) {
          sets.classList.remove("settings-active");
          behaviourSettings.classList.add("settings-active");
        } else if (tabs == kbdTab) {
          sets.classList.remove("settings-active");
          kbdSettings.classList.add("settings-active");
        } else if (tabs == customTab) {
          sets.classList.remove("settings-active");
          customSettings.classList.add("settings-active");
        }
      });
    }
    let isCog = false;
    settingsBtn.addEventListener("click", () => {
      // editorMenuMain.style.animation = "menu-in .1s linear;
      editorMenuMain.style.display = "flex";
      editorMenuMain.style.animation = "none";
    });

    const penModeSettings = [htmlMode, cssMode, jsMode];
    window.addEventListener("click", e => {
      if (e.target === editorMenuMain) {
        if (isCog) {
          penModeSettings.forEach(mode => {
            const cog = mode.firstChild;
            cog.style.color = "#fff";
          });
        }

        editorMenuMain.style.display = "none";
        editorMenuMain.style.animation = "none";
        //
      }
    });

    penModeSettings.forEach(mode => {
      mode.addEventListener("click", e => {
        e.preventDefault();
        const cog = mode.firstChild;
        cog.style.color = "#568af2";
        toggleLanguageSettings();
        isCog = true;
      });
    });

    function toggleLanguageSettings() {
      settings.forEach(set => {
        if (set.classList.contains("settings-active")) {
          set.classList.remove("settings-active");
          languageSettings.classList.add("settings-active");
        }
      });
      settingsTabs.forEach(tab => {
        if (tab.classList.contains("cover-active")) {
          tab.classList.remove("cover-active");
          languageTab.classList.add("cover-active");
        }
      });
      editorMenuMain.style.animation = "menu-in .1s ease forwards";

      editorMenuMain.style.display = "flex";
      editorMenuMain.style.animation = "none";
    }
  });

  window.addEventListener("load", function() {
    // eslint-disable-next-line no-undef
    // loader.firstElementChild.style.animation = "none";
    // loader.firstElementChild.style.willChange = "none";
    loader.classList.add("load-off");
    // loader.style.display = "none";
  });
}

// class for tab selection!!!!.
class tabOptions {
  constructor(
    codeOrder = 1,
    previewOrder = 2,
    codeWidth = "40%",
    previewWidth = "60%",
    codeHeight = "calc(100% - 100px)",
    previewHeight = "calc(100% - 100px)",
    eHeight = "100%",
    eWidth = "100%",
    ePosition = "absolute",
    editorContainerFlow = "row",
    eBorder = "0",
    eBorderColor = "transparent",
    eBorderStyle = "solid",
    codeHeadBg = "var(--page-color)",
    codeHeadBorder = "none",
    editorTab = "flex",
    containerHeight = "100vh",
    codeHeadDisplay = "flex",
    tabStyleBorder = "none"
  ) {
    this.codeOrder = codeOrder;
    this.previewOrder = previewOrder;
    this.codeWidth = codeWidth;
    this.previewWidth = previewWidth;
    this.codeHeight = codeHeight;
    this.previewHeight = previewHeight;
    this.eHeight = eHeight;
    this.eWidth = eWidth;
    this.ePosition = ePosition;
    this.editorContainerFlow = editorContainerFlow;

    this.eBorder = eBorder;
    this.eBorderStyle = eBorderStyle;
    this.eBorderColor = eBorderColor;
    this.codeHeadBg = codeHeadBg;
    this.codeHeadBorder = codeHeadBorder;

    this.editorTab = editorTab;
    this.borderRight = "7px";
    this.tabStyleBorder = tabStyleBorder;
    this.containerHeight = containerHeight;
    this.codeHeadDisplay = codeHeadDisplay;
  }
  changeView() {
    const pens = [htmlPen, cssPen, jsPen];

    // defines editor and preview order on the page
    editorPreview.style.order = this.previewOrder;
    code.style.order = this.codeOrder;

    // defines editors and preview total width
    code.style.width = this.codeWidth;
    editorPreview.style.width = this.previewWidth;

    // defines editors and preview total height
    code.style.height = this.codeHeight;
    editorPreview.style.height = this.previewHeight;

    // defines each pen height
    pens.forEach(height => {
      height.style.height = this.eHeight;
    });
    // defines each pen width
    pens.forEach(width => {
      width.style.width = this.eWidth;
    });

    // defines editors visibility

    //defines editors position
    pens.forEach(pos => {
      pos.style.position = this.ePosition;
    });

    // defines editors border
    pens.forEach(border => {
      border.style.border = this.eBorder;
      border.style.borderStyle = this.eBorderStyle;
      border.style.borderColor = this.eBorderColor;
      // border.style.borderRight = "0";
      border.style.borderTop = "0";
    });

    // defines editors head element background.
    Array.from(codeHead).forEach(head => {
      head.style.background = this.codeHeadBg;
      head.style.borderBottom = this.codeHeadBorder;
      head.style.display = this.codeHeadDisplay;
      //handles codehead border for tabstyle editor view.
      head.style.borderTop = this.tabStyleBorder;
      codeHead[0].style.borderTop = "2px solid var(--editor-color)";
    });

    // defines editors display flex/hidden;
    Array.from(editorTab).forEach(eTab => {
      eTab.style.display = this.editorTab;
    });

    // defines the editor container flex-flow
    editorContainer.style.flexFlow = this.editorContainerFlow;
    editorContainer.style.height = this.containerHeight;
    // defines the code pen display form
  }
}

// function changeTabStyle() {

// }
const tabStyleLeftE = document.querySelector("#tab-style-left");
tabStyleLeftE.addEventListener("click", tabStyleLeft);

const tabStyleTabE = document.querySelector("#tab-style-tab");
tabStyleTabE.addEventListener("change", tabStyleDefault);

const tabStyleTopE = document.querySelector("#tab-style-top");
tabStyleTopE.addEventListener("change", tabStyleTop);

const tabStyleRightE = document.querySelector("#tab-style-right");
tabStyleRightE.addEventListener("change", tabStyleRight);

const tabStyleFullView = document.querySelector("#tab-full-view");
tabStyleFullView.addEventListener("change", fullScreenPreview);

//full-view
function fullScreenPreview() {
  resetSplitPane();
  footerLeft.style.order = "1";
  footerRight.style.order = "2";
  footerLeft.style.flexFlow = "row";
  footerRight.style.flexFlow = "row";
  const tabbed = new tabOptions(
    2,
    1,
    "0%",
    "100%",
    "0%",
    "100%",
    "0%",
    "0%",
    "relative",
    "column",
    "0",
    "#0f111a",
    "solid",
    "#0f111a",
    "0 solid #13161f",
    "none",
    "calc(100vh - 90px)",
    "none",
    "none"
  );
  tabbed.changeView();
  __setEditorPreset__("layout", "full-view");
}

//right
function tabStyleRight() {
  resetSplitPane();
  resizePaneX([".editor-preview", ".code-pen"], [56, 44]);
  //splitCodePaneResizeY([41, 41, 41], "vertical");
  resetTransition();
  const resizes = [htmlResize, cssResize, jsResize];
  resizes.forEach(resize => {
    resize.style.display = "block";
  });
  footerLeft.style.order = "2";
  footerRight.style.order = "1";
  footerLeft.style.flexFlow = "row-reverse";
  footerRight.style.flexFlow = "row-reverse";
  jsPen.classList.add("pen-active");
  code.style.display = "inline";
  htmlPen.classList.add("pen-active");
  cssPen.classList.add("pen-active");
  const tabbed = new tabOptions(
    3,
    1,
    "44%",
    "56%",
    "100%",
    "100%",
    "33.33%",
    "100%",
    "relative",
    "row",
    "none",
    "none",
    "none",
    "var(--page-color)",
    "2px solid var(--editor-color)",
    "none",
    "calc(100vh - 90px)",
    "flex",
    "none"
  );
  tabbed.changeView();

  resizeHeight(33.33);
  editors.forEach(editor => {
    editor.refresh();
  });
  __setEditorPreset__("layout", "right");
}

//left
function tabStyleLeft() {
  resetSplitPane();
  resizePaneX([".code-pen", ".editor-preview"], [44, 56]);
  resetTransition();
  const resizes = [htmlResize, cssResize, jsResize];
  resizes.forEach(resize => {
    resize.style.display = "block";
  });
  jsPen.classList.add("pen-active");
  code.style.display = "inline";
  htmlPen.classList.add("pen-active");
  cssPen.classList.add("pen-active");
  footerLeft.style.order = "1";
  footerRight.style.order = "2";
  footerLeft.style.flexFlow = "row";
  footerRight.style.flexFlow = "row";
  const tabbed = new tabOptions(
    1,
    3,
    "44%",
    "56%",
    "100%",
    "100%",
    "33.33%",
    "100%",
    "relative",
    "row",
    "none",
    "none",
    "none",
    "var(--page-color)",
    "2px solid var(--editor-color)",
    "none",
    "calc(100vh - 90px)",
    "flex",
    "none"
  );
  tabbed.changeView();

  resizeHeight(33.33);
  editors.forEach(editor => {
    editor.refresh();
  });
  __setEditorPreset__("layout", "left");
}

//tab
function tabStyleDefault() {
  resetSplitPane();
  resizePaneX([".code-pen", ".editor-preview"], [44, 56]);
  const resizes = [htmlResize, cssResize, jsResize];
  footerLeft.style.order = "1";
  const tabs = [htmlTab, cssTab, jsTab];
  resizes.forEach(resize => {
    resize.style.display = "none";
  });
  resetTransition();
  tabs.forEach(tab => {
    const attr = tab.getAttribute("data-tab");
    if (tab.classList.contains("active") && attr === "html") {
      jsPen.classList.remove("pen-active");
      footerLeft.style.order = "1";
      footerRight.style.order = "2";
      footerLeft.style.flexFlow = "row";
      footerRight.style.flexFlow = "row";
      cssPen.classList.remove("pen-active");
    } else if (tab.classList.contains("active") && attr === "css") {
      jsPen.classList.remove("pen-active");
      cssPen.classList.add("pen-active");
      htmlPen.classList.remove("pen-active");
    } else if (tab.classList.contains("active") && attr === "js") {
      htmlPen.classList.remove("pen-active");
      cssPen.classList.remove("pen-active");
      jsPen.classList.add("pen-active");
      // cssPen.classList.add("pen-inactive");
    }
    const tabbed = new tabOptions(
      1,
      2,
      "44%",
      "57%",
      "100%",
      "100%",
      "100%",
      "100%",
      "absolute",
      "row",
      "0",
      "var(--page-color)",
      "solid",
      "var(--page-color)",
      "none",
      "flex",
      "calc(100vh - 130px)",
      "flex",
      "2px solid var(--editor-color)"
    );
    tabbed.changeView();
  });
  editors.forEach(editor => {
    editor.refresh();
  });
  __setEditorPreset__("layout", "column");
}

//top
function tabStyleTop() {
  resetSplitPane();
  footerLeft.style.order = "1";
  footerRight.style.order = "2";
  footerLeft.style.flexFlow = "row";
  footerRight.style.flexFlow = "row";
  resetTransition();
  const resizes = [htmlResize, cssResize, jsResize];
  resizes.forEach(resize => {
    resize.style.display = "block";
  });
  code.style.display = "flex";
  jsPen.classList.add("pen-active");
  htmlPen.classList.add("pen-active");
  cssPen.classList.add("pen-active");
  const tabbed = new tabOptions(
    1,
    3,
    "100%",
    "100%",
    "60%",
    "40%",
    "100%",
    "33.33%",
    "relative",
    "column",
    "5px",
    "var(--page-color)",
    "solid",
    "var(--page-color)",
    "none",
    "none",
    "calc(100vh - 90px)",
    "flex",
    "2px solid var(--editor-color)"
  );
  tabbed.changeView();
  //splitCodePaneResizeX([150, 150, 150], 'horizontal')
  resizePaneY([".code-pen", ".editor-preview"], [60, 40]);

  resizeWidth();
  editors.forEach(editor => {
    editor.refresh();
  });
  __setEditorPreset__("layout", "top");
}

resizeHeight(33.33);

function resizeHeight(height) {
  const resize = htmlPen;
  const resizeOne = cssPen;
  const resizeTwo = jsPen;
  const MAX = 100;
  const MIN = 40;
  const WIDTH = 100;

  let wait;
  let normal = true;
  let normalOne = true;
  let normalTwo = true;

  const sizes = [resize, resizeOne, resizeTwo];
  const resizes = [htmlResize, cssResize, jsResize];
  resizes.forEach(resize => {
    resize.style.display = "flex";
  });

  // const editors = [htmlEditor, cssEditor, jsEditor];

  htmlResize.addEventListener("click", e => {
    normal ? resizeMe(e) : normalizeMe(e);
  });
  cssResize.addEventListener("click", e => {
    normalOne ? resizeMeOne(e) : normalizeMe(e);
  });
  jsResize.addEventListener("click", e => {
    normalTwo ? resizeMeTwo(e) : normalizeMe(e);
  });

  function resizeMe(e) {
    e.preventDefault();

    resize.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeOne.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeTwo.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";

    resize.style.height = `calc(${MAX}% - 80px)`;
    resizeOne.style.height = `${MIN}px`;
    resizeTwo.style.height = `${MIN}px`;

    sizes.forEach(size => {
      size.style.width = `${WIDTH}%`;
    });
    Array.from(codeHead).forEach(code => {
      code.style.height = `${MIN}px`;
    });
    // editors.forEach(editor => {
    //     editor.clear()
    // })

    normal = false;
    normalOne = true;
    normalTwo = true;
  }

  function normalizeMe(e) {
    e.preventDefault();

    resize.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeOne.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeTwo.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";

    resize.style.height = `${height}%`;
    resizeOne.style.height = `${height}%`;
    resizeTwo.style.height = `${height}%`;

    sizes.forEach(size => {
      size.style.width = `${WIDTH}%`;
    });

    // editors.forEach(editor => {
    //     editor.clear()
    // })

    normal = true;
    normalOne = true;
    normalTwo = true;
  }

  function resizeMeOne(e) {
    e.preventDefault();

    resize.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeOne.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeTwo.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";

    resize.style.height = `${MIN}px`;
    resizeOne.style.height = `calc(${MAX}% - 80px)`;
    resizeTwo.style.height = `${MIN}px`;
    sizes.forEach(size => {
      size.style.width = `${WIDTH}%`;
    });

    normalOne = false;
    normal = true;
    normalTwo = true;

    Array.from(codeHead).forEach(code => {
      code.style.height = `${MIN}px`;
    });
  }

  function resizeMeTwo(e) {
    e.preventDefault();

    resize.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeOne.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";
    resizeTwo.style.transition = "height 0.4s cubic-bezier(.38, .39, .28, .95)";

    resize.style.height = `${MIN}px`;
    resizeOne.style.height = `${MIN}px`;
    resizeTwo.style.height = `calc(${MAX}% - 80px)`;

    sizes.forEach(size => {
      size.style.width = `${WIDTH}%`;
    });
    normalTwo = false;
    normal = true;
    normalOne = true;

    Array.from(codeHead).forEach(code => {
      code.style.height = `${MIN}px`;
    });
  }
}

function resizeWidth() {
  const MAX = 70;
  const MIN = 15;
  const HEIGHT = 100;
  const ORIGINAL = 33.3;

  let normal = true;
  let normalOne = true;
  let normalTwo = true;

  const sizes = [htmlPen, cssPen, jsPen];
  const resizes = [htmlResize, cssResize, jsResize];
  resizes.forEach(resize => {
    resize.style.display = "flex";
  });

  htmlResize.addEventListener("click", e => {
    normal ? resizeMe(e) : normalizeMe(e);
  });
  cssResize.addEventListener("click", e => {
    normalOne ? resizeMeOne(e) : normalizeMe(e);
  });
  jsResize.addEventListener("click", e => {
    normalTwo ? resizeMeTwo(e) : normalizeMe(e);
  });

  function resizeMe(e) {
    e.preventDefault();

    htmlPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    cssPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    jsPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";

    htmlPen.style.width = `${MAX}%`;
    cssPen.style.width = `${MIN}%`;
    jsPen.style.width = `${MIN}%`;

    sizes.forEach(size => {
      size.style.height = `${HEIGHT}%`;
    });

    normal = false;
    normalOne = true;
    normalTwo = true;
  }

  function normalizeMe(e) {
    e.preventDefault();

    htmlPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    cssPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    jsPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";

    htmlPen.style.width = `${ORIGINAL}%`;
    cssPen.style.width = `${ORIGINAL}%`;
    jsPen.style.width = `${ORIGINAL}%`;

    sizes.forEach(size => {
      size.style.height = `${HEIGHT}%`;
    });

    editors.forEach(editor => {
      editor.refresh();
    });

    normal = true;
    normalOne = true;
    normalTwo = true;
  }

  function resizeMeOne(e) {
    e.preventDefault();
    htmlPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    cssPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    jsPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";

    htmlPen.style.width = `${MIN}%`;
    cssPen.style.width = `${MAX}%`;
    jsPen.style.width = `${MIN}%`;

    sizes.forEach(size => {
      size.style.height = `${HEIGHT}%`;
    });

    // editors.forEach(editor => {

    normalOne = false;
    normal = true;
    normalTwo = true;
  }

  function resizeMeTwo(e) {
    e.preventDefault();
    htmlPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    cssPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";
    jsPen.style.transition = "width 0.4s cubic-bezier(.38, .39, .28, .95)";

    htmlPen.style.width = `${MIN}%`;
    cssPen.style.width = `${MIN}%`;
    jsPen.style.width = `${MAX}%`;

    sizes.forEach(size => {
      size.style.height = `${HEIGHT}%`;
    });

    normalTwo = false;
    normal = true;
    normalOne = true;
  }
}

function resetTransition() {
  htmlPen.style.transition = "0s";
  cssPen.style.transition = "0s";
  jsPen.style.transition = "0s";
}

function resizePaneY(el, size) {
  gutterHori.style.order = "2";
  Split(el, {
    direction: "vertical",
    sizes: size,
    minSize: [40, 0],
    gutter: function(index, direction) {
      gutterHori.classList.add("gutter");
      gutterHori.classList.add("gutter-" + direction);
      gutterHori.style.width = "100%";

      return gutterHori;
    },
    gutterSize: 10,
    dragInterval: 10,
    elementStyle: function(dimension, size, gutterSize) {
      return {
        height: "calc(" + size + "% - " + gutterSize + "px)",
        width: "100%"
      };
    },
    gutterStyle: function(dimension, gutterSize) {
      return {
        height: gutterSize + "px"
      };
    }
  });
  // editors.forEach(editor => {
  //   editor.getDoc().setValue(editor.getValue());
  // });
}

function resizePaneX(el, size) {
  gutterHori.style.order = "2";
  Split(el, {
    sizes: size,
    minSize: [375, 375],
    direction: "horizontal",
    gutter: function(index, direction) {
      // gutter = document.querySelector('.resize-both')
      gutterHori.classList.add("gutter");
      gutterHori.classList.add("gutter-" + direction);
      gutterHori.style.height = "100%";
      gutterHori.style.width = "5px";
      return gutterHori;
    },
    gutterSize: 10,
    dragInterval: 10,
    elementStyle: function(dimension, size, gutterSize) {
      return {
        width: "calc(" + size + "% - " + gutterSize + "px)",
        height: "100%"
      };
    },
    gutterStyle: function(dimension, gutterSize) {
      return {
        width: gutterSize + "px"
      };
    }
  });
  // editors.forEach(editor => {
  //   editor.getDoc().setValue(editor.getValue());
  // });
}

function resetSplitPane() {
  gutterHori.style.order = "2";
  gutterHori.classList.remove("gutter");
  gutterHori.classList.remove("gutter-horizontal");
  gutterHori.classList.remove("gutter-vertical");
  gutterHori.style.height = "0";
  gutterHori.style.width = "0";
  const resizable = document.querySelectorAll(".resizable");
  Array.from(resizable).forEach(resize => {
    resize.classList.remove("gutter");
    resize.classList.remove("gutter-horizontal");
    resize.classList.remove("gutter-vertical");
    resize.style.width = "0";
    resize.style.height = "0";
  });
  editors.forEach(editor => {
    editor.refresh();
  });
}

// call function for default tab
//splitCodePaneResizeY([41, 41, 41], "vertical")
resizePaneX([".code-pen", ".editor-preview"], [44, 56]);
const consoleCode = document.querySelector(".cm-s-console-code");
const resizeBoth = document.querySelector(".resize-both");
preview.contentWindow.onresize = function() {
  resizeFrame.innerHTML = `${this.innerWidth}px &times; ${this.innerHeight}px`;

  if (consoleInput.offsetWidth <= 400) {
    consoleInput.style.fontSize = "0.8rem";
  } else if (consoleInput.offsetWidth <= 300) {
    consoleInput.style.fontSize = "0.7rem";
  } else if (consoleInput.offsetWidth == 200) {
    consoleInput.style.fontSize = "0.65rem";
  } else {
    consoleInput.style.fontSize = "0.95rem";
  }

  if (consoleOutput.offsetWidth <= 565) {
    consoleCode.style.fontSize = "11.5px";
  } else if (consoleOutput.offsetWidth <= 400) {
    consoleCode.style.fontSize = "9.5px";
  } else {
    consoleCode.style.fontSize = "13.5px";
  }
};

preview.addEventListener("load", () => {
  preview.contentWindow.onresize = function() {
    resizeFrame.innerHTML = `${this.innerWidth}px &times; ${this.innerHeight}px`;
    if (consoleInput.offsetWidth <= 400) {
      consoleInput.style.fontSize = "0.8rem";
    } else if (consoleInput.offsetWidth <= 300) {
      consoleInput.style.fontSize = "0.7rem";
    } else if (consoleInput.offsetWidth == 200) {
      consoleInput.style.fontSize = "0.65rem";
    } else {
      consoleInput.style.fontSize = "0.95rem";
    }

    if (consoleOutput.offsetWidth <= 565) {
      consoleCode.style.fontSize = "11.5px";
    } else if (consoleOutput.offsetWidth <= 400) {
      consoleCode.style.fontSize = "9.5px";
    } else {
      consoleCode.style.fontSize = "13.5px";
    }
  };
});
resizeBoth.addEventListener("mousedown", () => {
  resizeFrame.parentElement.style.opacity = "1";
});

resizeBoth.addEventListener("mouseup", () => {
  resizeFrame.parentElement.style.opacity = "0";
});

function showHints(editor) {
  CodeMirror.registerGlobalHelper(
    "hint",
    "emmet",
    function(mode, editor) {
      // Tell `show-hint` module that current helper will provide completions
      return !!editor.getEmmetAbbreviation();
    },
    function(editor, options) {
      // Activate auto-popup, if disabled (see below)
      const marker = editor.findEmmetMarker();
      if (!marker) {
        return;
      }

      clearTimeout(marker.popupDisableTimer);
      marker.autoPopupDisabled = false;

      const completions = editor.getEmmetCompletions();
      return (
        completions && {
          from: completions.from,
          to: completions.to,
          // Transform Emmet completions to ones that supported by `show-hint`
          list: completions.list.map(function(completion) {
            return {
              from: completion.range.from,
              to: completion.range.to,
              render: function(elt) {
                var content = document.createDocumentFragment();
                var label = document.createElement("span");
                label.className = "emmet-label";

                var preview = document.createElement("span");
                preview.className = "emmet-preview";

                content.appendChild(label);
                content.appendChild(preview);

                if (completion.type === "expanded-abbreviation") {
                  // It’s an expanded abbreviation completion:
                  // render preview for it
                  label.className += " emmet-label__expand";
                  label.textContent = "Expand abbreviation";

                  preview.className += " emmet-preview__expand";
                  // Replace tab with a few spaces so preview would take
                  // lesser space
                  preview.textContent = completion.preview.replace(/\t/g, "  ");
                } else {
                  // A regular snippet: render completion abbreviation
                  // and its preview
                  label.textContent = completion.name;
                  preview.textContent = completion.preview;
                }

                elt.appendChild(content);
              },
              hint: function() {
                // Use completions’ `insert()` method to properly
                // insert Emmet completion
                completion.insert();
              }
            };
          })
        }
      );
    }
  );
  // Automatically display Emmet completions when cursor enters abbreviation
  // marker if `markEmmetAbbreviation` option was enabled (true by default)
  editor.on("cursorActivity", function() {
    if (editor.getOption("markEmmetAbbreviation")) {
      const marker = editor.findEmmetMarker();
      if (marker && !marker.autoPopupDisabled) {
        editor.showHint({
          completeSingle: false
        });
      }
    }
  });

  editor.on("startCompletion", function() {
    var marker = editor.findEmmetMarker();
    if (marker) {
      clearTimeout(marker.popupDisableTimer);
      marker.popupDisableTimer = null;
    }
  });
  editor.on("endCompletion", function() {
    var marker = editor.findEmmetMarker();
    if (marker) {
      clearTimeout(marker.popupDisableTimer);
      marker.popupDisableTimer = setTimeout(function() {
        marker.autoPopupDisabled = true;
      }, 30);
    }
  });
}

function cleanFont(x) {
  return x
    .split(",")
    .map(a => {
      if (a.match(/[a-zA-Z]+\s/)) {
        return `"${a.trim(" ")}"`;
      } else {
        return a;
      }
    })
    .join(",");
}

function lint(bool) {
  htmlEditor.setOption("lint", bool);
  cssEditor.setOption("lint", bool);
  jsEditor.setOption("lint", bool);
}
lint(true);

function hint() {
  // eslint-disable-next-line no-undef
  const editors = [htmlEditor, cssEditor, jsEditor];

  showHints(htmlEditor);
  showHints(cssEditor);
  showHints(jsEditor);

  jsEditor.on(
    "inputRead",
    function(e, cm) {
      if (
        !cm.text[0].match(/[\s()\[\]{}\-\+\=\?\<\|\~\/;:>,(.+\d)]/) &&
        cm.origin === "+input"
      ) {
        jsEditor.showHint({
          completeSingle: false,
          alignWithWord: true,
          closeOnUnfocus: true,
          closeOnBackspace: true
        });
      }
    },
    {
      passive: true
    }
  );

  editors.forEach(editor => {
    editor.setOption("extrakeys", {
      "Ctrl-Q": function(cm) {
        cm.foldCode(cm.getCursor());
      },
      "Ctrl-K": function(cm, event) {
        cm.state.colorpicker.popup_color_picker();
      },
      "Alt-f": "findPersistent",

      "Ctrl-S": function() {
        if (dataItems.author) {
          if (dataItems.author === "anonymous") return null;
          keyMapSave() || null;
        } else {
          keyMapSave() || null;
        }
      },

      "Ctrl-Enter": updatePreview,
      "Alt-J": function() {
        beautifySingleFile(jsEditor, csse.js);
      },
      "Alt-C": function() {
        beautifySingleFile(cssEditor, csse.css);
      },
      "Alt-H": function() {
        beautifySingleFile(htmlEditor, csse.html);
      },
      "Alt-A": function() {
        prettify(htmlEditor, cssEditor, jsEditor);
      },
      "Ctrl-Space": "autocomplete",
      Tab: "emmetExpandAbbreviationAll",
      "Ctrl-E": "emmetExpandAbbreviationAll",
      Enter: "emmetInsertLineBreak",
      "Ctrl-W": "emmetWrapWithAbbreviation",
      "Ctrl-/": "toggleComment"
    });
    editor.setOption("markEmmetAbbreviation", true);

    editor.on("cursorActivity", cm => {
      CodeMirror.commands.autocomplete = function(cm) {
        cm.showHint({
          hint: CodeMirror.hint.emoji,
          completeSingle: true,
          alignWithWord: true
        });
      };
    });
  });
}
hint();

function colorPicker() {
  const editors = [htmlEditor, cssEditor];
  editors.forEach(editor => {
    editor.setOption("colorpicker", {
      mode: "edit"
    });
  });
}
colorPicker();

(function predefinedSettings() {
  let localPresets = localStorage.__defineEditorPresets__;
  if (localStorage.__defineEditorPresets__) {
    const presets = JSON.parse(localPresets);
    const editors = [htmlEditor, cssEditor, jsEditor];
    // change skin color:
    changeEditorSkin(presets.skin);
    // change tab size => indent unit => linter => autoComplete => colorpicker => activeLine.
    editors.forEach(x => {
      x.setOption("tabSize", presets.tab);
      x.setOption("indentUnit", presets.indent);
      x.setOption("styleActiveLine", presets.activeLine);
      x.setOption("colorpicker", {
        mode: "edit",
        type: presets.colorPicker
      });
      x.setOption("lint", presets.linter);
      if (presets.autoComplete) {
        hint();
      } else {
        x.setOption("markEmmetAbbreviation", false);

        x.on("keypress", function() {
          x.closeHint();
        });
        x.closeHint();
      }
    });
    // change editor layout type
    // checking for types
    switch (presets.layout) {
      case "left":
        tabStyleLeft();
        tabStyleLeftE.checked = true;
        break;
      case "top":
        tabStyleTop();
        tabStyleTopE.checked = true;
        break;
      case "column":
        tabStyleDefault();
        tabStyleTabE.checked = true;
        break;
      case "right":
        tabStyleRight();
        tabStyleRightE.checked = true;
        break;
      case "full-view":
        fullScreenPreview();
        tabStyleFullView.checked = true;
        break;
      default:
        null;
    }
    // font-ligatures
    const cm = Array.from(document.querySelectorAll(".CodeMirror pre"));
    presets.fontLigature
      ? cm.forEach(x => (x.style.fontVariantLigatures = "contextual"))
      : cm.forEach(x => (x.style.fontVariantLigatures = "none"));

    // handle ui changes
    const handleSelectUI = (item, selectEl) => {
      const ts = selectEl.namedItem(item);
      selectEl.selectedIndex = ts.index;
    };
    const handleCheckUI = (value, checkEl) => {
      checkEl.checked = value;
    };
    handleSelectUI(`${presets.tab}`, tabSize);
    handleSelectUI(`${presets.indent}`, indentUnit);
    handleSelectUI(`${presets.colorPicker}`, colorPickerType);
    handleSelectUI(`${presets.skin}`, editorSkins);
    handleCheckUI(presets.activeLine, activeLineCh);
    handleCheckUI(presets.linter, linterCh);
    handleCheckUI(presets.autocomplete, autoCompleteCh);
    handleCheckUI(presets.fontLigatures, fontLigatures);
    loopTimeout.value = presets.loopTimeout;
    autoRunDelay.value = presets.runDelayTimeout;
  }
})();
/* eslint-disable no-console */
function settingButtons(
  htmlEditor,
  cssEditor,
  jsEditor,
  editors,
  updatePreview,
  cmDark,
  fontFm,
  sizes,
  keymaps
) {
  let delay;
  // const editors = [htmlEditor, cssEditor, jsEditor];
  // toggles checkboxs and set their values;
  const checkbox = document.querySelectorAll('input[type="checkbox"]');
  Array.from(checkbox).forEach(check => {
    check.addEventListener("change", e => {
      const current = e.currentTarget;
      // conditional check for changes in the line-numbers toggler and adds them.
      if (current.checked && current.name == "numbers") {
        editors.forEach(editor => {
          editor.setOption("lineNumbers", true);
        });
      } else if (!current.checked && current.name == "numbers") {
        editors.forEach(editor => {
          editor.setOption("lineNumbers", false);
        });
      }

      if (current.checked && current.name === "wrap") {
        editors.forEach(editor => {
          editor.setOption("lineWrapping", true);
        });
      } else if (!current.checked && current.name === "wrap") {
        editors.forEach(editor => {
          editor.setOption("lineWrapping", false);
        });
      }

      // conditional check for changes in the active-line toggler and adds them.
      if (current.checked && current.name == "active") {
        editors.forEach(editor => {
          editor.setOption("styleActiveLine", true);
        });
        __setEditorPreset__("activeLine", true);
      } else if (!current.checked && current.name == "active") {
        editors.forEach(editor => {
          editor.setOption("styleActiveLine", false);
        });
        __setEditorPreset__("activeLine", false);
      }

      // conditional check for changes in the auto-complete toggler and adds them.
      if (current.checked && current.name === "complete") {
        hint();
        __setEditorPreset__("autoComplete", true);
      } else if (!current.checked && current.name === "complete") {
        // console.log('untab')

        editors.forEach(editor => {
          editor.setOption("extrakeys", {
            "Ctrl-Q": function(cm) {
              cm.foldCode(cm.getCursor());
            },

            "Alt-F": "findPersistent",

            "Ctrl-Enter": updatePreview,

            "Alt-A": function() {
              prettify(htmlEditor, cssEditor, jsEditor);
            },
            "Ctrl-Space": false,

            "Ctrl-/": "toggleComment"
          });
          editor.setOption("markEmmetAbbreviation", false);

          editor.on("keypress", function() {
            editor.closeHint();
          });
          editor.closeHint();
        });
        __setEditorPreset__("autoComplete", false);
      }
      if (current.checked && current.name === "tags") {
        editors.forEach(editor => {
          editor.setOption("autoCloseTags", true);
        });
      } else if (!current.checked && current.name === "tags") {
        editors.forEach(editor => {
          editor.setOption("autoCloseTags", false);
        });

        // console.log('untab')
      }
      if (current.checked && current.name === "brackets") {
        editors.forEach(editor => {
          editor.setOption("autoCloseBrackets", true);
        });
      } else if (!current.checked && current.name === "brackets") {
        editors.forEach(editor => {
          editor.setOption("autoCloseBrackets", false);
        });

        // console.log('untab')
      }

      if (current.checked && current.name == "linter") {
        lint(true);
        __setEditorPreset__("linter", true);
      } else if (!current.checked && current.name == "linter") {
        lint(false);
        __setEditorPreset__("linter", false);
      }

      if (current.checked && current.name == "run") {
        editors.forEach(editor => {
          editor.on("inputRead", function() {
            requestAnimationFrame(() => {
              clearTimeout(delay);
              delay = setTimeout(
                updatePreview,
                localStorage.__defineEditorPresets__
                  ? (function() {
                      let x = JSON.parse(localStorage.__defineEditorPresets__);
                      return x.runDelayTimeout;
                    })()
                  : 2000
              );
            });
            console.clear();
          });
        });
      } else if (!current.checked && current.name == "run") {
        editors.forEach(editor => {
          editor.on("inputRead", function() {
            requestAnimationFrame(() => {
              clearTimeout(delay);
              delay = setTimeout(null, 2000);
            });
          });
        });
      }

      if (current.checked && current.name == "preserve-log") {
        current.setAttribute("data-log", "true");
        __setEditorPreset__("preserveLog", true);
      } else if (!current.checked && current.name == "preserve-log") {
        current.setAttribute("data-log", "false");
        __setEditorPreset__("preserveLog", false);
      }

      if (current.checked && current.name == "color-picker") {
        colorPicker();
        document.querySelector(".enable-text").textContent =
          "Disable color picker";
      } else if (!current.checked && current.name == "color-picker") {
        const editors = [htmlEditor, cssEditor, jsEditor];
        editors.forEach(editor => {
          editor.setOption("colorpicker", {
            mode: false
          });
        });
        document.querySelector(".enable-text").textContent =
          "Enable color picker";
      }
    });
  });

  // event for font-size settings;
  sizes.addEventListener("change", changeFontSize);
  customFSize.addEventListener("keypress", overRideFontSize);

  function changeFontSize() {
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
    const themeFSize = document.querySelectorAll(".CodeMirror");
    Array.from(themeFSize).forEach(fSize => {
      const selectedSize = parseInt(
        this.selectedOptions[0].getAttribute("name")
      );
      customFSize.value = selectedSize;

      fSize.style.fontSize = `${parseInt(customFSize.value, 10)}px`;
    });
  }

  function overRideFontSize(e) {
    if (e.keyCode === 13) {
      if (dataItems.author) {
        if (dataItems.arg === true && dataItems.author != "anonymous") {
          keyMapSave();
        }
      }
      const themeFSize = document.querySelectorAll(".CodeMirror");
      Array.from(themeFSize).forEach(fSize => {
        const selectedSize = parseInt(this.value);

        if (selectedSize < 5) {
          fSize.style.fontSize = `${0}px`;
        } else {
          fSize.style.fontSize = `${selectedSize}px`;
        }
      });
      customFSize.blur();
    }
  }

  //tab size

  tabSize.addEventListener("change", changeTabSize);

  function changeTabSize() {
    const cmTab = document.querySelector(".tab-num");
    const selectedTab = parseInt(this.selectedOptions[0].value, 10);
    htmlEditor.setOption("tabSize", selectedTab);
    cssEditor.setOption("tabSize", selectedTab);
    jsEditor.setOption("tabSize", selectedTab);
    cmTab.textContent = `${selectedTab}`;
    __setEditorPreset__("tabSize", selectedTab);
  }

  // indent unit

  // event listener for user option to select indent unit.
  indentUnit.addEventListener("change", indentToggled);

  function indentToggled() {
    const indented = parseInt(indentUnit.selectedOptions[0].textContent);
    htmlEditor.setOption("indentUnit", indented);
    cssEditor.setOption("indentUnit", indented);
    jsEditor.setOption("indentUnit", indented);
    __setEditorPreset__("indentUnit", indented);
  }

  // event for font-family settings;
  fontFm.addEventListener("change", changeFontFamily);
  fontFmCustom.addEventListener("keypress", overRideFont);
  fontFmCustom.addEventListener("blur", overRideFont);

  function changeFontFamily() {
    const cm = document.querySelectorAll(".CodeMirror");
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
    Array.from(cm).forEach(fm => {
      const selFont = this.selectedOptions[0].getAttribute("name");

      fontFmCustom.value = `${selFont}, Monospace`;
      fm.style.fontFamily = fontFmCustom.value;
    });
  }

  // custom fonts overides predefined fonts.
  // using predefined fonts is just setting the overRiddenFont.

  function overRideFont(e) {
    if (e.type === "keypress") {
      if (e.keyCode === 13) {
        const cm = document.querySelectorAll(".CodeMirror");

        Array.from(cm).forEach(fSize => {
          const selFont = fontFmCustom.value;
          const splitfont = cleanFont(selFont);
          fSize.style.fontFamily = `${splitfont}, monospace`;
        });
        fontFmCustom.blur();
        if (dataItems.author) {
          if (dataItems.arg === true && dataItems.author != "anonymous") {
            keyMapSave();
          }
        }
      }
    } else if (e.type === "blur") {
      const cm = document.querySelectorAll(".CodeMirror");

      Array.from(cm).forEach(fSize => {
        const selFont = fontFmCustom.value;
        const splitfont = cleanFont(selFont);
        fSize.style.fontFamily = `${splitfont}, monospace`;
      });
      fontFmCustom.blur();
      if (dataItems.author) {
        if (dataItems.arg === true && dataItems.author != "anonymous") {
          keyMapSave();
        }
      }
    }
  }

  // event for theme settings;
  cmDark.addEventListener("change", changeEditorThemeDark);

  function changeEditorThemeDark() {
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
    const editors = [htmlEditor, cssEditor, jsEditor];

    editors.forEach(editor => {
      const selectedTheme = this.selectedOptions[0].getAttribute("name");

      editor.setOption("theme", selectedTheme);
    });
  }

  // event for keymap settings;
  keymaps.addEventListener("change", changeKeymaps);

  function changeKeymaps() {
    if (dataItems.author) {
      if (dataItems.arg === true && dataItems.author != "anonymous") {
        keyMapSave();
      }
    }
    const editors = [htmlEditor, cssEditor, jsEditor];

    editors.forEach(editor => {
      const selectedKeyMap = this.selectedOptions[0].getAttribute("name");

      editor.setOption("keyMap", selectedKeyMap);
    });
  }

  // handles font-ligatures.
  fontLigatures.addEventListener("change", function() {
    const cmPre = document.querySelectorAll(".CodeMirror pre");
    Array.from(cmPre).forEach(cm => {
      if (fontLigatures.checked) {
        cm.style.fontVariantLigatures = "contextual";
      } else if (!fontLigatures.checked) {
        cm.style.fontVariantLigatures = "none";
      }
    });
    if (fontLigatures.checked) {
      __setEditorPreset__("fontLigatures", true);
    } else {
      __setEditorPreset__("fontLigatures", false);
    }
  });

  // color picker type
  colorPickerType.addEventListener("change", function() {
    const editors = [htmlEditor, cssEditor];
    editors.forEach(editor => {
      editor.setOption("colorpicker", false);
      editor.setOption("colorpicker", {
        mode: "edit",
        type: colorPickerType.selectedOptions[0].value
      });
    });
    __setEditorPreset__(
      "colorPicker",
      colorPickerType.selectedOptions[0].value
    );
  });
  autoRunDelay.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      const runDelayTimeout =
        parseInt(this.value, 10) > 10000 ? 10000 : parseInt(this.value, 10);
      autoRunDelay.value = "" + runDelayTimeout;
      autoRunDelay.blur();
      __setEditorPreset__("runDelayTimeout", runDelayTimeout);
    }
  });

  autoRunDelay.addEventListener("change", function() {
    const runDelayTimeout = parseInt(this.value, 10);
    autoRunDelay.blur();
    __setEditorPreset__("runDelayTimeout", runDelayTimeout);
  });
  loopTimeout.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      const lt =
        parseInt(this.value, 10) > 5000 ? 5000 : parseInt(this.value, 10);
      loopTimeout.value = "" + lt;
      loopTimeout.blur();
      __setEditorPreset__("loopTimeout", lt);
    }
  });
  loopTimeout.addEventListener("change", function() {
    const lt = parseInt(this.value, 10);
    loopTimeout.blur();
    __setEditorPreset__("loopTimeout", lt);
  });
}

function changeEditorSettings(
  htmlEditor,
  cssEditor,
  jsEditor,
  editorSettings,
  cmDark,
  fontFm,
  sizes,
  keymaps
) {
  //checks if custom font matches the predef one
  fontFm.namedItem(editorSettings.font.split(",")[0])
    ? (fontFm.options.selectedIndex = fontFm.namedItem(
        editorSettings.font.split(",")[0]
      ).index)
    : null;

  // checks if custom fontsize matched the predef one
  sizes.namedItem(editorSettings.fSize)
    ? (sizes.options.selectedIndex = sizes.index)
    : null;

  // checks if theme exists
  cmDark.namedItem(editorSettings.theme)
    ? (cmDark.options.selectedIndex = cmDark.namedItem(
        editorSettings.theme
      ).index)
    : null;
  // checks if keymap exists
  keymaps.namedItem(editorSettings.keymap)
    ? (keymaps.options.selectedIndex = keymaps.namedItem(
        editorSettings.keymap
      ).index)
    : null;

  const themeFSize = document.querySelectorAll(".CodeMirror");
  const k = Array.from(themeFSize);
  const m = [k[1], k[2], k[3]];
  m.forEach(size => {
    customFSize.value = editorSettings.fSize;
    size.style.fontSize = `${parseInt(customFSize.value, 10)}px`;
    const splitfont = editorSettings.font;
    size.style.fontFamily = `${splitfont}, monospace`;
    // just a little string hack.
    const x = splitfont
      .split(`"`)
      .join(" ")
      .split(",")
      .map(a => a.trim())
      .join(", ");
    fontFmCustom.value = `${x}`;
  });

  const editors = [htmlEditor, cssEditor, jsEditor];

  editors.forEach(editor => {
    editor.setOption("theme", editorSettings.theme);

    editor.setOption("keyMap", editorSettings.keymap);
  });
}

function handleFooterLnCol() {
  const edLn = document.querySelector(".ln");
  const edCh = document.querySelector(".ch");
  const selected = document.querySelector(".line-selected");
  editors.forEach(editor => {
    const editorMode = document.querySelector(".editor-mode");
    editor.on("cursorActivity", () => {
      const cur = editor.getCursor();
      let ln = cur.line;
      let col = cur.ch;
      edLn.innerText = `${ln + 1}`;
      edCh.innerText = `${col + 1}`;
      if (editor === htmlEditor) {
        editorMode.style.opacity = "1";
        editorMode.innerText = `${csse.html}`;
        editorMode.style.margin = "4px";

        editorMode.style.padding = "5px";
      } else if (editor === cssEditor) {
        editorMode.innerText = `${csse.css}`;
        editorMode.style.opacity = "1";
        editorMode.style.margin = "4px";
        editorMode.style.padding = "5px";
      } else if (editor === jsEditor) {
        editorMode.style.opacity = "1";
        if (csse.js === "babel") {
          editorMode.innerText = "javascript with babel";
        } else if (csse.js === "jsx") {
          editorMode.innerText = "javascript with react";
        } else {
          editorMode.innerText = `${csse.js}`;
        }

        editorMode.style.margin = "4px";
        editorMode.style.padding = "5px";
      }
      const selectedLen = editor
        .getSelection()
        .split("\n")
        .join("").length;
      selectedLen >= 1
        ? (selected.textContent = `(${selectedLen} selected)`)
        : (selected.textContent = ``);
    });
  });
}
handleFooterLnCol();
toggleLinter.addEventListener("click", () => {
  if (linterCh.checked) {
    toggleLinter.setAttribute("data-label", "Linter: off");
    linterITag.innerText = "clear";
    linterCh.checked = false;
    lint(false);
  } else if (!linterCh.checked) {
    toggleLinter.setAttribute("data-label", "Linter: on");
    linterITag.innerText = "done";
    linterCh.checked = true;
    lint(true);
  }
});

editorSkins.addEventListener("change", e => {
  changeEditorSkin(editorSkins.selectedOptions[0].value);
  __setEditorPreset__("skin", editorSkins.selectedOptions[0].value);
});

function changeEditorSkin(skinType) {
  const skins = {
    dark: {
      "--editor-color": "rgba(19, 22, 31, 1)",
      "--page-color": "#0f111a",
      "--def-color": "rgba(108, 103, 131, 0.61)",
      "--def-color-solid": "rgba(108, 103, 131, 1)",
      "--settings-color": "#aaa",
      "--def-bg": "#1f222c",
      "--light": "white",
      "--light-solid": "#ddd",
      "--light-solid-2": "#ccc",
      "--svg-fill": "#6c6783",
      "--settings-border-2": "rgba(38, 44, 63, 0.801)",
      "--textarea-bg": "rgba(19, 22, 31, 1)",
      "--textarea-border": "rgba(38, 44, 63, 0.801)"
    },
    darkplus: {
      "--editor-color": "#11131A",
      "--page-color": "#090b10",
      "--def-color": "rgba(108, 103, 131, 0.61)",
      "--def-color-solid": "rgba(108, 103, 131, 1)",
      "--settings-color": "#aaa",
      "--def-bg": "#1f222c",
      "--light": "white",
      "--light-solid": "#ddd",
      "--light-solid-2": "#ccc",
      "--svg-fill": "#6c6783",
      "--settings-border-2": "rgba(38, 44, 63, 0.801)",
      "--textarea-bg": "rgba(20, 24, 29, 0.361)",
      "--textarea-border": "rgba(116, 124, 148, 0.7)"
    },
    palenight: {
      "--editor-color": "#212733",
      "--page-color": "#1a1f28",
      "--def-color": "rgba(108, 103, 131, 0.61)",
      "--def-color-solid": "rgba(108, 103, 131, 1)",
      "--settings-color": "#aaa",
      "--def-bg": "#141822",
      "--light": "white",
      "--light-solid": "#ddd",
      "--light-solid-2": "#ccc",
      "--svg-fill": "#6c6783",
      "--settings-border-2": "rgba(38, 44, 63, 0.801)",
      "--textarea-bg": "rgba(20, 24, 29, 0.361)",
      "--textarea-border": "rgba(116, 124, 148, 0.7)"
    }
  };

  const colors = skins[skinType];
  let i;
  for (i in colors) {
    document.documentElement.style.setProperty(i, colors[i]);
  }
}
function keyboardShortCuts(updatePreview, htmlEditor, cssEditor, jsEditor) {
  document.addEventListener("keyup", e => {
    // console.log(e)

    if (e.altKey && e.keyCode == 80) {
      editorMenuMain.style.animation = "blink-in .2s ease-in-out";
      editorMenuMain.style.display = "flex";
    }
    if (e.altKey && e.keyCode == 82) {
      // ALT + R
      // console.log(e.code);
      updatePreview();
    }
    if (e.altKey && e.keyCode == 84) {
      //alt - t
      tabStyleTop();
      tabStyleTopE.checked = true;
    }
    if (e.altKey && e.keyCode == 78) {
      //alt - n
      tabStyleDefault();
      tabStyleTabE.checked = true;
    }
    if (e.altKey && e.keyCode == 77) {
      //alt-m
      tabStyleRight();
      tabStyleRightE.checked = true;
    }
    if (e.altKey && e.keyCode == 76) {
      //alt-l
      tabStyleLeft();
      tabStyleLeftE.checked = true;
    }
    if (e.altKey && e.keyCode == 79) {
      //alt-o
      fullScreenPreview();
      tabStyleFullView.checked = true;
    }
  });
}

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function postError(d) {
  if (d) {
    let errorCount = parseInt(outnum.getAttribute("data-error"));
    errorCount++;
    outnum.setAttribute("data-error", `${errorCount}`);
    const mess = d.message;
    const language = d.lang;

    const errorOutput = `\n[${language.toUpperCase()}] ${mess}`;

    // updates the  console.
    consoleEditor.replaceRange(
      errorOutput,
      CodeMirror.Pos(consoleEditor.lastLine())
    );

    outnum.textContent = `${errorCount}`;
  }
}
function prettify(htmlEditor, cssEditor, jsEditor) {
  let html,
    css,
    js,
    error,
    htmlParser = modes[csse.html].parser,
    cssParser = modes[csse.css].parser,
    jsParser = modes[csse.js].parser;

  try {
    html = prettier.format(htmlEditor.getValue(), {
      parser: htmlParser,
      plugins: prettierPlugins
    });
  } catch (e) {
    error = {
      message: e.message,
      lang: "HTML"
    };
    postError(error);
  }

  try {
    css = prettier.format(cssEditor.getValue(), {
      parser: cssParser,
      plugins: prettierPlugins
    });
  } catch (e) {
    error = {
      message: e.message,
      lang: "CSS"
    };
    postError(error);
  }

  try {
    js = prettier.format(jsEditor.getValue(), {
      parser: jsParser,
      plugins: prettierPlugins
    });
  } catch (e) {
    error = {
      message: e.message,
      lang: "JS"
    };
    postError(error);
  }

  returnCursor(htmlEditor, html);

  returnCursor(cssEditor, css);

  returnCursor(jsEditor, js);
}

function returnCursor(editor, val) {
  try {
    const cur = editor.lastLine();
    editor.getDoc().setValue(val);
    editor.setCursor(cur, 0);
  } catch (e) {
    console.log(e.message);
  }
}

function beautifySingleFile(editor, mode) {
  let code,
    error,
    Codeparser = modes[mode].parser;

  try {
    code = prettier.format(editor.getValue(), {
      parser: Codeparser,
      plugins: prettierPlugins
    });
  } catch (e) {
    error = {
      message: e.message,
      lang: mode.toUpperCase()
    };
    postError(error);
  }
  returnCursor(editor, code);
}

function preBeautify(editor, code, mode) {
  let formattedCode,
    error,
    Codeparser = modes[mode].parser;

  try {
    formattedCode = prettier.format(code, {
      parser: Codeparser,
      plugins: prettierPlugins
    });
  } catch (e) {
    error = {
      message: e.message,
      lang: mode.toUpperCase()
    };
    postError(error);
  }
  editor.getDoc().setValue(formattedCode);
}

function beautifyExport(code, mode) {
  let formattedCode;

  try {
    formattedCode = prettier.format(code, {
      parser: mode,
      plugins: prettierPlugins
    });
  } catch (e) {
    formattedCode = code;
  }
  return formattedCode;
}

class Timer {
  constructor(restTime, beBackTime, stopwatch, rest) {
    this.restTime = restTime;
    this.beBackTime = beBackTime;
    this.stopwatch = stopwatch;
    this.rest = rest;
    this.paused = false;
    this.running = false;
    this.isActive = false;
    this.__onBreak = false;
    this.time = 0;
    this.timerActive;
    this.timeInt;
  }
  startTimer() {
    clearTimeout(this.timerActive);
    if (!this.running) {
      this.paused = false;
    }

    if (!this.paused) {
      const seconds = Math.floor(this.time % 60);

      const mins = Math.floor((this.time / 60) % 60);

      const hr = Math.floor(this.time / 3600);

      this.time++;

      const c_seconds = seconds < 10 ? `0${seconds}` : seconds;
      const c_minutes = mins < 10 ? `0${mins}` : mins;
      const c_hours = hr < 10 ? `0${hr}` : hr;

      this.stopwatch.textContent = `${c_hours}:${c_minutes}:${c_seconds}`;
      this.stopwatch.style.color = "#fff";

      this.running = true;
      this.isActive = true;
      this.timerActive = setTimeout(() => this.startTimer(), 1000);
    }
  }
  pauseTimer() {
    if (this.running) {
      this.paused = true;
      clearTimeout(this.timerActive);
      this.running = false;
      this.stopwatch.style.color = "rgba(108,103,131,0.61)";
    }
  }
  restartTimer() {
    if (this.running) {
      this.time = 0;
      this.running = false;
      clearTimeout(this.timerActive);
      this.startTimer();
      this.stopwatch.style.color = "#fff";
    }
  }
  stopTimer() {
    if (this.__onBreak) return;
    this.time = 0;
    clearTimeout(this.timerActive);
    this.running = false;
    this.isActive = false;
    this.stopwatch.textContent = "00:00:00";
    this.stopwatch.style.color = "rgba(108,103,131,0.61)";
  }
  getBreakTime(seconds) {
    if (this.isActive) {
      clearInterval(this.timeInt);
      this.__onBreak = true;
      const now = Date.now();
      const then = now + seconds * 1000;
      this.displayBreakTime(seconds);
      this.getBreakEnd(then);
      timer.pauseTimer();
      this.timeInt = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
          clearInterval(this.timeInt);
          this.__onBreak = false;
          if (this.paused && this.isActive) {
            this.startTimer();
          }
          this.beBackTime.textContent = "00:00";
          this.beBackTime.style.color = "rgba(108,103,131,0.61)";
          this.restTime.style.color = "rgba(108,103,131,0.61)";
          Array.from(rest).forEach(r => {
            r.classList.remove("rest-clicked");
          });
          return;
        }
        this.displayBreakTime(secondsLeft);
      }, 1000);
    }
  }
  displayBreakTime(seconds) {
    const remainingHours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds / 60) % 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const newHour = remainingHours < 10 ? `0${remainingHours}` : remainingHours;
    const newMin =
      remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const newSec =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    this.restTime.textContent = `${newHour}:${newMin}:${newSec}`;
    this.restTime.style.color = "#fff";
  }
  getBreakEnd(timestamp) {
    const future = new Date(timestamp);
    const futureHours = future.getHours();
    const futureMinutes = future.getMinutes();
    const newHour = futureHours > 12 ? futureHours - 12 : futureHours;

    this.beBackTime.textContent = `${newHour < 10 ? "0" + newHour : newHour}:${
      futureMinutes < 10 ? "0" + futureMinutes : futureMinutes
    }`;
    this.beBackTime.style.color = "#fff";
  }
}

// create a instance of timer
const restTime = document.querySelector(".rest-time");
const beBackTime = document.querySelector(".be-back-time");
const rest = document.querySelectorAll(".rest");
const stopwatch = document.querySelector(".elapsed");
const timer = new Timer(restTime, beBackTime, stopwatch, rest);

// both utils function are called here.
Array.from(rest).forEach(rt => {
  rt.addEventListener("click", setBreak);
  // rt.style.backgroundColor
});

Array.from(rest).forEach(rt => {
  rt.addEventListener("click", function(e) {
    if (!timer.isActive) return;

    if (!this.classList.contains("rest-clicked")) {
      Array.from(rest).forEach(r => {
        r.classList.remove("rest-clicked");
      });
      this.classList.add("rest-clicked");
    }
  });
});

const start = document.querySelector(".start-timer");
const pause = document.querySelector(".pause-timer");
const restart = document.querySelector(".restart-timer");
const stop = document.querySelector(".stop-timer");
let __startTimer = true;

function setBreak() {
  const time = parseInt(this.dataset.minute * 60);

  // stopwatch.style.color = "#ffffff";
  timer.getBreakTime(time);
}
document.balanceForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const time = parseInt(this.minutes.value * 60);
  this.reset();
  timer.getBreakTime(time);
});

start.addEventListener("click", function() {
  if (__startTimer) {
    timer.startTimer();
    // start.textContent = "Stop timer";
    __startTimer = false;
  }
});

pause.addEventListener("click", function() {
  timer.pauseTimer();

  __startTimer = true;
});
restart.addEventListener("click", function() {
  timer.restartTimer();
});

stop.addEventListener("click", function() {
  timer.stopTimer();
  __startTimer = true;
});

const consoleClose = document.querySelector(".out-close");
const error = document.querySelector(".console-label");
const consoleBtnITag = document.querySelector(".opc");
const closeConsole = document.querySelector(".to-close");
const fullscreen = document.querySelector(".to-fullscreen");
const exitFullscreen = document.querySelector(".exit-fullscreen");

class ProxyConsole {
  constructor(
    error,

    consoleText,

    consoleElement,

    consoleCont,
    logElement,
    consoleBar,
    consoleInput
  ) {
    this.consoleClosed = true;
    this.errorElement = error;
    this.consoleText = consoleText;
    this.consoleElement = consoleElement;
    this.consoleCont = consoleCont;
    this.logElement = logElement;
    this.consoleBar = consoleBar;
    this.consoleInput = consoleInput;
    this.dashes = "-----------------------------------------";
    this.word = "console.log( (89 * 78) / (64 % 6) - (90 + 120) )";
    this.time = 0;
  }
  printToConsole(e) {
    const message = !e.data.error
      ? {
          lang: "JS",
          data: {
            message: e.data.message
          }
        }
      : {
          lang: "JS",
          data: {
            message: e.data.message,
            lineNumber: e.data.lineno,
            columnNumber: e.data.colno,
            src: e.source
          }
        };
    this.printMessage(message, e);
  }
  printMessage(x, y) {
    if (x && y.data.error) {
      this.updateErrorCount();
      const mess = x.data.message;
      const language = x.lang;
      const lineNo = x.data.lineNumber;
      const colNo = x.data.columnNumber;

      const errorOutput = `\n# ${mess} \n#\t\t\t\t at main(${lineNo}:${colNo})\n${this.dashes}`;

      // updates the  console.

      // check if user wants to preserve the logs..
      if (this.logElement.checked) {
        this.consoleElement.replaceRange(
          errorOutput,
          CodeMirror.Pos(this.consoleElement.lastLine() + 1)
        );
      } else if (!this.logElement.checked) {
        this.consoleElement.getDoc().setValue(errorOutput);
      }

      // checks if console is opened and scrolls it into view.
      if (!this.consoleClosed) {
        this.consoleElement.setCursor(this.consoleElement.lastLine(), 3);
      }
      // updates textContent / error numbers and set text color.
      let eCount = parseInt(this.errorElement.getAttribute("data-error"));
      this.errorElement.textContent = `${eCount}`;
    } else if (x && y.data.console) {
      // gets response from iframe.
      const mess = x.data.message;
      // formats console output

      const consoleOutput = `\n${mess}\n${this.dashes}`;
      // updates the console.
      // check if user wants to preserve the logs...
      if (this.logElement.checked) {
        const ll = this.consoleElement.lastLine() + 1;

        this.consoleElement.replaceRange(consoleOutput, CodeMirror.Pos(ll));

        if (consoleOutput.split("\n").length > 15) {
          this.consoleElement.foldCode(ll);
        }
      } else if (!this.logElement.checked) {
        this.consoleElement.getDoc().setValue(consoleOutput);
      }

      // checks if console is opened and scrolls it into view.
      if (!this.consoleClosed) {
        this.consoleElement.setCursor(this.consoleElement.lastLine(), 3);
      }
    } else if (x && y.data.clear) {
      // clears console
      this.clearProxyConsole();
      // scrolls to view.
      if (!this.consoleClosed) {
        this.consoleElement.setCursor(this.consoleElement.lastLine(), 3);
      }
    }
  }
  updateErrorCount() {
    let eCount = parseInt(this.errorElement.getAttribute("data-error"));
    const errorCount = ++eCount;
    let consoleBError = parseInt(this.consoleBar.getAttribute("data-label"));
    consoleBError++;
    this.errorElement.setAttribute("data-error", `${errorCount}`);
    consoleBError > 1
      ? consoleBar.setAttribute("data-label", `${consoleBError} errors.`)
      : consoleBar.setAttribute("data-label", `${consoleBError} error.`);
  }
  clearProxyConsole() {
    let eCount = parseInt(this.errorElement.getAttribute("data-error"));
    const cleared = `# Console was cleared.`;

    this.consoleElement.getDoc().setValue(cleared);
    this.errorCount = 0;
    this.errorElement.setAttribute("data-error", `${0}`);
    this.consoleBar.setAttribute("data-label", "0 errors");
    this.errorElement.textContent = `${0}`;

    console.clear();
  }
  hideConsole() {
    this.consoleCont.classList.add("is_minimised");

    this.consoleClosed = true;
  }
  showConsole() {
    this.consoleCont.classList.remove("is_minimised");
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.consoleElement.setCursor(this.consoleElement.lastLine(), 3);
      }, 500);
    });
    this.consoleClosed = false;
  }
  evaluateConsoleInput() {
    function consoleEval(x) {
      return preview.contentWindow.Function(
        '"use strict"; return (' + x + ")"
      )();
    }
    this.consoleElement.replaceRange(
      `\n${this.dashes}\n#! \t${this.consoleInput.value}`,
      CodeMirror.Pos(this.consoleElement.lastLine() + 1)
    );
    try {
      consoleEval(`console.log(${this.consoleInput.value})`);
    } catch (e) {
      let error = e.message.split("\n")[0];
      this.consoleElement.replaceRange(
        `\n${this.dashes}\n# \t${error}`,
        CodeMirror.Pos(this.consoleElement.lastLine() + 1)
      );
      this.consoleElement.setCursor(this.consoleElement.lastLine(), 3);
    }

    this.consoleInput.value = "";
  }
  typeWrite() {
    if (this.time < this.word.length) {
      let msg = this.word.charAt(this.time);
      let recent = this.consoleInput.getAttribute("placeholder") + msg;
      this.consoleInput.setAttribute("placeholder", recent);
      this.time++;
      setTimeout(() => this.typeWrite(), 90);
    }
  }
}

// eslint-disable-next-line no-undef
const proxyConsole = new ProxyConsole(
  error,
  consoleBtn,
  consoleEditor,
  consoleOutput,
  preserveLog,
  consoleBar,
  consoleInput
);

window.addEventListener("message", function(e) {
  proxyConsole.printToConsole(e);
});

// eslint-disable-next-line no-undef
clearConsole.addEventListener("click", () => {
  proxyConsole.clearProxyConsole();
});

consoleBtn.addEventListener("click", () => {
  consoleBtnITag.innerText = "visibility";
  proxyConsole.showConsole();
  proxyConsole.typeWrite();
});

closeConsole.addEventListener("click", () => {
  consoleBtnITag.innerText = "visibility_off";
  consoleOutput.style.transition =
    "transform .4s cubic-bezier(.38,.39,.28,.95)";
  proxyConsole.hideConsole();
  consoleOutput.style.height = "66.66%";
});

consoleInput.addEventListener("focus", updatePreview, {
  once: true
});
consoleInput.addEventListener("keypress", e => {
  if (e.keyCode === 13 && e.target.value.length) {
    proxyConsole.evaluateConsoleInput();
  }
});

fullscreen.addEventListener("click", e => {
  consoleOutput.style.height = "100%";
  consoleOutput.style.transition = "height .4s cubic-bezier(.38,.39,.28,.95)";
});

exitFullscreen.addEventListener("click", e => {
  consoleOutput.style.height = "66.66%";
  consoleOutput.style.transition = "height .4s cubic-bezier(.38,.39,.28,.95)";
});

function exportToZip() {
  const getHTMLDist = HtmlCompile(htmlEditor, csse.html);
  const getCSSDist = CSSCompile(cssEditor, csse.css);
  const getJSDist = JSCompile(jsEditor, csse.js);

  Promise.all([getHTMLDist, getCSSDist, getJSDist]).then(data => {
    const distHTML = data[0].code;
    const distCSS = data[1].code;
    const distJS = data[2].code;
    formatExport(distHTML, distCSS, distJS);
  });

  function formatExport(html, css, js) {
    const name = crumbName.crumb.value;
    const externalJs = jsLib.value.split("\n").reduce(function(links, url) {
      return links + (url ? '\n<script src="' + url + '"></script>' : "");
    }, "");
    const externalCss = cssLib.value.split("\n").reduce(function(links, url) {
      return (
        links + (url ? '\n<link rel="stylesheet" href="' + url + '">' : "")
      );
    }, "");

    const formatHTML = `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          ${metaLib.value}
          <title>${name}</title>
          ${externalCss}
          ${externalJs}
          <link href="./style.css" rel="stylesheet">
      </head>
      <body>
          ${html}
          <script src="./script.js"></script>
      </body>
  </html>
    `;
    const path = window.location.href;
    const url = window.location.pathname.split("/")[3];
    const fileExtensions = {
      html: {
        html: "html",
        pug: "pug",
        markdown: "markdown"
      },
      css: {
        css: "css",
        less: "less",
        scss: "scss",
        sass: "sass",
        stylus: "styl"
      },
      js: {
        javascript: "js",
        typescript: "ts",
        coffeescript: "coffeescript",
        babel: "js",
        jsx: "jsx"
      }
    };
    const TOZIP = JSON.stringify({
      src: {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
        htmlExt: fileExtensions.html[csse.html],
        cssExt: fileExtensions.css[csse.css],
        jsExt: fileExtensions.js[csse.js]
      },
      dist: {
        html: beautifyExport(formatHTML, "html"),
        css: beautifyExport(css, "css"),
        js: beautifyExport(js, "babylon")
      },
      url: url,
      README: `Happy coding! 🚀\n\n#Introducton. \nA Crumb created at CodeCrumb.io. Original URL: [${crumbName.crumb.value}](${path}).`
    });

    sendDATA(TOZIP);
  }
  function sendDATA(res) {
    const org = window.location.origin;
    fetch(`${org}/crumbs/exports`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      cache: "no-cache",
      credentials: "include",
      body: res
    })
      .then(res => res.json())
      .then(data => {
        window.location.href = `${window.origin}/crumbs/exports/${data.request}`;
        exportFile.textContent = "Export as ZIP";
      })
      .catch(err => new Error(err));
  }
}

//# sourceMappingURL=maps/utils.js.map

//# sourceMappingURL=maps/app.bundle.one.js.map
