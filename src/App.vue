<script setup lang="ts">
import { ref, computed } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";
import type { Task, TaskFilter } from "./types.ts";

const message = ref("Tasks App");
const tasks = ref<Task[]>([]);
const filter = ref<TaskFilter>("all");

const totalDone = computed(() =>
  tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)
);

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "all":
      return tasks.value;
    case "done":
      return tasks.value.filter((task) => task.done);
    case "todo":
      return tasks.value.filter((task) => !task.done);
  }
  return tasks.value;
});
function handleAddTask(newTask: string) {
  tasks.value.push({
    id: tasks.value.length + 1,
    title: newTask,
    done: false,
  });
}
function handleToggleDone(id: string) {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
}
function handleRemoveTask(id: string) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}
function handleFilter(value: TaskFilter) {
  filter.value = value;
}
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @addTask="handleAddTask" />
    <h3 v-if="!tasks.length">Add Task to get started.</h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks completed.</h3>
    <div v-if="tasks.length" class="button-container">
      <FilterButton filter="all" @setFilter="handleFilter" />
      <FilterButton filter="todo" @setFilter="handleFilter" />
      <FilterButton filter="done" @setFilter="handleFilter" />
    </div>
    <TaskList
      :tasksLists="filteredTasks"
      @toggleDone="handleToggleDone"
      @removeTask="handleRemoveTask"
    />
  </main>
</template>

<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}
.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
