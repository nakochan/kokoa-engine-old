const fs = require('fs')
const sharp = require('sharp')
const { execFile } = require('child_process')
const giflossy = require('giflossy')

module.exports.createImage = type => async ctx => {
  const checker = /(.gif|.png|.jpg|.jpeg|.webp)/i.test(ctx.req.file.originalname)
  const checkerByGIF = /.gif/i.test(ctx.req.file.originalname)
  const filename = ctx.req.file.filename
  try {
    if (checker) {
      fs.readFile(`./img/${filename}`, (err, data) => {
        if (err) return ctx.body = { message: err, status: 'fail' }
        if (checkerByGIF) {
          execFile(giflossy, ['-O3', '--lossy=80', '-o', `./img/${filename}`, `./img/${filename}`], err => {
            if (err) return ctx.body = { message: err, status: 'fail' }
          })
        } else {
          const image = sharp(data)
          if (type === 'topic') {
            image.metadata()
              .then((metadata) => image.resize(Math.min(metadata.width, 960))
                .jpeg(80)
                .toBuffer()
              )
              .then(result => fs.writeFile(`./img/${filename}`, result, () => { }))
          } else {
            image.metadata()
              .then(() => image.resize(100, 100)
                .toBuffer()
              )
              .then(result => fs.writeFile(`./img/${filename}`, result, () => { }))
          }
        }
        if (type === 'topic') {
          const thumbnail = sharp(data)
          thumbnail.metadata()
            .then(() => thumbnail.resize(100, 100)
              .toBuffer()
            )
            .then(result => fs.writeFile(`./img/thumb/${filename}`, result, () => { }))
        }
      })
      ctx.body = { filename, status: 'ok' }
    } else {
      fs.unlink(`./img/${filename}`, () => { })
      ctx.body = { message: 'gif, png, jpg, jpeg, webp만 가능', status: 'fail' }
    }
  } catch (e) {
    ctx.body = { message: e.message, status: 'fail' }
  }
}