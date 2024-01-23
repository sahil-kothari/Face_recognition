const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const student = require("../schemas/student");

router.get(
    "/getencodings",
    async (req, res) => {
        try{
            student.find().then((doc) => {
                let dataToSend = []
                doc.forEach((student)=>[
                    dataToSend.push({regId: student.regId, facial_feature: student.facial_feature})
                ])
                console.log(dataToSend)
                res.send(dataToSend)
            })
            .catch((error)=>{
                console.log(error)
                res.status(500).json({
                message: "DB error"
            })});
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

router.post(
    "/markattendance",
    async (req, res) => {
        try{
            console.log(req.body)
            console.log(req.body)
            res.send()
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;