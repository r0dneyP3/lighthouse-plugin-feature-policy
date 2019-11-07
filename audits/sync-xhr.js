/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Audit = require('lighthouse').Audit;

/**
 * @fileoverview A fake additional check of the robots.txt file.
 */

// https://fetch.spec.whatwg.org/#concept-request-destination
const allowedTypes = new Set(['font', 'image', 'script', 'serviceworker', 'style', 'worker']);

class SyncXhrAudit extends Audit {
  static get meta() {
    return {
      id: 'sync-xhr',
      title: 'Does not use synchronous XHR, turn on feature policy to prevent regressions.',
      failureTitle: "Uses Synchronous XHR, consider turn on feature policy to detect at dev time.",
      description: "Synchronous XMLHttpRequest has detrimental effects to the end user's experience. Feature policy can be used to detect its presence and prevent future regressions. See [Introduction to Feature Policy](https://developers.google.com/web/updates/2018/06/feature-policy) and [sync-xhr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy/sync-xhr) for more information.",
      scoreDisplayMode: 'binary',
      // The name of the artifact provides input to this audit.
      requiredArtifacts: ['ConsoleMessages'],
    };
  }

  static audit(artifacts, context) {
    const messages = artifacts.ConsoleMessages;

    const syncXhrWarning = messages.filter(msg => {
      return msg.entry.text.startsWith('Synchronous XMLHttpRequest');
    })

    return {
      score: syncXhrWarning.length > 0 ? 0 : 1,
      displayValue: `Found ${syncXhrWarning.length} Synchronous XMLHttpRequest requests.`,
      details: {
        type: 'list',
        items: [{
          title: 'feature policy',
          lines:[
            {content: "Feature-Policy: sync-xhr 'none'", lineNumber:1},
          ],
          lineCount: 1,
          lineMessages: [],
          generalMessages: [{message: 'Turn on feature policy by adding this line to your response header.'}],
        }]
      }
    };
  }
}

module.exports = SyncXhrAudit;
