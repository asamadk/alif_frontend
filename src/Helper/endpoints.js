const BASE_URL = 'https://alif-ecommerce.herokuapp.com/';

export const REGISTER = BASE_URL+'register';
export const LOGIN = BASE_URL+'login';

export const CATEGORIES = BASE_URL+'categories';

export const GET_PRODUCTS = BASE_URL+'products?order=NORMAL&limit=0';
export const GET_PRODUCTS_LIMIT_4 = BASE_URL+'products?order=NORMAL&limit=4';
export const GET_PRODUCTS_LATEST = BASE_URL+'products?order=DESC&limit=4';
export const GET_PRODUCTS_BY_CATEGORY = BASE_URL+'product/category/';
export const GET_SINGLE_PRODUCT = BASE_URL+'product/';

export const ADD_PRODUCT_TO_CART = BASE_URL+'user/cart/';
export const GET_CART = BASE_URL+'user/cart/';
export const ADD_COUPON_TO_CART = BASE_URL+'user/cart/coupon';

export const GET_COUPONS = BASE_URL+'user/coupons/';
export const DELETE_PRODUCT_FROM_CART = BASE_URL+'user/cart/';

export const GET_USER = BASE_URL+'user/find/';
export const GET_USER_WISHLIST = BASE_URL+'user/wishlist';
export const ADD_USER_WISHLIST = BASE_URL+'user/wishlist/';


export const DELETE_COUPON = BASE_URL+'user/cart/coupon/';
export const DELETE_FROM_WISHLIST = BASE_URL+'user/wishlist/';
export const UPDATE_CURRENT_USER = BASE_URL+'user/update/';
export const CREATE_ORDER_FROM_CART = BASE_URL+'user/order';

export const SEARCH_PRODUCT = BASE_URL+'search?product_name=';

export const CHANGE_CURRENT_PASSWORD = BASE_URL+'user/password';
export const RESET_PASSWORD = BASE_URL+'resetPassword?email=';

export const CHANGE_PASSWORD = BASE_URL+'changePassword?token=';

export const GET_ALL_ORDERS = BASE_URL+'user/orders';
export const GET_ORDER = BASE_URL+'user/order/';

export const INIT_PAYMENT = BASE_URL+'user/payment';
export const GET_PAYMENT_OPTIONS = BASE_URL+'user/payment/options?token=';
export const PROCESS_PAYMENT = BASE_URL+'user/payment/process?token=';
