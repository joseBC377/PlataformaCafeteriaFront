import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credenciales } from '../../features/auth/models/credenciales';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AdminServices } from '../../admin/services/admin.services';
import { Rol } from '../../features/auth/models/rol';
import { UsuarioModel } from '../../features/auth/models/usuario';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 toggled = false;
  showSignIn() {
    this.toggled = false;
  }
  showSignUp() {
    this.toggled = true;
  }
  //fomrulario login con guards
  private fb= inject(FormBuilder);
  private service= inject(AuthService);
  public mensajeRegistro =signal<String| null>(null);
  private credenciales: Credenciales ={
    email: '', password:''
  }
  public errorMsg= signal<string|null>(null);
  public loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password')
  }
  /*formulario fin */
  loginFn(){
    //sino cumple validacion se sale
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    //refrescar mensajes de error
    this.errorMsg.set(null);
    //captura datos
    this.credenciales.email= this.loginForm.value.email;
    this.credenciales.password=this.loginForm.value.password;
    console.log(this.credenciales)
    //proceso de login
    this.service.iniciarSesion(this.credenciales).subscribe({
      next:(res)=>{
        console.log("Tokens: ",res.access_token,res.refresh_token)
      },
      error:(e)=>{
        this.errorMsg.set('Credenciales erróneas');
        console.warn(e.message);
      }
    })
  }
  //formulario registro
  private serv= inject(AdminServices);
  public registrForm: FormGroup= this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]*$/)]],
    apellido:['',[Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z]*$/)]],
    telefono:['',[Validators.required, Validators.pattern(/^\d{9}$/)]],
    correo:['',[Validators.required, Validators.email]],
    contrasena:['',[Validators.required, Validators.minLength(8)]],
    rol:['CLIENTE',Validators.required]
  })
  //getters and setters
  get nombre():AbstractControl|null{
    return this.registrForm.get('nombre');
  }
  get apellido():AbstractControl|null{
    return this.registrForm.get('apellido');
  }
  get telefono():AbstractControl| null{
    return this.registrForm.get('telefono');
  }
  get correoRegistro():AbstractControl|null{
    return this.registrForm.get('correo');
  }
  get passwordRegistro():AbstractControl|null{
    return this.registrForm.get('contrasena');
  }
  get rol(){
    return this.registrForm.get('rol');
  }
  //creacion del metodo
  registroFn(){
    if (this.registrForm.invalid) {
      this.registrForm.markAllAsTouched();
      console.log('formulario de registro invalido revice campos')
      return;
    }
    const datos:UsuarioModel= this.registrForm.value;
    //operación de servicio
    this.serv.postInsertIdUser(datos).subscribe({
      next:(res)=>{
        this.mensajeRegistro.set('Usuario registrado exitosamente');
        this.registrForm.reset();//tambien quiero mandarlo a inicio

      }, error:(err)=>{
        this.mensajeRegistro.set('Hubo un error al registrar el usuario');
        console.error(err);
      }
    });
  }

}

