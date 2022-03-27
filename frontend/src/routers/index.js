import SMERouter from 'gp21-router'
import {index, isAuth } from '../controllers/users/index'
import { signin } from '../controllers/signin'
const router = new SMERouter('root')//root为节点id
//router
//守卫路由
router.use((req)=>{
    console.log('go go go')
})
//重定向
router.route('/', isAuth)
router.route('/index', index)
router.route('/signin', signin)

export default router