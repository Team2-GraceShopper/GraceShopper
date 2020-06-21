/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
// export {Login, Signup} from './auth-form'
export {default as Login} from './Login'
export {default as Signup} from './Signup'

export {default as Header} from './Header'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as StickyFooter} from './StickyFooter'
