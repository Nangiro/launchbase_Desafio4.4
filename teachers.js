const fs = require('fs')
const data = require ('./data.json')

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

    data.teachers.push({
        avatar_url,
        birth,
        name,
        degree,
        type,
        subjects,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/teachers")
    })

}