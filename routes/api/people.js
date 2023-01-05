const express = require("express");
const router = express.Router();
const {
    getPeople,
    getPerson,
    postPerson,
    putPerson,
    deletePerson
} = require("../../controllers/people");


router.route("/")
    .get(getPeople)
    .post(postPerson);

router.route("/:id")
    .get(getPerson)
    .put(putPerson)
    .delete(deletePerson);


module.exports = router;
