module.exports = {
  images: {
    domains: ['image.tmdb.org', 'upload.wikimedia.org']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
};
