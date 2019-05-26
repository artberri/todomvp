// tslint:disable:max-classes-per-file

import { Component, Vue } from 'vue-property-decorator';
import { HeaderMixin, FilterLinkMixin, FooterMixin, CompleteAllMixin, TodoMixin } from '../../app/src';

@Component
export class VueCompleteAllMixin extends CompleteAllMixin(Vue) {}

@Component
export class VueHeaderMixin extends HeaderMixin(Vue) {}

@Component
export class VueFilterLinkMixin extends FilterLinkMixin(Vue) {}

@Component
export class VueFooterMixin extends FooterMixin(Vue) {}

@Component
export class VueTodoMixin extends TodoMixin(Vue) {}
