export const CATEGORY_MESSAGES = {
    CREATE : {
        SUCCESS: "Category created",
        FAILED: "Category create failed",
        EXISTS: "Category exists",
    },
    UPDATE : {
        SUCCESS: "Category updated",
        FAILED: "Category update failed",
    },
    DELETE : {
        SUCCESS: "Category deleted",
        FAILED: "Category delete failed",
    },
    RETRIEVE : {
        SUCCESS: "Category retrived",
        FAILED: "Category retrived",
    },
    FETCH : {
        SUCCESS: "Category fetched",
        FAILED: "Category fetch failed",
    },
    CATEGORY_NOT_EXISTS : "Category does not exists"
}

export const SLUG_MESSAGES = {
    CREATE : {
        SUCCESS: "Slug created",
        FAILED: "Slug create failed",
        EXISTS : "Slug exists"
    },
}

export const PRODUCT_MESSAGES = {
    CREATE : {
        SUCCESS: "Product created",
        FAILED: "Product create failed",
        EXISTS: "Product exists"
    },
    UPDATE : {
        SUCCESS: "Product updated",
        FAILED: "Product update failed",
    },
    DELETE : {
        SUCCESS: "Product deleted",
        FAILED: "Product delete failed",
    },
    FETCH : {
        SUCCESS: "Product fetched",
        FAILED: "Product fetch failed",
    },
}

export const AUTH_MESSAGES = {
    REGISTER: {
        SUCCESS: "User registered",
        FAILED: "Registration unsuccessful",
        EXISTS: "User exists"
    },
    LOGIN: {
        SUCCESS: "Login successful",
        FAILED: "Login failed",
        USER_NOT_FOUND: "User not found"
    },
    AUTHORIZE: {
        SUCCESS: "Authorized",
        FAILED: "Unauthorized",
        EXPIRED: "Token expired",
        FORBIDDEN: "Forbidden",
        INVALID_TOKEN: "Invalid token"
    }
}

export const USER_MESSAGES = {
    CREATE : {
        SUCCESS: "User created",
        FAILED: "User creation failed",
        EXISTS: "User exists"
    },
    UPDATE : {
        SUCCESS: "User updated",
        FAILED: "User update failed"
    },
    DELETE : {
        SUCCESS: "User deleted",
        FAILED: "User delete failed"
    }
}
export const PERMISSION_MESSAGES = {
    CREATE : {
        SUCCESS: "Permission created",
        FAILED: "Permission creation failed",
        EXISTS: "Permission exisits"
    },
    ASSIGN: {
        SUCCESS: "Permission assigned successfully",
        FAILED: "Permission assign unsuccessful",
    }
}

export const ROLE_MESSAGES = {
    CREATE:{
        SUCCESS:"Role created",
        FAILED: "Role creation failed",
        EXISTS: "Role exists",
    },
    FETCH:{
        SUCCESS:"Role fetched",
        FAILED: "Role fetch failed",
    },
    UPDATE:{
        SUCCESS:"Role updated",
        FAILED: "Role update failed",
    },
    DELETE:{
        SUCCESS:"Role deleted",
        FAILED: "Role delete failed",
    },
    ASSIGN:{
        SUCCESS:"Role assigned successful",
        FAILED: "Role assigned unnsuccessful"
    }
}


export const BUYER_MESSAGE = {
    CREATE:{
        SUCCESS:"Buyer created",
        FAILED: "Buyer creation failed",
        EXISTS: "Buyer exists",
    },
    UPDATE:{
        SUCCESS:"Buyer updated",
        FAILED: "Buyer update failed"
    },
    FETCH:{
        SUCCESS:"Buyer fetched",
        FAILED: "Buyer fetch failed"
    },
    RESTORE:{
        SUCCESS:"Buyer restored",
        FAILED: "Buyer restore failed"
    },
    DELETE:{
        SUCCESS:"Buyer deleted",
        FAILED: "Buyer delete failed"
    }
}

export const ARTISAN_MESSAGE = {
    CREATE:{
        SUCCESS:"Artisan created",
        FAILED: "Artisan creation failed",
        EXISTS: "Artisan exists",
    },
    UPDATE:{
        SUCCESS:"Artisan updated",
        FAILED: "Artisan update failed"
    },
    FETCH:{
        SUCCESS:"Artisan fetched",
        FAILED: "Artisan fetch failed"
    },
    DELETE:{
        SUCCESS:"Artisan deleted",
        FAILED: "Artisan delete failed"
    }
}

export const MEDIA_MESSAGE = {
    UPLOAD: {
        SUCCESS: "Image upload successful",
        FAILED: "Image upload failed"
    },
    REPLACE : {
        SUCCESS: "Image replaced successfully",
        FAILED: "Image replaced Unsuccessful"
    }
}
