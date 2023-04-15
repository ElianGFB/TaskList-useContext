import { Task, useTaskContext } from '../../../context/TaskContext';
import React from 'react';

const SideBar = () => {
	const {tasks, updateTask, setSelectedTask} = useTaskContext();

	const handleTaskClick = (id: number, checked: boolean) => {
		setSelectedTask(id, checked);
	};
	return (
		<div className="dark:text-white text-black">
			<aside id="sidebar" className="fixed top-0 left-0 w-64 h-full bg-gray-100" aria-label="Sidenav">
				<div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<ul className="space-y-2 gap-2">
						{tasks.map((task) => (
							<li key={task.id}>
								<div
									className="flex items-center bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
									onClick={(e) => handleTaskClick(task.id, false)}
								>
									<span className="flex-1">{task.name}</span>
									<div className={`w-5 h-5 rounded-full ${task.completed ? 'bg-green-600' : 'bg-red-600'}`}></div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default SideBar;