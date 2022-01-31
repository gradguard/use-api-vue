const getPosts = (total = 10) => {
  const posts = [];
  for (let i = 0; i < total; i += 1) {
    posts.push({
      id: i,
      title: `Title ${i}`,
    });
  }
  return posts;
};

module.exports = getPosts;
