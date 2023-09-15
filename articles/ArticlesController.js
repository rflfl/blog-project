const express = require('express')
const router = express.Router()
const Articles = require('./Article')
const Category = require('../categories/Category')

const slugify = require('slugify')
const Article = require('./Article')

router.get('/admin/articles', (req, res) => {
    Articles.findAll({
        include: [{
            model: Category,
            attribute: ['id','title',]
        }]
    }).then(articles => {
        res.render('admin/articles/index', { articles: articles })
    })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories: categories })
    })
})

router.post("/articles/save", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category
    if (title != undefined && body != undefined ) {
        Articles.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId : category
        }).then(() => {
            res.redirect("/admin/articles")
        })
    } else {
        res.redirect("/admin/articles/new")
    }
})

router.post("/article/delete", (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })

        } else {
            res.redirect("/admin/articles")
        }
    } else {
        res.redirect("/admin/articles")
    }
})

module.exports = router