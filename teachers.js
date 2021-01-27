const fs = require('fs')
const data = require ('./data.json')
const { age, graduation, date } = require('./utils')

//Create
exports.post = function (req,res) {

    const keys = Object.keys(req.body)

    //Checando campos vazios
    for (key of keys){
        if (req.body[key]=="") {
            return res.send ('Please, fill in all the fields')
        }
    }

    let { avatar_url, birth, name, degree, type, subjects} = req.body

    birth = Date.parse(req.body.birth)
    created_at = Date.now()
    id = Number (data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        birth,
        name,
        degree,
        type,
        subjects,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

    })
    
    return res.redirect("/teachers")
}

//Show
exports.show = function(req,res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return res.send("Teacher not found !")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: graduation(foundTeacher.degree),
        subjects: foundTeacher.subjects.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", {teacher})
}

//Edit
exports.edit = function(req,res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return res.send("Teacher not found !")
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }
    
    return res.render('teachers/edit', { teacher })
}