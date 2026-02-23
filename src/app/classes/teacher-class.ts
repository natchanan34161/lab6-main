export class TeacherClass{
    public teacherName: string | undefined;
    public teacherId: string | undefined;
    public department: string | undefined;
    public teacherPic: string | undefined;
}

export const teacherMockup: TeacherClass[] = [
    {teacherId: '001', teacherName: 'พงษกรณ์ กิตติเตชะคุณ', department: 'SE.', teacherPic: 'https://dummyimage.com/600x400/000000/fafafa&text=TC001'},
    {teacherId: '002', teacherName: 'พรพิมล ธนากานต์', department: 'SE.', teacherPic: 'https://dummyimage.com/600x400/000000/fafafa&text=TC002'},
    {teacherId: '003', teacherName: 'ญาตา อุดมวิทยา', department: 'SE.', teacherPic: 'https://dummyimage.com/600x400/000000/fafafa&text=TC003'},
    {teacherId: '004', teacherName: 'กานต์ กิตติภัทรา', department: 'SE.', teacherPic: 'https://dummyimage.com/600x400/000000/fafafa&text=TC004'},
    {teacherId: '005', teacherName: 'ธิติรัตน์ ธนสุนทรวงศ์', department: 'SE.', teacherPic: 'https://dummyimage.com/600x400/000000/fafafa&text=TC005'},
]