import { Component, Input, OnInit } from '@angular/core';
import { student } from 'src/app/models/student';
import { TestSevicesService } from 'src/app/services/test-sevices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';




@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit   {

  

  
  studentList= new Array<student>()
  @Input() id: string 
  @Input() dni: string
  @Input() lastName: string
  @Input() firstName :string
  @Input() email: string 

  @Input() id2: number
  @Input() dni2: string
  @Input() lastName2: string
  @Input() firstName2: string
  @Input() email2: string

  student = new student()
  studentForm : FormGroup  

  constructor(private testService: TestSevicesService, private modalService: NgbModal) {}

ngOnInit(): void {
this.getAll()
  }

  getAll() {
    this.testService.getAll().subscribe(
      (response: Array<student>)  => {
        this.studentList = response;
        this.clearInputs();
      },
      (error) => {
        console.error(error);
        alert('el getAll funciono');
      }
    );
  }

  saveStudent() {
    const newStudent: student = {
      id: 0,
      dni: this.dni,
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      cohort: 0, 
      status: 'Activo', 
      gender: 'Masculino', 
      address: '', 
      phone: '' 

    };

    this.testService.save(newStudent).subscribe(
      () => {
        this.getAll();
      }, error => {
        console.error(error);
        alert('Estudiante creado correctamente');
      }
    );
  }

  clearInputs() {
    this.dni = '';
    this.lastName = '';
    this.firstName='';
    this.email='';

    document.getElementsByTagName('input')[0].focus();

  }




  updateStudent(studentToUpdate: student) {

    const updatedStudent: student = {
      id: studentToUpdate.id,
      dni: this.dni,
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      cohort: 0,
      status: '',
      gender: '',
      address: '',
      phone: ''
    };
  
    this.testService.updateStudent(studentToUpdate.id, updatedStudent).subscribe(
      () => {
        this.getAll();
       
      }, error => {
        console.error(error);
        alert('Estudiante modificado correctamente');
      }
    );
  }

deleteStudent(studentToDelete: student) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar a este estudiante?');
  if (confirmDelete) {
    this.testService.deleteStudent(studentToDelete.id, studentToDelete).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.error(error);
        alert('Estudiante eliminado correctamente');
      }
    );
  }
}

  
  
  

 viewStudent(ver: any, s: student) {
    this.id2 = s.id;
    this.dni2 = s.dni;
    this.lastName2 = s.lastName;
    this.firstName2 = s.firstName;
    this.email2 = s.email;

    this.modalService.open(ver).result.then((result) => {
      if (result === 'save') { // Puedes ajustar el valor según tu lógica
        const updatedStudent: student = {
          id: this.id2,
          dni: this.dni2,
          lastName: this.lastName2,
          firstName: this.firstName2,
          email: this.email2,
          cohort: 0, // Ajusta los valores según tus necesidades
          status: 'activo',
          gender: 'masculino',
          address: 'abc123',
          phone: '000'
        };

        this.testService.edit(updatedStudent).subscribe(
          () => {
            location.reload();
          },
          (error: { error: { message: string; }; }) => {
            console.error(error);
            alert('Error: ' + error.error.message);
          }
        );
      }
    });
  } 

  editStudent(studentToEdit: student) {
    // Asigna los valores del estudiante seleccionado a las propiedades correspondientes
    this.id = studentToEdit.id.toString();
    this.dni = studentToEdit.dni;
    this.firstName = studentToEdit.firstName;
    this.lastName = studentToEdit.lastName;
    this.email = studentToEdit.email;
  }

}














