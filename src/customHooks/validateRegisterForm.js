export default function validateRegisterForm(email,password1,password2){
    const badPass = '12345678'
    if(email.substring(email.length - 4,email.length) !== '.com'){
        return 'Enter a valid email address eg: email@example.com'
    }
    if(password1 !== password2){
        return "The passwords don't match"
    }
    if(password1.length < 8){
        return 'The password is too short'
    }
    if(password1 === badPass){
        return 'The password is too easy'
    }
    return true
}