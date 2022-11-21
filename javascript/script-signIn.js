
// Doi tuong Validator
function Validator(options) {

  function getParent() {
      
  }

  var selectorRules = [];
  // validate: loi nhap name
  function validate(inputElement, rule) {
     
      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
      var errorMessage;
      // console.log(rules);

      // Lặp qua từng rule và kiểm tra
      // Nếu có lỗi thì dừng việc kiểm tra
      for(var i = 0; i < rules.length; i++) {
          errorMessage = rules[i](inputElement.value);
          if(errorMessage) {
              break;
          }
      }
      // value: inputElement.value
      // test function: rule.test
      // var errorMessage = rule.test(inputElement.value);

      var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

      console.log(errorMessage);

      if(errorMessage) {
          errorElement.innerText = errorMessage;
          inputElement.parentElement.classList.add('invalid')
      } 
      else {
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid')
      }
      return !errorMessage;
  }

  var formElement = document.querySelector(options.form);
  // Lay element cua form can bao error
  if(formElement) {

      // Khi submit form
      formElement.onsubmit = (e) => {
          e.preventDefault();

          var formValid = true;

          // thực hiện lặp qua từng rule và validate
          options.rules.forEach((rule) => {
              var inputElement = formElement.querySelector(rule.selector);
              var isValid=validate(inputElement, rule);
              if(!isValid) {
                  formValid = false;
              }
          });
          if(formValid) {

              // Submit với JS
              if(typeof options.onSubmit === 'function') {
                  var enableInputs = formElement.querySelectorAll('[name]');

                  // enableInputs: node List -> Array from -> Array
                  var formValues = Array.from(enableInputs).reduce((values, input) => {
                      values[input.name] = input.value;
                      return values;
                  }, {});
                  options.onSubmit(formValues);
              }
          }
          // submit với hành vi mặc định
          else {
              // formElement.submit();
          }

      }

      // Lặp qua mỗi rule và xử lí (lắng nghe sự kiện blur, input...)
      options.rules.forEach((rule) => {

          // Lưu lại các rules cho mỗi lần input
          if(Array.isArray(selectorRules[rule.selector])) {
              selectorRules[rule.selector].push(rule.test);
          }
          else {
              selectorRules[rule.selector] = [rule.test];

          }

          var inputElement = formElement.querySelector(rule.selector);
          var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

          if(inputElement) {

              // blur ra khỏi input
              inputElement.onblur = () => {
                  validate(inputElement, rule);
              }

              // Xử lý mỗi khi người dùng nhập vào input
              inputElement.oninput = () => {
                  errorElement.innerText = '';
                  inputElement.parentElement.classList.remove('invalid')
              }
          }
      });
      // console.log(selectorRules);

  }
}

// Dinh nghia rules
Validator.isRequired = function(selector) {
  return {
      selector,
      test(value) {
          return value.trim() ? undefined : 'Vui lòng nhập trường này';
      }
  };
}

Validator.isEmail = function(selector) {
  return {
      selector,
      test(value) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value) ? undefined : 'Trường này phải là email'
      }
  }
}

Validator.minLength = function(selector, min) {
  return {
      selector,
      test(value) {
          return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`; 
      }
  }
}

Validator.isConfirmed = (selector, getConfirmValue, message) => {
  return {
      selector,
      test(value) {
          return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
      }
  }
}
