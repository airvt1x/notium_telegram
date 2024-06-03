import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from '../models/User.js';


export const login = async(req, res)=>{
    try{
        const user = await UserModel.findOne({ email: req.body.email});

        if (!user){
            return res.status(404).json({
                message: 'Нет такого пользователя',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }
        const hash_env = process.env.HASH;
        const token = jwt.sign(
            {
            _id: user._id,
            },
            hash_env,
            {
             expiresIn: '30d',
            }
         );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const gitlogin = async(req, res)=>{
    try{
        const user = await UserModel.findOne({ email: req.body.email});

        if (!user){
            const doc = new UserModel({
                email:req.body.email,
                photoUrl:req.body.photoUrl,
                Gitid:req.body.Gitid,
            });
            const hash_env = process.env.HASH;
            const user = await doc.save();

            const token = jwt.sign({
                _id: user._id,
            },
            hash_env,
            {
                expiresIn: '30d',
            });

            const {passwordHash, ...userData} = user._doc;

            res.json({
                ...userData,
                token,
            });
        }
        
        else if(user){
            const hash_env = process.env.HASH;
            const token = jwt.sign({
                _id: user._id,
            },
            hash_env,
            {
                expiresIn: '30d',
            });

            const {passwordHash, ...userData} = user._doc;

            res.json({
                ...userData,
                token,
            });
        }


        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

