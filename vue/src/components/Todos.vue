<template>
  <ul class="todo-list">
    <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
    <TodoItem v-for="(todo, index) in todos" v-bind:key="index" :todo="todo"></TodoItem>
    <!--<li class="completed">
      <div class="view">
        <input class="toggle" type="checkbox" checked>
        <label>Taste JavaScript</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
    </li>
    <li>
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>Buy a unicorn</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Rule the web">
    </li>-->
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TodosPresenter, Injector, ITodosView, Todo } from '../../../app/src';
import TodoItem from './TodoItem.vue';

@Component({
  components: {
    TodoItem,
  }
})
export default class Todos extends Vue implements ITodosView {
  public todos: Todo[] = [];

  protected readonly presenter: TodosPresenter = Injector.resolve(TodosPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public setTodos(todos: Todo[]): void {
    this.todos = todos;
  }
}
</script>
