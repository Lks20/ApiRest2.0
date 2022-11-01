import { getConection } from "../database/database"

const getLanguages = async (req, res) => {
    try {
        const conection = await getConection();
        const result = await conection.query("SELECT id, name, programmers FROM lenguage");
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.menssage)
    }
};

const addLanguage = async (req, res) => {

    try {
        const { name, programmers } = req.body;

        if (name === undefined || programmers === undefined) {
            res.status(400).json({ menssage: "Bad Request. llene todos los campos" });
        }
        const language = { name, programmers }
        const conection = await getConection();
        await conection.query("INSERT INTO lenguage SET ?", language)
        res.json({menssage:"Se añadio el lenguaje"});




    } catch (error) {
        res.status(500);
        res.send(error.menssage)
    }
};


const getLanguage = async (req, res) => {
    try {
        console.log(req.params)
        const {id}=req.params
        const conection = await getConection();
        const result = await conection.query("SELECT id, name, programmers FROM lenguage WHERE id=?",id);
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.menssage)
    }
};


const deleteLanguage = async (req, res) => {
    try {
        console.log(req.params)
        const {id}=req.params
        const conection = await getConection();
        const result = await conection.query("DELETE  FROM lenguage WHERE id=?",id);
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.menssage)
    }
};

const updateLanguage = async (req, res) => {
    try {
        const {id}=req.params
        const { name, programmers } = req.body;


        if (id===undefined ||name === undefined || programmers === undefined) {
            res.status(400).json({ menssage: "Bad Request. llene todos los campos" });
        }

        const language = {id, name, programmers }

        const conection = await getConection();
        const result = await conection.query("UPDATE lenguage SET ? WHERE id=?",[language,id]);
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.menssage)
    }
};



export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    deleteLanguage,
    updateLanguage
}