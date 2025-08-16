# Error Handling in Node.js Express Application

This project demonstrates how to implement **error handling** in a Node.js + Express application, including **global error handling** and **custom error classes**.

---

## Table of Contents

1. [What is Error Handling?](#what-is-error-handling)
2. [Global Error Handling](#global-error-handling)
3. [Custom Error Classes](#custom-error-classes)
4. [Error Handling in Route Handlers](#error-handling-in-route-handlers)
5. [Example Scenarios](#example-scenarios)

---

## What is Error Handling?

**Error handling** is the process of catching and responding to errors in an application.  
It ensures that the application does not crash unexpectedly and provides meaningful responses to clients.

Without proper error handling, unexpected issues (e.g., database failures, invalid data) can break your application.

---

## Global Error Handling

**Global error handling** is a centralized way to catch all errors in an Express application and respond consistently.

Example:

```js
const globalErrorHandlingMiddlware = (error, req, res, next) => {
    console.log(error); // Log the error

    if (error.name === "NotFoundError") {
        res.status(404).json({ message: error.message });
        return;
    }

    if (error.name === "ValidationError") {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(500).json({ message: "Internal Server Error" });
};

export default globalErrorHandlingMiddlware;
```

- Handles different types of errors (NotFoundError, ValidationError).
- Returns appropriate HTTP status codes and messages.

## Custom Error Classes
- Custom error classes help differentiate between error types.

```js
NotFoundError
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
export default NotFoundError;
```

```js
ValidationError
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
export default ValidationError;
```

## Error Handling in Route Handlers
- Use try...catch and next(error) to pass errors to the global error handler.
  
```js
import Place from "../infrastructure/schemas/places.js";
import NotFoundError from "../service/not-found-error.js";
import ValidationError from "../service/validation-error.js";

export const getPlaceById = async (req, res, next) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) throw new NotFoundError("Place is not found");
        res.status(200).json(place);
    } catch (error) {
        next(error);
    }
};

export const createPlace = async (req, res, next) => {
    try {
        const place = req.body;

        if (!place.name || !place.location || !place.image) {
            throw new ValidationError("Please enter valid place data");
        }

        await Place.create(place);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};
```

## Example Scenarios

- Invalid ID Request
- Requesting /api/places/invalidID triggers a NotFoundError, returning:
  
```js
{
  "message": "Place is not found"
}
```

- Invalid Request Data
- Sending incomplete place data triggers a ValidationError:

```js
{
  "message": "Please enter valid place data"
}
```

- Unhandled Errors
- Any unexpected error (e.g., database failure) triggers a 500 Internal Server Error response:

```js
{
  "message": "Internal Server Error"
}
```

## Summary
- Use custom error classes to categorize errors.
- Always use try...catch in async route handlers.
- Pass errors to global error handler using next(error).
- Global error handling ensures consistent responses and keeps your application robust.
