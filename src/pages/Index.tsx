import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Student {
  id: number;
  name: string;
  score: number;
  rank: number;
  avatar: string;
  achievements: string[];
  subjects: { name: string; score: number }[];
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    score: 3850,
    rank: 1,
    avatar: '👩‍🎓',
    achievements: ['Отличница', 'Лидер года', 'Золотая медаль'],
    subjects: [
      { name: 'Математика', score: 98 },
      { name: 'Физика', score: 95 },
      { name: 'Информатика', score: 100 }
    ]
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    score: 3720,
    rank: 2,
    avatar: '👨‍🎓',
    achievements: ['Призёр олимпиады', 'Спортсмен'],
    subjects: [
      { name: 'Математика', score: 92 },
      { name: 'Физика', score: 96 },
      { name: 'Информатика', score: 94 }
    ]
  },
  {
    id: 3,
    name: 'Мария Иванова',
    score: 3680,
    rank: 3,
    avatar: '👧',
    achievements: ['Активист', 'Творческая личность'],
    subjects: [
      { name: 'Литература', score: 99 },
      { name: 'История', score: 95 },
      { name: 'Английский', score: 97 }
    ]
  },
  {
    id: 4,
    name: 'Александр Козлов',
    score: 3550,
    rank: 4,
    avatar: '👦',
    achievements: ['Исследователь'],
    subjects: [
      { name: 'Химия', score: 91 },
      { name: 'Биология', score: 93 },
      { name: 'Математика', score: 88 }
    ]
  },
  {
    id: 5,
    name: 'София Новикова',
    score: 3490,
    rank: 5,
    avatar: '👩',
    achievements: ['Участник конференций'],
    subjects: [
      { name: 'География', score: 90 },
      { name: 'История', score: 92 },
      { name: 'Обществознание', score: 89 }
    ]
  }
];

const Index = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('rankings');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-2">
            Рейтинг Школьников
          </h1>
          <p className="text-muted-foreground text-lg">
            Топ учеников по успеваемости и достижениям
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="rankings" className="gap-2">
              <Icon name="TrendingUp" size={18} />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="profiles" className="gap-2">
              <Icon name="Users" size={18} />
              Профили
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Icon name="Award" size={18} />
              Достижения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-4 animate-fade-in">
            <div className="grid gap-4">
              {mockStudents.map((student, index) => (
                <Card
                  key={student.id}
                  className="hover:shadow-lg transition-all duration-300 animate-scale-in cursor-pointer border-2 hover:border-primary"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedStudent(student)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="text-5xl">{student.avatar}</div>
                          {student.rank <= 3 && (
                            <div className="absolute -top-2 -right-2">
                              <Icon
                                name={student.rank === 1 ? 'Trophy' : 'Medal'}
                                size={24}
                                className={
                                  student.rank === 1
                                    ? 'text-gold'
                                    : student.rank === 2
                                    ? 'text-slate-400'
                                    : 'text-amber-700'
                                }
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{student.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-sm">
                              Рейтинг: #{student.rank}
                            </Badge>
                            <Badge className="bg-primary text-primary-foreground">
                              {student.score} баллов
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Icon name="Eye" size={18} />
                        Профиль
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profiles" className="animate-fade-in">
            {selectedStudent ? (
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{selectedStudent.avatar}</div>
                    <div>
                      <CardTitle className="text-3xl">{selectedStudent.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-primary">#{selectedStudent.rank}</Badge>
                        <Badge variant="outline">{selectedStudent.score} баллов</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <Icon name="Award" size={20} />
                      Достижения
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.achievements.map((achievement, idx) => (
                        <Badge key={idx} className="bg-success text-white">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <Icon name="BookOpen" size={20} />
                      Успеваемость по предметам
                    </h4>
                    <div className="space-y-3">
                      {selectedStudent.subjects.map((subject, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{subject.name}</span>
                            <span className="text-muted-foreground">{subject.score}%</span>
                          </div>
                          <Progress value={subject.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Icon name="UserCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg">
                  Выберите ученика из рейтинга, чтобы увидеть подробный профиль
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={24} className="text-gold" />
                    Лучшие достижения
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockStudents.slice(0, 3).map((student, idx) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{student.avatar}</div>
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.achievements[0]}
                          </p>
                        </div>
                      </div>
                      <Icon
                        name="Star"
                        size={24}
                        className={
                          idx === 0 ? 'text-gold' : idx === 1 ? 'text-slate-400' : 'text-amber-700'
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                    Общая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Средний балл</span>
                      <span className="text-muted-foreground">3658</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Всего учеников</span>
                      <span className="text-muted-foreground">5</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Активность</span>
                      <span className="text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
