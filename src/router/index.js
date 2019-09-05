import Vue from 'vue'
import Router from 'vue-router'
// import acl from '../acl'
import store from '../store'

import Home from '@/components/Home'
import RecoveryPassword from '@/components/RecoveryPassword'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import About from '@/components/About'
import ProductPage from '@/components/ProductPage'
import AllProductsPage from '@/components/AllProductsPage'
import Cart from '@/components/Cart'
import NotFound from '@/components/NotFound'
import Cabinet from '@/components/cabinet/Cabinet'
import CabinetProfile from '@/components/cabinet/CabinetProfile'
import CabinetOrders from '@/components/cabinet/CabinetOrders'
import CabinetDraft from '@/components/cabinet/CabinetDraft'
import CabinetEdit from '@/components/cabinet/CabinetEdit'
import CabinetOneOrder from '@/components/cabinet/CabinetOneOrder'
import NotAuthorized from '@/components/NotAuthorized'
import ErrorComponent from '@/components/Error'
import SuccessComponent from '@/components/Success'
import SearchComponent from '@/components/Search'
import PromotionsComponent from '@/components/Promotions'
import ContactsComponent from '@/components/Contacts'
import NewProductsPageComponent from '@/components/NewProductsPage'
import PersonalDataPolicyComponent from '@/components/PersonalDataPolicy'
import ReturnAndExchangeComponent from '@/components/ReturnAndExchange'
import PublicOfferOfSaleComponent from '@/components/PublicOfferOfSale'
/**
 * Shipping
 */
import Ship from '@/components/shipping/Ship'
import DeliveryToHome from '@/components/shipping/DeliveryToHome'
import DeliveryToOffice from '@/components/shipping/DeliveryToOffice'
import DeliveryToCuntry from '@/components/shipping/DeliveryToCuntry'
import DeliveryToPost from '@/components/shipping/DeliveryToPost'
import DeliveryToSNG from '@/components/shipping/DeliveryToSNG'
/**
 * Payment
 */
import Payment from '@/components/payment/Payment'
import PaymentCard from '@/components/payment/PaymentCard'
import PaymentBankCard from '@/components/payment/PaymentBankCard'
import PaymentCash from '@/components/payment/PaymentCash'

/**
 * Admin Pages
 */
import AdminIndex from '@/components/admin/Index'
import AdminCategories from '@/components/admin/Categories'
import AdminOrders from '@/components/admin/Orders'
import AdminProducts from '@/components/admin/Products'
import AddCategory from '@/components/admin/AddCategory'
import AddProduct from '@/components/admin/AddProduct'
import AddStatus from '@/components/admin/AddStatus'
import AddNeoAddress from '@/components/admin/AddNeoAddress'
import OneOrder from '@/components/admin/OneOrder'
import AddProductCode from '@/components/admin/AddProductCode'
import AddPackaging from '@/components/admin/AddPackaging'
import AddPromotion from '@/components/admin/AddPromotion'
import AdminLogin from '@/components/admin/Login'
/**
 * Main index
 */
import MainIndex from '@/components/MainIndex'


Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: MainIndex,
            meta: {
                rule: 'isPublic'
            },
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: Home,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                // {
                //     path: 'login',
                //     name: 'Login',
                //     component: Login
                // },
                {
                    path: 'payment',
                    name: 'Payment',
                    component: Payment,
                    meta: {
                        rule: 'isPublic'
                    },
                    children: [
                        {
                            path: 'card',
                            component: PaymentCard,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'bank',
                            component: PaymentBankCard,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'cash',
                            component: PaymentCash,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: '',
                            redirect: 'card'
                        }
                    ]
                },
                {
                    path: 'shipping',
                    name: 'Shipping',
                    component: Ship,
                    meta: {
                        rule: 'isPublic'
                    },
                    children: [
                        {
                            path: 'home',
                            component: DeliveryToHome,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'office',
                            component: DeliveryToOffice,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'post',
                            component: DeliveryToPost,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'country',
                            component: DeliveryToCuntry,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: 'sng',
                            component: DeliveryToSNG,
                            meta: {
                                rule: 'isPublic'
                            },
                        },
                        {
                            path: '',
                            redirect: 'office'
                        }
                    ]
                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: Cart,
                    meta: {
                        rule: 'isPublic'
                    }
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: AllProductsPage,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'contacts',
                    name: 'Contacts',
                    component: ContactsComponent, 
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'new-products',
                    name: 'NewProducts',
                    component: NewProductsPageComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'personal-data-policy',
                    name: 'PersonalDataPolicyComponent',
                    component: PersonalDataPolicyComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'public-offer-of-sale',
                    name: 'PublicOfferOfSaleComponent',
                    component: PublicOfferOfSaleComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'return-and-exchange',
                    name: 'ReturnAndExchangeComponent',
                    component: ReturnAndExchangeComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: SearchComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'promotions',
                    name: 'Promotions',
                    component: PromotionsComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'success',
                    name: 'Success',
                    component: SuccessComponent,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'products/:product_id',
                    name: 'Product',
                    component: ProductPage,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'about',
                    name: 'About',
                    component: About,
                    meta: {
                        rule: 'isPublic'
                    }
                },
                {
                    path: 'cabinet',
                    component: Cabinet,
                    meta: {
                        rule: 'isLogged',
                        requiresAuth: true
                    },
                   /*  beforeEnter(to, from, next) {
                        let user = store.getters['user/userData']
                        if (user && user.role === 'admin') {
                            next(false)
                            store.dispatch('cart/changeStatus', 'fail')
                        } else {
                            next()
                        }
                    }, */
                    children: [
                        {
                            path: 'profile',
                            component: CabinetProfile,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: 'orders',
                            component: CabinetOrders,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: 'orders/:order_id',
                            component: CabinetOneOrder,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: 'draft',
                            component: CabinetDraft,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: 'draft/:order_id',
                            component: CabinetOneOrder,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: 'edit',
                            component: CabinetEdit,
                            meta: {
                                rule: 'isLogged'
                            },
                        },
                        {
                            path: '',
                            redirect: 'profile',
                            meta: {
                                rule: 'isLogged'
                            },
                        }
                    ]
                },
                {
                    path: 'registration',
                    name: 'Registration',
                    component: Registration,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'unauthorized',
                    name: 'NotAuthorized',
                    component: NotAuthorized,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: 'recovery-password',
                    name: 'RecoveryPassword',
                    component: RecoveryPassword,
                    meta: {
                        rule: 'isPublic'
                    },
                },
                {
                    path: '',
                    component: Home,
                    meta: {
                        rule: 'isPublic'
                    },
                }
            ]
        },
        {
            path: '/admin',
            component: AdminIndex,
            meta: {
                rule: 'isAdmin',
                requiresAuth: true
            },
            children: [
                {
                    path: 'products',
                    component: AdminProducts,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'categories',
                    component: AdminCategories,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'orders',
                    component: AdminOrders,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'codes',
                    component: AddProductCode,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'packagings',
                    component: AddPackaging,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'orders/:order_id',
                    component: OneOrder,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'products/:product_id',
                    component: AddProduct,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'categories/new',
                    component: AddCategory,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'statuses',
                    component: AddStatus,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'neo-addresses',
                    component: AddNeoAddress,
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: 'promotions',
                    component: AddPromotion, 
                    meta: {
                        rule: 'isAdmin'
                    }
                },
                {
                    path: '',
                    redirect: 'products',
                    meta: {
                        rule: 'isAdmin'
                    }
                }
            ]
        },
        {
            path: '/tologin',
            component: AdminLogin,
            meta: {
                rule: 'isPublic'
            }
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            meta: {
                rule: 'isPublic'
            }
        },
        {
            path: '/error',
            component: ErrorComponent,
            meta: {
                rule: 'isPublic'
            }
        },
        {
            path: '*',
            redirect: '/404',
            meta: {
                rule: 'isPublic'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
 /*    if (to.matched.some(record => record.meta.onlyAdmin)) {
        let user = store.getters['user/userData']

        if (user && user.role === 'admin') {
            next()
            if (window.document.domain === 'localhost') {
                if (window.$cookies.remove('access_token')) {
                } else {
                    store.dispatch('cart/changeStatus', 'fail')
                }
            } else {
                if (window.$cookies.remove('access_token', '/', '.neoin.club')) {
                } else {
                    store.dispatch('cart/changeStatus', 'fail')
                }
            }
        } else {
            store.dispatch('cart/changeStatus', 'fail')
            if (user !== null || (window.$cookies.get('a_token') !== null)) {
                if (window.document.domain === 'localhost') {
                    if (window.$cookies.remove('a_token')) {
                        next('/tologin')
                    } else {
                        next('/')
                        store.dispatch('cart/changeStatus', 'fail')
                    }
                } else {
                    if (window.$cookies.remove('a_token', '/', '.neoin.club')) {
                        next('/tologin')
                    } else {
                        next('/')
                        store.dispatch('cart/changeStatus', 'fail')
                    }
                }
            }
        }
    }
 */
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (window.$cookies.get('access_token') === null) {
            return next({
                path: '/unauthorized',
                // query: {
                //     redirect: to.fullPath
                // }
            })
        }
        next()
    }
    next()
})

router.onError(err => {
    // router.push('/error')
    // eslint-disable-next-line
    console.log('router error: ', err.message)
})

// router.push('/cabinet/orders')

export default router