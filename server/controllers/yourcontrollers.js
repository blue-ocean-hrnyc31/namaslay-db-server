const express = require('express')


module.exports ={
    yourRoute: (req, res) => {
        res.send({message: "hello world!"});
    }
}