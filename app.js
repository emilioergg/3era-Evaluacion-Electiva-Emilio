window.addEventListener('load', ()=> {
    const form = document.querySelector('#formulario')
    const usuario = document.getElementById('usuario')
    const nombre= document.getElementById('nombre')
    const Edad = document.getElementById('Edad')
    const Apellido = document.getElementById('Apellido')
    const Ubicacion = document.getElementById('Ubicacion')
    const email = document.getElementById('email')
    const pass = document.getElementById('pass')
    const passConfirma = document.getElementById('passConfirma')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validaCampos()
    })
    
    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        address: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        edad:  /^\d{1,2}$/, // 7 a 11 numeros.
        telefono: /^\d{11}$/, // 7 a 14 numeros.
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#+%*?&])[A-Za-z\d$@$#+!%*?&]{8,15}/, // 4 a 12 digitos.
    }
    
    const campos = {
        usuario: false,
        nombre: false,
        apellido: false,
        address: false,
        edad: false,
        password: false,
        correo: false,
        telefono: false
    }

    const validaCampos = ()=> {
        //capturar los valores ingresados por el usuario
        const usuarioValor = usuario.value.trim()
        const Nombre = Nombre.value.trim()
        const Edad = Edad.value.trim()
        const Apellido = Apellido.value.trim
        const emailValor = email.value.trim()
        const Ubicacion = Ubicacion.value.trim()
        const passValor = pass.value.trim()
        const passConfirmaValor = passConfirma.value.trim();
     
        //validando campo usuario
        //(!usuarioValor) ? console.log('CAMPO VACIO') : console.log(usuarioValor)
        if(!usuarioValor){
            //console.log('CAMPO VACIO')
            validaFalla(usuario, 'Campo vacío')
        }else{
            validaOk(usuario)
        }

        //validando campo email
        if(!emailValor){
            validaFalla(email, 'Campo vacío')            
        }else if(!validaEmail(emailValor)) {
            validaFalla(email, 'El e-mail no es válido')
        }else {
            validaOk(email)
        }
         //validando campo password
         const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/          
         if(!passValor) {
             validaFalla(pass, 'Campo vacío')
         } else if (passValor.length < 8) {             
             validaFalla(pass, 'Debe tener 8 caracteres cómo mínimo.')
         } else if (!passValor.match(er)) {
             validaFalla(pass, 'Debe tener al menos una may., una min. y un núm.')
         } else {
             validaOk(pass)
         }

         //validando campo password Confirmación
         if(!passConfirmaValor){
             validaFalla(passConfirma, 'Confirme su password')
         } else if(passValor !== passConfirmaValor) {
             validaFalla(passConfirma, 'La password no coincide')
         } else {
             validaOk(passConfirma)
         }


    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje

        formControl.className = 'form-control falla'
    }
    const validaOk = (input, msje) => {
        const formControl = input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);        
    }

    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }
})
