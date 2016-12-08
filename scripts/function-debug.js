'use strict';

$(function () {

  spinnerOnLoad();
  movingBg();
  currencyDropDown();
  smoothScroll();
  entranceEvt();
  mainFormSubmit();
  reserveFormSubmit();
  splashBLockNews();
});

// Check for the blank inputs
// Form validation

var mainFormSubmit = function mainFormSubmit() {
  var mainForm = $('#main-form'),
      inputEmail = $('input[name="yourEmail"]'),
      inputNumber = $('input[name="yourNumber"]'),
      inputUGive = $('input[name="ugive"]'),
      hintMail = $('.email'),
      hintNumber = $('.number'),
      btnSubmit = $('button[type="submit"]'),
      spinner = $('.loader-submit'),
      successful = $('.successful'),
      successfulBtn = successful.find('button'),
      allHints = $('.hint'),
      allInputs = $('#main-form input');

  successfulBtn.on('click', function (event) {
    var $this = $(event.currentTarget),
        parent = $(event.currentTarget).parent();
    if (parent.is(':visible')) parent.hide();
    mainForm.show();
  });

  mainForm.submit(function (evt) {

    //Check if all the inputs filled
    if (inputEmail.val() != "" && inputNumber.val() != "" && inputUGive.val() != "") {
      (function () {
        var $this = $(evt.currentTarget),
            url = $this.attr('action'),
            type = $this.attr('method'),
            data = {};

        $this.find('[name]').each(function (index, value) {
          var item = $(value),
              name = item.attr('name'),
              itemValue = item.val();
          data[name] = itemValue;
        });

        $.ajax({
          url: url,
          type: type,
          data: data,
          beforeSend: function beforeSend() {
            btnSubmit.hide();
            spinner.show();
          },
          complete: function complete() {
            spinner.hide();
            btnSubmit.show();
          },
          success: function success() {
            successful.show();
            $this.find(':input').val('');
            mainForm.hide();
          }
        });
        evt.preventDefault();
      })();
    }

    // Else if inputs are blank
    else {

        allInputs.each(function () {
          var $this = $(this);
          if ($this.val() == '') {
            $this.css({
              backgroundColor: '#ffc5c5'
            });
            evt.preventDefault();
          } else if ($this.val() != '') {
            $this.css({
              backgroundColor: '#fff'
            });
            evt.preventDefault();
          }
          // Input on change
          $this.on('input', function () {
            if ($this.css({
              backgroundColor: '#ffc5c5'
            })) {
              $this.css({
                backgroundColor: '#fff'
              });
            }
          });
        });
      }
  });

  // Disable letters in input forms

  inputUGive.add(inputNumber).on('keypress', function (key) {
    if (key.charCode < 43 || key.charCode > 57) return false;
  });
};

var reserveFormSubmit = function reserveFormSubmit() {
  var formReserve = $('#form-reserve form'),
      inputEmail = formReserve.find('input[type="email"]'),
      btn = formReserve.find('button[type="submit"]'),
      loader = formReserve.find('.loader-submit'),
      ajaxSuccess = $('#form-reserve .successful');

  inputEmail.on('input', function () {
    if (inputEmail.css({ boxShadow: "inset 0px 0px 0px 1px red" })) {
      inputEmail.css({ boxShadow: "inset 0px 0px 0px 1px transparent" });
    }
  });

  formReserve.submit(function (evt) {

    if (inputEmail.val() != "") {
      (function () {
        var $this = $(evt.currentTarget),
            url = $this.attr('action'),
            type = $this.attr('method'),
            data = {};

        $this.find('[name]').each(function (index, value) {
          var item = $(value),
              name = item.attr('name'),
              itemValue = item.val();
          data[name] = itemValue;
        });

        $.ajax({
          url: url,
          type: type,
          data: data,
          beforeSend: function beforeSend() {
            btn.hide();
            loader.show();
          },
          complete: function complete() {
            loader.hide();
            btn.show();
          },
          success: function success() {
            ajaxSuccess.show();
            inputEmail.val("");
          }
        });
        evt.preventDefault();
      })();
    } else {
      if (inputEmail.val() == "") {
        inputEmail.css({ boxShadow: "inset 0px 0px 0px 1px red" });
        inputEmail.attr('placeholder', 'Заполните поле');
        evt.preventDefault();
      }

      if (inputEmail.val() == "") {
        inputEmail.css({ boxShadow: "inset 0px 0px 0px 1px red" });
        evt.preventDefault();
      }
    }
  });
};

//Spinner on fades out on window load

var spinnerOnLoad = function spinnerOnLoad() {
  var loadSpinner = $('#load-spinner');
  $(document).ready(function () {
    loadSpinner.fadeOut(500);
  });
};

// DropDown menu in the sections content and reserve

var currencyDropDown = function currencyDropDown() {
  var changeCurrency = $('.currency-list'),
      currencyBox = $('.currency-box');

  changeCurrency.on('click', function (evt) {
    var $this = $(evt.currentTarget);
    $this.next().toggleClass('show');
  });
};

// Function for smoothScrolling anchor

var smoothScroll = function smoothScroll() {
  $(document).on('click', 'a[href^="#contact"], a[href^="#about"], a[href^="#content"]', function (evt) {
    evt.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(evt.currentTarget, 'href')).offset().top
    }, 500);
  });
};

// Moving bg. Parralax

var movingBg = function movingBg() {
  var $window = $(window);
  var parallaxBg = function parallaxBg() {
    var content = $('#content'),
        about = $('#about'),
        windowScroll = $(window).scrollTop();
    content.css({ backgroundPosition: 'center ' + -windowScroll / 2 + 'px' });
    about.css({ backgroundPosition: 'center ' + (560 + -windowScroll / 2) + 'px' });
  };

  if ($window.width() >= 1349) {
    $window.on('scroll', parallaxBg);
  }
};

// Entrance event

var entranceEvt = function entranceEvt() {
  var anchorEntrance = $('a[href^="#entrance"]'),
      anchorFAQ = $('a[href^="#faq"]'),
      anchroTarify = $('a[href^="#tarify"]'),
      entranceForm = $('#entrance'),
      popUpContainer = $('.pop-up-container'),
      confidentiality = $('#confidentiality'),
      faq = $('#faq'),
      tarify = $('#tarify'),
      closeImg = $('.close'),
      header = $('.main-header-fixed'),
      mainNav = header.find('.main-nav'),
      popUp = $('.popup'),
      shadow = $('.shadow');

  popUp.on('click', function (evt) {
    var $this = $(evt.currentTarget);
    var setOne = [header, shadow, popUpContainer];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = setOne[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _item4 = _step.value;

        _item4.fadeIn(350);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if ($this.attr('href') == '#entrance') {
      if (!entranceForm.is(':visible')) {
        entranceForm.siblings().fadeOut(350);
        entranceForm.fadeIn(350);
      } else if (entranceForm.is(':visible')) {
        var setTwo = [entranceForm, popUpContainer, header];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = setTwo[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            item.fadeOut(350);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } else if ($this.attr('href') == '#faq') {
      if (!faq.is(':visible')) {
        faq.siblings().fadeOut(350);
        faq.fadeIn(350);
      } else if (faq.is(':visible')) {
        var setThree = [faq, popUpContainer, header];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = setThree[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _item = _step3.value;

            _item.fadeOut(350);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } else if ($this.attr('href') == '#tarify') {
      if (!tarify.is(':visible')) {
        tarify.siblings().fadeOut(350);
        tarify.fadeIn(350);
      } else if (tarify.is(':visible')) {
        var setFour = [tarify, popUpContainer, header];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = setFour[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _item2 = _step4.value;

            _item2.fadeOut(350);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    } else if ($this.attr('href') == '#confidentiality') {
      if (!confidentiality.is(':visible')) {
        confidentiality.siblings().fadeOut(350);
        confidentiality.fadeIn(350);
      } else if (confidentiality.is(':visible')) {
        var setFive = [confidentiality, popUpContainer, header];
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = setFive[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _item3 = _step5.value;

            _item3.fadeOut(350);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    }
  });

  var closeTargets = [closeImg, popUpContainer, shadow, header];
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = closeTargets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var targ = _step6.value;

      targ.on('click', function (e) {
        var toClose = [entranceForm, faq, tarify, confidentiality, popUpContainer, header];
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = toClose[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var item = _step7.value;

            item.fadeOut(350);
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      });
      targ.children().on('click', function (e) {
        e.stopPropagation();
      });
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
};

// News splash window

var splashBLockNews = function splashBLockNews() {
  var readAlls = $('.read-all'),
      header = $('.main-header-fixed'),
      shadow = $('.shadow'),
      popUpContainer = $('.pop-up-container'),
      article = $('.one');

  readAlls.on('click', function (evt) {
    var $this = $(evt.currentTatget),
        itemsToClose = [header, shadow, popUpContainer, article];

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = itemsToClose[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var item = _step8.value;

        item.fadeIn(350);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  });
};