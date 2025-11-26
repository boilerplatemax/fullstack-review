const _ = require('lodash')

const totalLikes = (blogs)=>{
    return blogs.reduce((totalLikes,blog)=>{
        return totalLikes+=blog.likes
},0)
}

const totalBlogs = (blogs)=>{
    return blogs.length;
}

const favoriteBlog = (blogs)=>{
    return blogs.reduce((max, blog)=>{
        return blog.likes > max.likes ? blog:max
    })
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author'); // { Robert: 3, Michael: 1 }

  const [author, count] = _.maxBy(Object.entries(counts), ([, count]) => count);

  return { author, blogs: count };
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  console.log('GROUPED!', grouped);
  return blogs;
}


module.exports = {
    totalLikes, totalBlogs, favoriteBlog, mostBlogs, mostLikes
}