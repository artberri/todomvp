<template>
  <ul class="todo-list">
    <TodoItem v-for="todo in todos" v-bind:key="todo.id" :todo="todo"></TodoItem>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TodosPresenter, Injector, ITodosView, Todo, TodoFilterType } from '../../../app/src';
import TodoItem from './TodoItem.vue';

@Component({
  components: {
    TodoItem,
  }
})
export default class Todos extends Vue implements ITodosView {
  public todos: Todo[] = [];

  @Prop()
  public filter!: TodoFilterType;

  protected readonly presenter: TodosPresenter = Injector.resolve(TodosPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public setTodos(todos: Todo[]): void {
    this.todos = todos;
  }
}
</script>
