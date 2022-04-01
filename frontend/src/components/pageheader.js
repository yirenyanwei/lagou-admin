import pageheaderTpl from '../views/pageheader.art'

function pageheader() {
    const nav = {
        '#/index/users': {
            mainNav: '用户管理',
            subNav: '用户列表'
        },
        '#/index/positions': {
            mainNav: '职位管理',
            subNav: '职位列表'
        }
    }
    const hash = location.hash
    if(!nav[hash]) {
        return
    }
    const html = pageheaderTpl({
        mainNav: nav[hash].mainNav,
        subNav: nav[hash].subNav
    })
    $('#main-content').before(html)
}

export default pageheader