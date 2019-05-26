<template>
  <li :class="{ 'completed': isCompleted, 'editing': isEditing }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="isCompleted" v-on:click="onToggleCheckboxClicked()">
      <label v-on:dblclick="onDoubleClicked()">{{ todo.title }}</label>
      <button class="destroy" v-on:click="onRemoveButtonClicked()"></button>
    </div>
    <input class="edit" v-model="todoTitleInput" v-on:blur="onInputBlur(todoTitleInput)" v-on:keyup.enter="onInputBlur(todoTitleInput)" />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo, ITodoView } from '../../../app/src';
import { VueTodoMixin } from '../mixins';

@Component({
  mixins: [VueTodoMixin]
})
export default class TodoItem extends VueTodoMixin implements ITodoView {
  @Prop()
  public todo!: Todo;

  public isCompleted: boolean = false;
  public isEditing: boolean = false;
  public todoTitleInput: string = '';

  public created(): void {
    this.presenter.attach(this);
    this.todoTitleInput = this.todo.title;
  }

  public setEditMode(): void {
    this.isEditing = true;
  }

  public setViewMode(): void {
    this.isEditing = false;
  }

  public completeTodo(): void {
    this.isCompleted = true;
  }

  public activateTodo(): void {
    this.isCompleted = false;
  }
}
</script>
