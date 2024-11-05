// Класс Task
class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    // Пометить задачу как выполненную
    markAsCompleted() {
        this.completed = true;
    }

    // Вернуть информацию о задаче в виде объекта
    toJSON() {
        return {
            title: this.title,
            completed: this.completed
        };
    }
}

// Класс TaskList
class TaskList {
    constructor() {
        this.tasks = [];
    }

    // Добавить задачу
    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
    }

    // Удалить задачу по индексу
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            console.log("Некорректный индекс задачи");
        }
    }

    // Отобразить все задачи
    displayTasks() {
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title} - ${task.completed ? 'Выполнена' : 'Не выполнена'}`);
        });
    }

    // Отобразить выполненные задачи
    displayCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title}`);
        });
    }

    // Пометить задачу как выполненную по индексу
    markTaskAsCompleted(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].markAsCompleted();
        } else {
            console.log("Некорректный индекс задачи");
        }
    }

    // Сохранение списка задач в файл (как JSON-строка)
    saveToFile() {
        const jsonData = JSON.stringify(this.tasks.map(task => task.toJSON()));
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = "tasks.json";
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Загрузка списка задач из файла
    loadFromFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const jsonData = JSON.parse(event.target.result);
            this.tasks = jsonData.map(taskData => {
                const task = new Task(taskData.title);
                task.completed = taskData.completed;
                return task;
            });
        };
        reader.readAsText(file);
    }
}

// Пример использования
const taskList = new TaskList();
taskList.addTask("Задача 1");
taskList.addTask("Задача 2");

console.log("Все задачи:");
taskList.displayTasks();

taskList.markTaskAsCompleted(0);

console.log("Выполненные задачи:");
taskList.displayCompletedTasks();

// Сохранение и загрузка
// taskList.saveToFile();
// Для загрузки нужно передать файл, например, taskList.loadFromFile(file);
