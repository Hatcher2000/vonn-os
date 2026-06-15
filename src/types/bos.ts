export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export interface Rock {
  id: string
  title: string        // what the rock is
  owner: string        // who owns it
  status: 'on-track' | 'off-track' | 'complete'  // three possible values only
  dueDate: string      // end of quarter date
  createdAt: Date
}