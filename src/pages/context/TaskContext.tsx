import {createContext, useContext, useState} from 'react';

export interface Task {
	id: number;
	name: string;
	completed: boolean;
}

interface TaskContextType {
	tasks: Task[];
	selectedTask: Task;
	updateTask: (id: number, completed: boolean) => void;
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setSelectedTask: (id: number, completed: boolean) => void;
}

const defaultTasks: Task[] = [
	{id: 1, name: 'Comprar leche', completed: false},
	{id: 2, name: 'Sacar al perro', completed: true},
	{id: 3, name: 'Hacer la cama', completed: false},
	{id: 4, name: 'Hacer ejercicio', completed: true},
	{id: 5, name: 'Cocinar cena', completed: false},
	{id: 6, name: 'Limpiar la casa', completed: false},
	{id: 7, name: 'Ir al supermercado', completed: true},
	{id: 8, name: 'Llamar al dentista', completed: false},
	{id: 9, name: 'Estudiar para el examen', completed: false},
];

const TaskContext = createContext<TaskContextType>({
	tasks: defaultTasks,
	selectedTask: {id: 0, name: '', completed: false},
	updateTask: () => {},
	setTasks: () => {},
	setSelectedTask: () => {},
});

export interface CustomContextProviderProps {
	children: JSX.Element | JSX.Element[];
}

const TaskContextProvider: React.FC<CustomContextProviderProps> = ({children}) => {
	const [tasks, setTasks] = useState<Task[]>(defaultTasks);
	const [selectedTask, setSelectedTasks] = useState<Task>({id: 0, name: '', completed: false});

	const updateTask = (id: number, completed: boolean) => {
		const newTasks = tasks.map((task) => (task.id === id ? {...task, completed} : task));
		setTasks(newTasks);
	};

	const setSelectedTask = (id: number, completed: boolean) => {
			const changedTask = tasks.filter((task) => task.id === id)[0];
			setSelectedTasks(changedTask);
	};
	/*
	const setSelectedTask = (id: number) => {
		if (id === 0) {
			setSelectedTasks({id: 0, name: '', completed: false});
		} else {
			const changedTask = tasks.filter((task) => task.id === id)[0];
			setSelectedTasks(changedTask);
		}
	};
	*/

	return (
		<TaskContext.Provider value={{tasks, updateTask, setTasks, selectedTask, setSelectedTask}}>
			{children}
		</TaskContext.Provider>
	);
};

const useTaskContext = () => useContext(TaskContext);

export {TaskContextProvider, useTaskContext};