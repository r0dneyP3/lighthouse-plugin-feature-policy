/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/** @type {LH.Config.Plugin} */
module.exports = {
  // Additional audit to run on information Lighthouse gathered.
  audits: [{
    path: 'lighthouse-plugin-feature-policy/audits/sync-xhr.js',
  },{
    path: 'lighthouse-plugin-feature-policy/audits/unoptimized-images.js',
  }],

  // A new category in the report for the new audit's output.
  category: {
    title: 'Feature Policy Best practices',
    description: 'Best practices Scores',
    auditRefs: [
      {id: 'sync-xhr', weight: 1},
      {id: 'unoptimized-images', weight: 1},
    ],
  },
};
