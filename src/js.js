// Form 요소 input 요소들.
const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const userage = document.getElementById('userage')
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//모달 요소
const modal = document.getElementById("successSignup");
const closeBtn = document.getElementById("close"); 

// 폼 제출 이벤트 추가.
form.addEventListener('submit', function(e) {
    e.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    // 유효성 검사를 수행하는 함수를 호출합니다.
    checkInputs();
});

// 모달 show
function showModal() {
    modal.style.display = 'flex';
}

// 닫기 버튼
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// 가입 버튼
function checkInputs() {
    const usernameValid = checkUsername();
    const emailValid = checkEmail();
    const ageValid = checkUserage();
    const password1 = checkPassword();
    const password2 = checkPassword2();

    // 모든 입력이 올바른지 확인
    if(usernameValid && emailValid && ageValid && password1 && password2) {
        // 모든 조건 충족 시 모달 표시
        showModal();
    }
}

// 이름 체크 trim() 좌우 공백 제거
function checkUsername() {
    const usernameValue = username.value.trim();
    if(usernameValue === '') {
        setErrorFor(username, '필수 입력 항목입니다!');
        return false;
    } else {
        setSuccessFor(username, "멋진 이름이네요!");
        return true;
    }
}

// 이메일 체크
function checkEmail() {
    const emailValue = email.value.trim();
    if (!isEmail(emailValue)) {
        setErrorFor(email, '올바른 이메일 형식이 아닙니다!');
        return false;
    } else {
        setSuccessFor(email, "올바른 이메일 형식입니다!");
        return true;
    }
}

// 나이 체크
function checkUserage() {
    const userageValue = userage.value.trim();
    if(userageValue <= 0) {
        setErrorFor(userage, '나이를 입력해주세요!');
        return false;
    } else {
        setSuccessFor(userage, "올바른 나이 형식입니다!");
        return true;
    }
}

// 비번 체크
function checkPassword() {
    const passwordValue = password.value.trim();
    if(passwordValue.length < 4) {
        setErrorFor(password, '비밀번호는 최소 4자리 이상이어야 합니다.');
        return false;
    } else if(passwordValue.length > 12) {
        setErrorFor(password, '비밀번호는 최대 12자리까지 가능합니다.');
        return false;
    } else if(!isPasswordLong(passwordValue)) {
        setErrorFor(password, '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.');
        return false;
    } else {
        setSuccessFor(password, '올바른 비밀번호입니다!');
        return true;
    }
}

// 비번 2차 체크
function checkPassword2() {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (password2Value === ''){
        setErrorFor(password2, '비밀번호를 입력해주세요.')
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, '비밀번호가 일치하지 않습니다.');
        return false;
    } else {
        setSuccessFor(password2, "비밀번호가 일치합니다.");
        return true;
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const errorLabel = formControl.querySelector('.inputerror');
    // 오류 메시지 설정
    errorLabel.innerText = message;
    // 오류 메세지 visible, css로도 가능
    errorLabel.style.display = 'inline';
    errorLabel.style.color = 'red';
    errorLabel.style.visibility = 'visible'; 
}

function setSuccessFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const errorLabel = formControl.querySelector('.inputerror');
    // 성공 메세지 설정
    errorLabel.innerText = message;
    // css로도 가능
    errorLabel.style.display = 'inline';
    errorLabel.style.color = 'green'; // 또는 CSS 클래스를 사용해 스타일을 적용할 수도 있습니다.
    errorLabel.style.visibility = 'visible'; 
}

function isEmail(email) {
    // 이메일을 확인하는 정규식
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

function isPasswordLong(password) {
    // 최소 4자, 12자이하, 최소 1문자, 1숫자, 1특수문자
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/;
    return regex.test(password);
}
