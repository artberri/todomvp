// tslint:disable:max-classes-per-file

import { Component, Vue } from 'vue-property-decorator';
import { HeaderMixin, FilterLinkMixin } from '../../app/src';

@Component
export class VueHeaderMixin extends HeaderMixin(Vue) {}

@Component
export class VueFilterLinkMixin extends FilterLinkMixin(Vue) {}
