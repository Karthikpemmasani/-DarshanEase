const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const Temple = require('./models/Temple');
require('dotenv').config();

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/darshanease');
    const temples = await Temple.find();
    const dir = path.join(__dirname, '../client/public/images');
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    for (let i = 0; i < temples.length; i++) {
      const temple = temples[i];
      if (temple.image && temple.image.startsWith('http')) {
        const ext = path.extname(new URL(temple.image).pathname) || '.jpg';
        const filename = `temple_${temple._id}${ext}`;
        const dest = path.join(dir, filename);
        console.log(`Downloading image for ${temple.name}...`);
        
        try {
          await download(temple.image, dest);
          temple.image = `/images/${filename}`;
          await temple.save();
          console.log(`Successfully downloaded and updated ${temple.name}`);
        } catch (err) {
          console.error(`Failed to download image for ${temple.name}:`, err.message);
        }
      }
    }
    console.log('Finished updating temple images to local files!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
};

run();
