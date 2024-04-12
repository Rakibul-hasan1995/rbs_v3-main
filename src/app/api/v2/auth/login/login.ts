

import { Response400 } from '@/lib/response/400'
import { User } from '@DB/model/User'
import { Response500 } from '@Lib/response/500'
import { registerValidator } from '@Validator/auth/register'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const login = async (body: any) => {
   try {
      const validator = registerValidator(body)
      if (!validator.isValid) {
         console.log(validator)
         return Response400(validator.error)
      }
      const { email, password } = body

      const existUser = await User.findOne({ email })
      if (!existUser || !existUser.password) {
         return { code: 403, message: 'Invalid Credential', data: { email: 'invalid credential' } }
      }
      const hashedPass = existUser.password
      const isValid = await bcrypt.compare(password, hashedPass);

      if (!isValid) {
         return { code: 403, message: 'Invalid Credential', data: [{ field: 'email', value: 'invalid credential' }] }
      }

      const secret = process.env.JWT_SECRET

      const access_token = jwt.sign({
         name: existUser.user_name,
         id: existUser._id,
         roll: existUser.roll,
         email: existUser.email,
      }, `${secret}`, {
         expiresIn: '30d'
      });



      cookies().set('Authorization', access_token)
      const response = {
         code: 200,
         message: 'Signin Successful',
         data: {
            access_token
         },
      }
      return response

   } catch (error: any) {
     throw error
   }
}
