export const errorHandlerMiddleware = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      error: true,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
}