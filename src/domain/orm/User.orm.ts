import { LogError } from "../../utils/logger"
import { userEntity } from "../entities/User.entity"
import { IAuth } from "../interfaces/IAuth.interface"
import { IUser } from "../interfaces/IUser.interface"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity()

        return await userModel.find({isDelete: false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

export const getUserByID = async (id: string) : Promise<any | undefined> => {

    try {
        let userModel = userEntity()

        return await userModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User ID:${error}`)
    }

}

export const deleteUserByID = async (id: string) : Promise<any | undefined> => {

    try {
        let userModel = userEntity()

        return await userModel.deleteOne({ _id: id})
        
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User ID:${error}`)
    }

}

export const createUser = async (user:any) : Promise<any | undefined> => {
    
    try {
        let userModel = userEntity()

        //Create / Insert new User
        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`)
    }
}

export const updateUserByID = async (user:any, id:string) : Promise<any | undefined> => {
    
    try {

        let userModel = userEntity()

        //Update User
        return await userModel.findByIdAndUpdate(id, user)
        
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User: ${error}`)
    }

}

export const registerUser = async (user: IUser): Promise<any | undefined> => {

    try {
        let userModel = userEntity()

        //Create / Insert new User
        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Register User: ${error}`)
    }
    
}

export const loginUser =async (auth: IAuth): Promise<any | undefined> => {

    try {
        let userModel = userEntity()

        //Find user by email
        userModel.findOne({email: auth.email}, (err: any, user: IUser) => {
            if(err){

            }

            if(!user){

            }

            let validPassword = bcrypt.compareSync(auth.password, user.password)

            if(!validPassword){

            }

            let token = jwt.sign({email: user.email}, `${process.env.SECRET}`, {
                expiresIn: "1d"
            })

            return token

        })
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`)
    }
    
}

export const logoutUser = async (): Promise<any | undefined> => {

}