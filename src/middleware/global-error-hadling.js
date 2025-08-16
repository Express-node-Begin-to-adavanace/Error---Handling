const globalErrorHandlingMiddlware = (error, req, res, next) => {
    console.log(error);

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
