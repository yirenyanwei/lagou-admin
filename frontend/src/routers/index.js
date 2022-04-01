import SMERouter from 'gp21-router'
import {index, isAuth } from '../controllers/index'
import { signin } from '../controllers/signin'
import {listUser} from '../controllers/users/list-users'
import { listPosition } from '../controllers/posions/list-position'
const router = new SMERouter('root')//root为节点id
//router
//守卫路由
router.use((req)=>{
    console.log('go go go')
    // isAuth(req)
})
//重定向
router.route('/', isAuth)
router.route('/index', index)
router.route('/signin', signin)
router.route('/index/users', listUser)
router.route('/index/positions', listPosition)
// router.route('*', (req, res, next) => {
//     res.redirect('/index')
// })

export default router