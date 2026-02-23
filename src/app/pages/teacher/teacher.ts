import { Component, OnInit } from '@angular/core';
import { TeacherClass, teacherMockup } from '../../classes/teacher-class';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher implements OnInit {
  teacher: TeacherClass = new TeacherClass();
  teachers: TeacherClass[] = [];

  isCardView: boolean = true;

  public viewCard(): void{
    this.isCardView = true;
  }

  public viewTable(): void{
    this.isCardView = false;
  }

  teacherForm!: FormGroup;

  isEdit: boolean = false;

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder) {
    // this.teacher.teacherID = '001';
    // this.teacher.teacherName = 'cha';
    // this.teacher.department = 'SE.';
    // this.teacher.teacherPicture = 'https://dummyimage.com/600x400/000000/fafafa&text=TC001';
    this.createFormControl();
  }
  ngOnInit(): void {
    // Get Data
    this.getData();
  }

  private getData(): void {
    this.teacherService.getAll().subscribe(res => {
      console.log(res);
      this.teachers = res.data;
    });
  }

  private createFormControl(): void {
    // set rule for varlidation
    this.teacherForm = this.formBuilder.group({
      teacherIdFormControl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      teacherNameFormControl: ['', [Validators.required, Validators.minLength(5)]],
      deparmentFormContorl: ['', Validators.required],
      teacherPictureFormControl: ['', Validators.required]
    });
  }

  public isInvalid(contorlName: string): boolean {
    const control = this.teacherForm.get(contorlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  create(): void {
    // const newTeacher: TeacherClass = new TeacherClass();
    // newTeacher.teacherID = teacherID;
    // newTeacher.teacherName = teacherName;
    // newTeacher.department = department;
    // newTeacher.teacherPicture = teacherPicture;
    // this.teachers.push(this.teacher);
    this.teacherService.add(this.teacher).subscribe({
      next: (res) => {
        if (res.status === 201) {
          alert('NEW Teacher Data Inserted.');
          this.getData();
          this.resetForm();
        } else {
          console.error('ERROR: can not insert');
        }
      }, 
      error: (err) => {
        console.error('ERROR', err.status);
      }
    })
    alert('NEW Teacher Data Inserted.');
    this.teacher = new TeacherClass();
  }

  public selectTeacher(selectedTeacher: TeacherClass): void {
    this.teacher = new TeacherClass();
    this.teacher = selectedTeacher;
    this.teacherForm.patchValue({
      teacherIdFormControl: this.teacher.teacherId,
      teacherNameFormControl: this.teacher.teacherName,
      deparmentFormContorl: this.teacher.department,
      teacherPictureFormControl: this.teacher.teacherPic
    });
    this.isEdit = true;
  }

  public delete(selectedTeacher: any): void {
    if (confirm('Delete ?')) {
    // // หา Index ของข้อมูลที่จะลบ
    // const deletedIndex = this.teachers.indexOf(selectedTeacher);
    // // ลบข้อมูลตาม Index
    // this.teachers.splice(deletedIndex, 1);
    this.teacherService.delete(selectedTeacher.teacherID).subscribe(res => {
      if (res.status === 200) {
        alert('Teacher Delete');
        this.getData();
      } else if (res.status === 404){
        alert(res.body.msg);
      } else {
        console.error('ERROR');
      }
      this.resetForm();
    });
    }
  }

  public onSubmit(): void {
    console.log(this.teacherForm.value);
    const teacherForm = this.teacherForm.value;
    this.teacher = new TeacherClass;
    this.teacher.teacherId = teacherForm.teacherIdFormControl;
    this.teacher.teacherName = teacherForm.teacherNameFormControl;
    this.teacher.department = teacherForm.deparmentFormContorl;
    this.teacher.teacherPic = teacherForm.teacherPictureFormControl;
    if (this.isEdit) {
      // update
      this.updateTeacher();
    } else {
      this.create();
    }
  }

  private updateTeacher(): void {
    this.teacherService.update(this.teacher).subscribe(res => {
      if (res.status === 200) {
        alert(res.body.msg);
        this.getData();
      } else {
        console.error('ERROR');
      }
    });
  }

  public resetForm(): void {
    this.teacher = new TeacherClass();
    this.teacherForm.reset();
  }

}
