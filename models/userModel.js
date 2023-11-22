const usuarios = [

    {nombre: 'Julio Tepille', email:'julio.chirinos@tepille.cl', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKyZnjcwQtKCh_Nq76RCPSX0X2TZngyVcGXe1V7TyHHLQ=s96-c'},
    {nombre: 'Julio Chirinos', email:'juliochirinosacurero@gmail.com', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKyZnjcwQtKCh_Nq76RCPSX0X2TZngyVcGXe1V7TyHHLQ=s96-c'},

]



const findOneUser = (email) =>{

    const indice = usuarios.findIndex( u => u.email == email)

    if(indice == -1){
        return false
    }
    return usuarios[indice]

}


module.exports= {
    findOneUser
}