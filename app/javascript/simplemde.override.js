(function overrideSimpleMDE() {

  // CUSTOM CHANGE HERE.
  // The original code uses the icon classes direct on the link
  // It doesn't work with current font icons
  // We need to create a i Element inside the link
  function createIcon(options, enableTooltips, shortcuts) {
    options = options || {};
    var el = document.createElement("a");
    enableTooltips = (enableTooltips == undefined) ? true : enableTooltips;

    if(options.title && enableTooltips) {
      el.title = createTootlip(options.title, options.action, shortcuts);

      if(isMac) {
        el.title = el.title.replace("Ctrl", "⌘");
        el.title = el.title.replace("Alt", "⌥");
      }
    }

    el.tabIndex = -1;
    el.innerHTML = `<i class='${options.className}'></i>`
    return el;
  }

  // Same function from lib but using our modified create icon
  SimpleMDE.prototype.createToolbar = function(items) {
    items = items || this.options.toolbar;

    if(!items || items.length === 0) {
      return;
    }
    var i;
    for(i = 0; i < items.length; i++) {
      if(toolbarBuiltInButtons[items[i]] != undefined) {
        items[i] = toolbarBuiltInButtons[items[i]];
      }
    }

    var bar = document.createElement("div");
    bar.className = "editor-toolbar";

    var self = this;

    var toolbarData = {};
    self.toolbar = items;

    for(i = 0; i < items.length; i++) {
      if(items[i].name == "guide" && self.options.toolbarGuideIcon === false)
        continue;

      if(self.options.hideIcons && self.options.hideIcons.indexOf(items[i].name) != -1)
        continue;

      // Fullscreen does not work well on mobile devices (even tablets)
      // In the future, hopefully this can be resolved
      if((items[i].name == "fullscreen" || items[i].name == "side-by-side") && isMobile())
        continue;


      // Don't include trailing separators
      if(items[i] === "|") {
        var nonSeparatorIconsFollow = false;

        for(var x = (i + 1); x < items.length; x++) {
          if(items[x] !== "|" && (!self.options.hideIcons || self.options.hideIcons.indexOf(items[x].name) == -1)) {
            nonSeparatorIconsFollow = true;
          }
        }

        if(!nonSeparatorIconsFollow)
          continue;
      }

      // Create the icon and append to the toolbar
      (function(item) {
        var el;
        if(item === "|") {
          el = createSep();
        } else {
          el = createIcon(item, self.options.toolbarTips, self.options.shortcuts);
        }

        // bind events, special for info
        if(item.action) {
          if(typeof item.action === "function") {
            el.onclick = function(e) {
              e.preventDefault();
              item.action(self);
            };
          } else if(typeof item.action === "string") {
            el.href = item.action;
            el.target = "_blank";
          }
        }

        toolbarData[item.name || item] = el;
        bar.appendChild(el);
      })(items[i]);
    }

    self.toolbarElements = toolbarData;

    var cm = this.codemirror;
    cm.on("cursorActivity", function() {
      var stat = getState(cm);

      for(var key in toolbarData) {
        (function(key) {
          var el = toolbarData[key];
          if(stat[key]) {
            el.className += " active";
          } else if(key != "fullscreen" && key != "side-by-side") {
            el.className = el.className.replace(/\s*active\s*/g, "");
          }
        })(key);
      }
    });

    var cmWrapper = cm.getWrapperElement();
    cmWrapper.parentNode.insertBefore(bar, cmWrapper);
    return bar;
  };

  // Internal Lib Functions
  // We need to copy/paste it here in order to fulfill calls from
  // createIcon and createToolbar

  /**
   * The state of CodeMirror at the given position.
   */
  function getState(cm, pos) {
    pos = pos || cm.getCursor("start");
    var stat = cm.getTokenAt(pos);
    if(!stat.type) return {};

    var types = stat.type.split(" ");

    var ret = {},
      data, text;
    for(var i = 0; i < types.length; i++) {
      data = types[i];
      if(data === "strong") {
        ret.bold = true;
      } else if(data === "variable-2") {
        text = cm.getLine(pos.line);
        if(/^\s*\d+\.\s/.test(text)) {
          ret["ordered-list"] = true;
        } else {
          ret["unordered-list"] = true;
        }
      } else if(data === "atom") {
        ret.quote = true;
      } else if(data === "em") {
        ret.italic = true;
      } else if(data === "quote") {
        ret.quote = true;
      } else if(data === "strikethrough") {
        ret.strikethrough = true;
      } else if(data === "comment") {
        ret.code = true;
      } else if(data === "link") {
        ret.link = true;
      } else if(data === "tag") {
        ret.image = true;
      } else if(data.match(/^header(\-[1-6])?$/)) {
        ret[data.replace("header", "heading")] = true;
      }
    }
    return ret;
  }

  function createTootlip(title, action, shortcuts) {
    var actionName;
    var tooltip = title;

    if(action) {
      actionName = getBindingName(action);
      if(shortcuts[actionName]) {
        tooltip += " (" + fixShortcut(shortcuts[actionName]) + ")";
      }
    }

    return tooltip;
  }

  var isMac = /Mac/.test(navigator.platform);

  // Mapping of actions that can be bound to keyboard shortcuts or toolbar buttons
  var bindings = {
    "toggleBold":  SimpleMDE.toggleBold,
    "toggleItalic":  SimpleMDE.toggleItalic,
    "drawLink":  SimpleMDE.drawLink,
    "toggleHeadingSmaller":  SimpleMDE.toggleHeadingSmaller,
    "toggleHeadingBigger":  SimpleMDE.toggleHeadingBigger,
    "drawImage":  SimpleMDE.drawImage,
    "toggleBlockquote":  SimpleMDE.toggleBlockquote,
    "toggleOrderedList":  SimpleMDE.toggleOrderedList,
    "toggleUnorderedList":  SimpleMDE.toggleUnorderedList,
    "toggleCodeBlock":  SimpleMDE.toggleCodeBlock,
    "togglePreview":  SimpleMDE.togglePreview,
    "toggleStrikethrough":  SimpleMDE.toggleStrikethrough,
    "toggleHeading1":  SimpleMDE.toggleHeading1,
    "toggleHeading2":  SimpleMDE.toggleHeading2,
    "toggleHeading3":  SimpleMDE.toggleHeading3,
    "cleanBlock":  SimpleMDE.cleanBlock,
    "drawTable":  SimpleMDE.drawTable,
    "drawHorizontalRule":  SimpleMDE.drawHorizontalRule,
    "undo":  SimpleMDE.undo,
    "redo":  SimpleMDE.redo,
    "toggleSideBySide":  SimpleMDE.toggleSideBySide,
    "toggleFullScreen":  SimpleMDE.toggleFullScreen
  };


  var toolbarBuiltInButtons = {
    "bold": {
      name: "bold",
      action: SimpleMDE.toggleBold,
      className: "fa fa-bold",
      title: "Bold",
      default: true
    },
    "italic": {
      name: "italic",
      action: SimpleMDE.toggleItalic,
      className: "fa fa-italic",
      title: "Italic",
      default: true
    },
    "strikethrough": {
      name: "strikethrough",
      action: SimpleMDE.toggleStrikethrough,
      className: "fa fa-strikethrough",
      title: "Strikethrough"
    },
    "heading": {
      name: "heading",
      action: SimpleMDE.toggleHeadingSmaller,
      className: "fa fa-header",
      title: "Heading",
      default: true
    },
    "heading-smaller": {
      name: "heading-smaller",
      action: SimpleMDE.toggleHeadingSmaller,
      className: "fa fa-header fa-header-x fa-header-smaller",
      title: "Smaller Heading"
    },
    "heading-bigger": {
      name: "heading-bigger",
      action: SimpleMDE.toggleHeadingBigger,
      className: "fa fa-header fa-header-x fa-header-bigger",
      title: "Bigger Heading"
    },
    "heading-1": {
      name: "heading-1",
      action: SimpleMDE.toggleHeading1,
      className: "fa fa-header fa-header-x fa-header-1",
      title: "Big Heading"
    },
    "heading-2": {
      name: "heading-2",
      action: SimpleMDE.toggleHeading2,
      className: "fa fa-header fa-header-x fa-header-2",
      title: "Medium Heading"
    },
    "heading-3": {
      name: "heading-3",
      action: SimpleMDE.toggleHeading3,
      className: "fa fa-header fa-header-x fa-header-3",
      title: "Small Heading"
    },
    "separator-1": {
      name: "separator-1"
    },
    "code": {
      name: "code",
      action: SimpleMDE.toggleCodeBlock,
      className: "fa fa-code",
      title: "Code"
    },
    "quote": {
      name: "quote",
      action: SimpleMDE.toggleBlockquote,
      className: "fa fa-quote-left",
      title: "Quote",
      default: true
    },
    "unordered-list": {
      name: "unordered-list",
      action: SimpleMDE.toggleUnorderedList,
      className: "fa fa-list-ul",
      title: "Generic List",
      default: true
    },
    "ordered-list": {
      name: "ordered-list",
      action: SimpleMDE.toggleOrderedList,
      className: "fa fa-list-ol",
      title: "Numbered List",
      default: true
    },
    "clean-block": {
      name: "clean-block",
      action: SimpleMDE.cleanBlock,
      className: "fa fa-eraser fa-clean-block",
      title: "Clean block"
    },
    "separator-2": {
      name: "separator-2"
    },
    "link": {
      name: "link",
      action: SimpleMDE.drawLink,
      className: "fa fa-link",
      title: "Create Link",
      default: true
    },
    "image": {
      name: "image",
      action: SimpleMDE.drawImage,
      className: "fa fa-image",
      title: "Insert Image",
      default: true
    },
    "table": {
      name: "table",
      action: SimpleMDE.drawTable,
      className: "fa fa-table",
      title: "Insert Table"
    },
    "horizontal-rule": {
      name: "horizontal-rule",
      action: SimpleMDE.drawHorizontalRule,
      className: "fa fa-minus",
      title: "Insert Horizontal Line"
    },
    "separator-3": {
      name: "separator-3"
    },
    "preview": {
      name: "preview",
      action: SimpleMDE.togglePreview,
      className: "fa fa-eye no-disable",
      title: "Toggle Preview",
      default: true
    },
    "side-by-side": {
      name: "side-by-side",
      action: SimpleMDE.toggleSideBySide,
      className: "fa fa-columns no-disable no-mobile",
      title: "Toggle Side by Side",
      default: true
    },
    "guide": {
      name: "guide",
      action: "https://simplemde.com/markdown-guide",
      className: "fa fa-question-circle",
      title: "Markdown Guide",
      default: true
    },
    "fullscreen": {
      name: "fullscreen",
      action: SimpleMDE.toggleFullScreen,
      className: "fa fa-arrows-alt no-disable no-mobile",
      title: "Toggle Fullscreen",
      default: true
    },
    "separator-4": {
      name: "separator-4"
    },
    "separator-5": {
      name: "separator-5"
    },
    "undo": {
      name: "undo",
      action: SimpleMDE.undo,
      className: "fa fa-undo no-disable",
      title: "Undo"
    },
    "redo": {
      name: "redo",
      action: SimpleMDE.redo,
      className: "fa fa-repeat no-disable",
      title: "Redo"
    }
  };

  /**
   * Fix shortcut. Mac use Command, others use Ctrl.
   */
  function fixShortcut(name) {
    if(isMac) {
      name = name.replace("Ctrl", "Cmd");
    } else {
      name = name.replace("Cmd", "Ctrl");
    }
    return name;
  }


  var getBindingName = function(f) {
    for(var key in bindings) {
      if(bindings[key] === f) {
        return key;
      }
    }
    return null;
  };



  var isMobile = function() {
    var check = false;
    (function(a) {
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };


  function createSep() {
    var el = document.createElement("i");
    el.className = "separator";
    el.innerHTML = "|";
    return el;
  }

})()