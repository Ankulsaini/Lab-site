const express = require("express")
const hbs = require("hbs")
const path = require("path")
const { title } = require("process")
const app = express()

const bodyParser = require("body-parser")
const encoder = bodyParser.urlencoded()

const nodemailer = require("nodemailer")
const transporter = new nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: true,
    auth: {
        user: "sainiankul225@gmail.com",
        pass: "ppfnkuetfviwfxjh"
    }
})

app.set("view engine", "hbs")
app.use(express.static("./views/public"))
hbs.registerPartials(path.join(__dirname, "./views/partials"))


app.get("/", (req, res) => {
    res.render("index", { title: "index" })
})
app.get("/404", (req, res) => {
    res.render("404", { title: "404 " })
})
app.get("/about", (req, res) => {
    res.render("about", { title: "About us" })
})
app.get("/appoinment", (req, res) => {

    res.render("appoinment", { title: "Appoinments", result: false })
})

app.post("/appoinment", encoder, (req, res) => {
    let mailOption = {
        from: "sainiankul225@gmai.com",
        to: req.body.email,
        subject: "Your Appoinment  Has Been Booked",
        text: `
Hello ${req.body.name},
Your Appoinment  Has Been Booked For ${req.body.datetime} !! Our team will contact you soon.
Thanks for you interest.
Team: Lab Sky
        `
    }

    transporter.sendMail(mailOption, (error) => {
        console.log(error)
    })

    mailOption = {
        from: "sainiankul225@gmail.com",
        to: "sainiankul225@gmail.com",
        subject: "Received New Appointment",
        html: `
        New Appointment received 
        <br>

        <table border='2px' cellpadding='10px' cellspacing='0px'>
        <tbody>
        <tr>
        <th>Name</th>
        <td>${req.body.name}</td>
        </tr>
        <tr>
        <th>Phone</th>
        <td>${req.body.number}</td>
        </tr>
         <tr>
        <th>Mail</th>
        <td>${req.body.email}</td>
        </tr>
         <tr>
        <th>service</th>
        <td>${req.body.service}</td>
        </tr>
        <tr>
        <th>Timing</th>
        <td>${req.body.datetime}</td>
        </tr>
         <tr>
        <th>Message</th>
        <td>${req.body.message}</td>
        </tr>
        </tbody
        </table>`
    } 

    transporter.sendMail(mailOption, (error) => {
        console.log(error)
    })

    res.render("appoinment", { title: "appoinment", result: true })
})

app.get("/contact-us", (req, res) => {
    res.render("contact", { title: "Contacts", show: false })
})
app.post("/contact-us", encoder, (req, res) => {
    let mailOption = {
        from: "sainiankul225@gmai.com",
        to: req.body.email,
        subject: "Your Query Has Been Received",
        text: `
Hello ${req.body.name},
your Query has been received our team will contact you soon.
Thanks for you interest
Team: Lab Sky
        `
    }

    transporter.sendMail(mailOption, (error) => {
        console.log(error)
    })

    mailOption = {
        from: "sainiankul225@gmail.com",
        to: "sainiankul225@gmail.com",
        subject: "Received New Query",
        html: `
        New Query received 

        <table border='2px' cellpadding='10px' cellspacing='0px'>
        <tbody>
        <tr>
        <th>Name</th>
        <td>${req.body.name}</td>
        </tr>
        <tr>
        <th>Phone</th>
        <td>${req.body.number}</td>
        </tr>
         <tr>
        <th>Mail</th>
        <td>${req.body.email}</td>
        </tr>
         <tr>
        <th>Subject</th>
        <td>${req.body.subject}</td>
        </tr>
         <tr>
        <th>Message</th>
        <td>${req.body.message}</td>
        </tr>
        </tbody
        </table>`
    }

    transporter.sendMail(mailOption, (error) => {
        console.log(error)
    })

    res.render("contact", { title: "Contacts", show: true })
})

app.get("/feature", (req, res) => {
    res.render("feature", { title: "Features" })
})
app.get("/service", (req, res) => {
    res.render("service", { title: "Services" })
})
app.get("/team", (req, res) => {
    res.render("team", { title: "Teams" })
})
app.get("/testimonial", (req, res) => {
    res.render("testimonial", { title: "Testimonials" })
})
app.get("/*", (req, res) => {
    res.render("404", { title: "404 Pge Not Found" })
})

app.listen(8000, () => console.log("Running on http://localhost:8000"))





