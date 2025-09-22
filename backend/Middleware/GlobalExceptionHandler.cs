using System.Net;
using System.Text.Json;

namespace backend.Middleware;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            _logger.LogError(ex, "An unhandled exception has occurred: {Message}", ex.Message);
            
            // Create a standardized error response
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                StatusCode = context.Response.StatusCode,
                Message = "An internal server error has occurred. Please try again later."
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}