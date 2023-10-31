# A replication of Integrify Meme generator
[Original work Github is here](https://github.com/Integrify-Finland/youtube-meme-generator-ts.git), [Youtube tutorial is here](https://www.youtube.com/watch?v=coAUyL8ezSE).

It is a simple meme generator using [memegen open api](https://api.memegen.link/docs) and React. The tutotial uses Typescript, I use Javascript.

## Some small differences I made

- Every time the browser will only load 10 templates, after user click "load more" button, it will show 10 more. So it improved the performance.
- In the modal, click the image can download the image to local device directly. Also added a tooltip to tell users this function. Due to the cross-origin pilicy, I made a local blob to acheive it.
