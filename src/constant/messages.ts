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
    PARENT_CATEGORY_NOT_EXISTS : "Parent category does not exists"
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
    },
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
    DELETE:{
        SUCCESS:"Buyer deleted",
        FAILED: "Buyer delete failed"
    }
}