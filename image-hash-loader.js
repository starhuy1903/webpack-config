const loaderUtils = require('loader-utils');
const sharp = require('sharp');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// module.exports = function(content) {
//     const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
//     const queryString = `?v=${hash}`;

//     console.log(content);

//     const updatedContent = content.replace(/src=['"](.*?)['"]/gi, (match, path) => {
//         console.log(path);
//         if (path.startsWith('/images/')) {
//             console.log(`src='${path}${queryString}'`);
//           return `src='${path}${queryString}'`;
//         }
//         return match;
//     });

//     return updatedContent;
// }

// module.exports = function(source) {
//     const options = loaderUtils.getOptions(this) || {};
//     console.log(options);
//     console.log(this.resourcePath);
  
//     // Only process images
//     if (!/\.(jpe?g|png|gif|svg)$/i.test(this.resourcePath)) {
//       return source;
//     }
//     console.log(source);
  
//     const callback = this.async();
//     const image = sharp(source);
  
//     // Get the image's metadata
//     image.metadata()
//       .then(metadata => {
//         // Generate an MD5 hash based on the image's contents
//         image
//           .raw()
//           .toBuffer()
//           .then(buffer => {
//             const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 8);
//             const url = loaderUtils.interpolateName(this, options.name || '[path][name]/[ext]', {
//               content: buffer
//             });
  
//             // Add the hash to the URL
//             const newUrl = `${url}?v=${hash}`;
//             console.log(newUrl);
  
//             // Return the updated source code
//             callback(null, source.replace(url, newUrl));
//           })
//           .catch(callback);
//       })
//       .catch(callback);
//   };

// module.exports = function(content) {
//     const regex = /<img\s+(?:[^>]*?\s+)?src=(["'])(.*?)\1/gi;
  
//     let match;
//     while ((match = regex.exec(content))) {
//       const imagePath = match[2];
//       console.log(imagePath);
//       if (!imagePath.startsWith('/') || imagePath.startsWith('//')) {
//         continue; // skip external URLs and paths that are not relative to the project root
//       }
  
//       const imagePathWithoutQuery = imagePath.split('?')[0];
//       console.log("imagePathWithoutQuery", imagePath);
//       const imagePathAbsolute = path.resolve(process.cwd(), 'public', imagePathWithoutQuery);
//       console.log("imagePathAbsolute", imagePathAbsolute);
//       const imageContent = fs.readFileSync(imagePathAbsolute);
//       const hash = loaderUtils.interpolateName(this, '[hash:8]', { content: imageContent });
  
//       const imagePathWithHash = `${imagePathWithoutQuery}?v=${hash}`;
//       content = content.replace(imagePath, imagePathWithHash);
//     }
  
//     return content;
//   };

module.exports = function(source) {
    const options = loaderUtils.getOptions(this) || {};
    const { publicPath } = options;
    console.log(publicPath);
  
    const hash = crypto.createHash('md5').update(source).digest('hex').substr(0, 8);
  
    const url = `${publicPath}${this.resourcePath}?v=${hash}`;
    console.log(url);
  
    return `module.exports = "${url}"`;
  };