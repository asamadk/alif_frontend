// const BASE_URL = 'https://alif-ecommerce.herokuapp.com/';
const BASE_URL = 'http://localhost:8080/';

export const MAIL_ORDER = BASE_URL + 'mail/order/details/'

export const REGISTER = BASE_URL+'register';
export const LOGIN = BASE_URL+'login';

export const CATEGORIES = BASE_URL+'categories';

export const GET_PRODUCTS = (page,limit) => {
    return `${BASE_URL}products?order=NORMAL&limit=${limit}&page=${page}`;
}

export const VALIDATE_MAIL = 'https://emailvalidation.abstractapi.com/v1/?api_key=c27cae96468a4ae9ae8a1c82076ad9f8&email=';

export const GET_PRODUCTS_LIMIT_4 = BASE_URL+'products?order=NORMAL&limit=4&page=0';
export const GET_PRODUCTS_LATEST = BASE_URL+'products?order=DESC&limit=4&page=0';
export const GET_PRODUCTS_BY_CATEGORY = BASE_URL+'product/category/';
export const GET_SINGLE_PRODUCT = BASE_URL+'product/';

export const ADD_PRODUCT_TO_CART = BASE_URL+'user/cart/';
export const GET_CART = BASE_URL+'user/cart/';
export const ADD_COUPON_TO_CART = BASE_URL+'user/cart/coupon';

export const GET_COUPONS = BASE_URL+'user/coupons/';
export const DELETE_PRODUCT_FROM_CART = BASE_URL+'user/cart/';

export const GET_USER = BASE_URL+'user/find/';
export const GET_USER_WISHLIST = BASE_URL+'user/wishlist?size=5&page=0';
export const ADD_USER_WISHLIST = BASE_URL+'user/wishlist/';


export const DELETE_COUPON = BASE_URL+'user/cart/coupon/';
export const DELETE_FROM_WISHLIST = BASE_URL+'user/wishlist/';
export const UPDATE_CURRENT_USER = BASE_URL+'user/update/';
export const CREATE_ORDER_FROM_CART = BASE_URL+'user/order';

export const SEARCH_PRODUCT = BASE_URL+'search?product_name=';

export const CHANGE_CURRENT_PASSWORD = BASE_URL+'user/password';
export const RESET_PASSWORD = BASE_URL+'resetPassword?email=';

export const CHANGE_PASSWORD = BASE_URL+'changePassword?token=';

export const GET_ALL_ORDERS = (page,size) => {
    return `${BASE_URL}user/orders?page=${page}&size=${size}`;
}

export const GET_ORDER = BASE_URL+'user/order/';
export const ORDER_PLACE = BASE_URL+'user/order/success';

export const INIT_PAYMENT = BASE_URL+'user/payment';
export const GET_PAYMENT_OPTIONS = BASE_URL+'user/payment/options?token=';
export const PROCESS_PAYMENT = BASE_URL+'user/payment/process?token=';

export const CONTACT_US = BASE_URL+'contactUsMail';
