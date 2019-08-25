/*
  A visual selector builder script to be inserted into arbitrary pages. Once the
  page loads, a set of controls is inserted into the page and these allow the
  user to visually select an element, and the script generates a selector behind
  the scenes. Once the user accepts their selection, a message is broadcasted
  to the extension with the selector and the URL of the page in question and the
  tab is closed.
*/

// Constants.
var OUTLINE_CLASS = 'chrome_page_monitor_outline';
var TEMP_OUTLINE_CLASS = 'chrome_page_monitor_temp_outline';
var ACTIVE_CLASS = 'chrome_page_monitor_active';
var DISABLED_CLASS = 'chrome_page_monitor_disabled';

// Picking state.
var current_element = null;
var current_selector = '';
var pick_mode = true;

// References to the controls.
var frame = null;
// Updates current_selector, the visual outline and the state of various buttons
// depending on the value of current_element.
function currentElementChanged() {
  $('*').removeClass(TEMP_OUTLINE_CLASS).removeClass(OUTLINE_CLASS);

  if (current_element) {
    $(current_element).addClass(OUTLINE_CLASS);
    current_selector = elementToSelector(current_element);
  } else {
    current_selector = '';
  }
}

// Takes an element and walks up its hierarchy constructing a selector which
// would match this element (and hopefully it alone). Stops as soon as it
// reaches an element with a defined ID attribute or when reaching the <body>.
// Ignores classes starting with chrome_page_monitor_ (e.g. the outline class).
// Elements outside of <body> return null.
function elementToSelector(element) {
  var path = [];

  element = $(element);

  if (element.is('body')) {
    return 'body';
  } else if (element.closest('body').length == 0) {
    return null;
  } else {
    while (!(element.is('body') || element.attr('id'))) {
      var tagname = element.get(0).tagName.toLowerCase();
      var classname = element.get(0).className;

      classname = classname.replace(/chrome_page_monitor_\w+/g, '')
                           .replace(/^\s+|\s+$/g, '')
                           .replace(/\s+/g, '.');

      var selector = classname ? (tagname + '.' + classname) : tagname;

      if (element.siblings(selector).length > 0) {
        selector += ':nth-child(' + (element.index() + 1) + ')';
      }

      path.push(selector);

      element = element.parent();
    }

    if (element.attr('id')) {
      path.push('#' + element.attr('id'));
    } else {
      path.push('');
    }

    path.reverse();

    return path.join('>');
  }
}

// Sets up the mousemove and click handlers for the <body> to highlight the
// element currently being hovered on with the chrome_page_monitor_temp_outline
// class and the selected one with chrome_page_monitor_active. Also sets
// current_element if one is clicked in pick mode, deactivates the pick button
// by removing its chrome_page_monitor_active class and calls
// currentElementChanged() to update the selection. Elements inside the control
// block are ignored during selection.
function setUpBodyHandlers() {
  $('body').mousemove(function(e) {
    if (pick_mode) {
      $('*').removeClass(TEMP_OUTLINE_CLASS);
      $(e.target).addClass(TEMP_OUTLINE_CLASS);
    }
  });

  $('body').click(function(e) {
    if (pick_mode) {
      var element = e.target;
      if (!($(element).is('body'))) {
        current_element = element;
        currentElementChanged();
        pick_mode = false;
        
        if (current_selector) {
      chrome.extension.sendRequest({
        selector: current_selector,
        url: window.location.href
      }, removeFrame);
    } else {
      window.removeFrame();
    }
      }
      return false;
    }
  });
}

// The main function. Inserts the controls, updates the global references to
// them, then sets up event handlers for everything by calling
// setUpBodyHandlers() and setUpButtonHandlers().
function initialize() {
  setUpBodyHandlers();
}

function removeFrame()
{
  //frame = $('#' + FRAME_ID);
 // frame.hide();
 location.reload();
}