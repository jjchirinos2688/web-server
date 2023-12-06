const userModelValidator = (usuario) => {

    const {nombre, email} = usuario

    if(typeof nombre !== "string"){
        
        throw 'El campo nombre debe ser un string válido!';
    }
    if(typeof email !== "string" || !validateEmail(email)){
        
        throw 'El campo email debe ser un email válido!';
    }
}



const validateEmail = (email) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (!email.match(validRegex)) {
  
      return false;
    } 

    return true  
  }

module.exports = {
    userModelValidator
}