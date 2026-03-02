import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StudentClass, studentMockup } from '../../classes/student-class'
import { StudentService } from '../../services/student-service'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  student: StudentClass = new StudentClass()
  students: StudentClass[] = []

  isCardView: boolean = true

  public viewCard(): void{
    this.isCardView = true
  }

  public viewTable(): void{
    this.isCardView = false
  }

  studentForm!: FormGroup

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
    // this.student.studentID = '001'
    // this.student.studentName = 'cha'
    // this.student.department = 'SE.'
    // this.student.studentPicture = 'https://dummyimage.com/600x400/000000/fafafa&text=TC001'
    this.createFormControl()
  }

  ngOnInit(): void {
    // Get Data
    this.studentService.getAll().subscribe(res => {
      console.log(res)
      this.students = res
    })
  }

  private createFormControl(): void {
    // set rule for varlidation
    this.studentForm = this.formBuilder.group({
      studentIdFormControl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      studentNameFormControl: ['', [Validators.required, Validators.minLength(5)]],
      departmentFormControl: ['', Validators.required], 
      studentPictureFormControl: ['', Validators.required]
    })
  }

  public isInvalid(contorlName: string): boolean {
    const control = this.studentForm.get(contorlName)
    return !!(control && control.invalid && (control.dirty || control.touched))
  }

  create(): void {
    this.students.push(this.student)
    alert('NEW student Data Inserted.')
    this.student = new StudentClass()
  }

  public selectStudent(selectedStudent: StudentClass): void {
    this.student = selectedStudent
  }

  public delete(selectedStudent: any): void {
    if (confirm('Delete ?')) {
      const deletedIndex = this.students.indexOf(selectedStudent)
      this.students.splice(deletedIndex, 1)
      alert('Student Delete')
    }
  }

  public onSubmit(): void {
      console.log(this.studentForm.value)
      const studentForm = this.studentForm.value
      this.student = new StudentClass
      this.student.studentID = studentForm.studentIdFormControl
      this.student.studentName = studentForm.studentNameFormControl
      this.student.department = studentForm.departmentFormControl
      this.student.studentPicture = studentForm.studentPictureFormControl
      this.create()
    }

}
