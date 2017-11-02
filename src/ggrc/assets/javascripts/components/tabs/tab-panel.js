/*!
 Copyright (C) 2017 Google Inc., authors, and contributors
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './tab-panel.mustache';

const PRE_RENDER_DELAY = 3000;

export default GGRC.Components('tabPanel', {
  tag: 'tab-panel',
  template: template,
  viewModel: {
    define: {
      cssClasses: {
        type: 'string',
        get: function () {
          return this.attr('active') ? 'active' : 'hidden';
        },
      },
      cacheContent: {
        type: 'boolean',
        value: false,
      },
      preRenderContent: {
        type: 'boolean',
        value: false,
      },
      isLazyRender: {
        type: 'boolean',
        get: function () {
          return this.attr('cacheContent') || this.attr('preRenderContent');
        },
      },
      lazyTrigger: {
        type: 'boolean',
        get: function () {
          return this.attr('active') || this.attr('preRender');
        },
      },
    },
    active: false,
    titleText: '@',
    panels: [],
    tabIndex: null,
    addPanel: function () {
      var panels = this.attr('panels');
      var isAlreadyAdded = panels.indexOf(this) > -1;
      if (isAlreadyAdded) {
        return;
      }
      this.attr('tabIndex', panels.length + 1);
      panels.push(this);
      panels.dispatch('panelAdded');
    },
    removePanel: function () {
      var itemTabIndex = this.attr('tabIndex');
      var panels = this.attr('panels');
      var indexToRemove;

      panels.each(function (panel, index) {
        if (panel.attr('tabIndex') === itemTabIndex) {
          indexToRemove = index;
          return false;
        }
      });
      if (indexToRemove > -1) {
        panels.splice(indexToRemove, 1);
        panels.dispatch('panelRemoved');
      }
    }
  },
  events: {
    /**
     * On Components rendering finished add this viewModel to `panels` list
     */
    inserted: function () {
      let vm = this.viewModel;
      vm.addPanel();

      if (vm.attr('preRenderContent')) {
        setTimeout(() => vm.attr('preRender', true), PRE_RENDER_DELAY);
      }
    },
    removed: function () {
      this.viewModel.removePanel();
    },
  },
});