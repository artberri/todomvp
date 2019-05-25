<template>
  <li :class="{ 'completed': isCompleted }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="isCompleted">
      <label>{{ todo.title }}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '../../../app/src';

@Component
export default class TodoItem extends Vue {
  @Prop()
  public todo!: Todo;

  public get isCompleted(): boolean {
    return this.todo.isCompleted;
  }
}
</script>
