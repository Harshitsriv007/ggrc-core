/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Directive from './directive';
import accessControlList from '../mixins/access-control-list';

export default Directive('CMS.Models.Regulation', {
  root_object: 'regulation',
  root_collection: 'regulations',
  model_plural: 'Regulations',
  table_plural: 'regulations',
  title_plural: 'Regulations',
  model_singular: 'Regulation',
  title_singular: 'Regulation',
  table_singular: 'regulation',
  findAll: 'GET /api/regulations',
  findOne: 'GET /api/regulations/{id}',
  create: 'POST /api/regulations',
  update: 'PUT /api/regulations/{id}',
  destroy: 'DELETE /api/regulations/{id}',
  is_custom_attributable: true,
  isRoleable: true,
  attributes: {},
  mixins: [accessControlList],
  sub_tree_view_options: {
    default_filter: ['Requirement'],
  },
  defaults: {
    status: 'Draft',
    kind: 'Regulation',
  },
  statuses: ['Draft', 'Deprecated', 'Active'],
  init: function () {
    Object.assign(this.attributes, Directive.attributes);
    this._super(...arguments);
  },
}, {});
