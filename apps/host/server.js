const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const template = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf8');

const videos = {
  '1': {
    title: 'First Video',
    description: 'An awesome first video.',
    thumbnail: 'https://placehold.co/600x400?text=Video+1',
    url: 'https://example.com/videos/1',
    uploadDate: '2023-01-01'
  }
};

const profiles = {
  'alice': {
    name: 'Alice',
    description: 'Profile for Alice.',
    avatar: 'https://placehold.co/300x300?text=Alice',
    url: 'https://example.com/profile/alice'
  }
};

function renderPage(title, metaTags) {
  const metaString = metaTags.join('\n    ');
  return template.replace('<title>Host App</title>', `<title>${title}</title>\n    ${metaString}`);
}

app.get('/video/:id', (req, res) => {
  const video = videos[req.params.id];
  if (!video) return res.status(404).send('Video not found');
  const metaTags = [
    `<meta name="description" content="${video.description}">`,
    `<meta property="og:type" content="video.other">`,
    `<meta property="og:title" content="${video.title}">`,
    `<meta property="og:description" content="${video.description}">`,
    `<meta property="og:image" content="${video.thumbnail}">`,
    `<meta property="og:url" content="${video.url}">`,
    `<meta name="twitter:card" content="player">`,
    `<meta name="twitter:title" content="${video.title}">`,
    `<meta name="twitter:description" content="${video.description}">`,
    `<meta name="twitter:image" content="${video.thumbnail}">`,
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      uploadDate: video.uploadDate,
      contentUrl: video.url,
      embedUrl: video.url
    })}</script>`
  ];
  res.send(renderPage(video.title, metaTags));
});

app.get('/profile/:id', (req, res) => {
  const profile = profiles[req.params.id];
  if (!profile) return res.status(404).send('Profile not found');
  const metaTags = [
    `<meta name="description" content="${profile.description}">`,
    `<meta property="og:type" content="profile">`,
    `<meta property="og:title" content="${profile.name}">`,
    `<meta property="og:description" content="${profile.description}">`,
    `<meta property="og:image" content="${profile.avatar}">`,
    `<meta property="og:url" content="${profile.url}">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${profile.name}">`,
    `<meta name="twitter:description" content="${profile.description}">`,
    `<meta name="twitter:image" content="${profile.avatar}">`
  ];
  res.send(renderPage(profile.name, metaTags));
});

app.get('*', (_req, res) => {
  res.send(renderPage('Short Video', []));
});

app.listen(port, () => {
  console.log(`SSR server running on http://localhost:${port}`);
});
