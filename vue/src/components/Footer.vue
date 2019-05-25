<template>
  <footer class="footer">
      <span class="todo-count"><strong>{{ activeTodoCount }}</strong> item left</span>
      <ul class="filters">
        <FilterLink :filter="noneFilter">All</FilterLink>
        <FilterLink :filter="activeFilter">Active</FilterLink>
        <FilterLink :filter="completedFilter">Completed</FilterLink>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed">Clear completed</button>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FooterPresenter, Injector, IFooterView, TodoFilterType } from '../../../app/src';
import FilterLink from './FilterLink.vue';

@Component({
  components: {
    FilterLink,
  }
})
export default class Footer extends Vue implements IFooterView {
  public activeTodoCount: number = 0;
  public noneFilter: TodoFilterType = 'none';
  public activeFilter: TodoFilterType = 'active';
  public completedFilter: TodoFilterType = 'completed';

  protected readonly presenter: FooterPresenter = Injector.resolve(FooterPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public setActiveTodoCount(count: number): void {
    this.activeTodoCount = count;
  }
}
</script>
