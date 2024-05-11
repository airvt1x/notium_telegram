import NoteModel from "../models/Note.js"

export const getNotes = async(req,res)=>{
    const user_id = req.userId
    try {
        const notes = await NoteModel.find({
            user: user_id});

        res.json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить заметки',
        });
        
    }
}
