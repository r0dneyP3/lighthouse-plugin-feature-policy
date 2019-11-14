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

const roundUp = (decimal) => {
  return Math.ceil(decimal * 100) / 100;
};

class UnoptimizedImage extends Audit {
  static get meta() {
    return {
      id: 'unoptimized-images',
      title: 'Use feature policy to check for unoptimized images during development.',
      failureTitle: 'Use feature policy to check for unoptimized images during development.',
      description: "Turn on feature policy for unoptimized-images to ensure your site is using the best performing images. See [Image policies for fast load times and more](https://web.dev/image-policies/?hl=en).",
      scoreDisplayMode: 'numeric',
      // The name of the artifact provides input to this audit.
      requiredArtifacts: ['OptimizedImages', 'ImageElements'],
    };
  }

  static audit(artifacts, context) {
    const images = artifacts.OptimizedImages;
    const imageElements = artifacts.ImageElements;
    const headers = images.map((image)=>{
      const element = imageElements.find((e)=> (e.src === image.url));
      // Calculate byte-per-pixel ratio using lighthouse's guidance on jpeg size and webp size
      const lossyBppRatio = (image.jpegSize - 1024) / (element.naturalHeight * element.naturalWidth);
      const losslessBppRatio = (image.jpegSize - 10240) / (element.naturalHeight * element.naturalWidth);
      return {
        url: image.url,
        lossyPolicyHeader: `unoptimized-lossy-images *(${roundUp(lossyBppRatio)});`,
        losslessPolicyHeader: `unoptimized-lossless-images *(${roundUp(losslessBppRatio)});`,
      }
    });

    return {
      score: imageElements.length === 0 ? 1 : 1 - (images.length / imageElements.length),
      displayValue: `Found ${images.length} unoptimized images that can be caught during development if you use the recommended feature policy headers`,
      details: {
        type: 'table',
        headings: [{
          key: 'url',
          text: 'image URL',
          itemType: 'url',
        },{
          key: 'lossyPolicyHeader',
          text: 'Recommended Feature Policy header for lossy compression',
          itemType: 'text',
        },{
          key: 'losslessPolicyHeader',
          text: 'Recommended Feature Policy header for lossless compression',
          itemType: 'text',
        }],
        items: headers,
      }
    };
  }
}

module.exports = UnoptimizedImage;
