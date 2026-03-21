using Microsoft.AspNetCore.Mvc;
using Mission11.API.Models;

namespace Mission11.API.Controllers;

// This controller handles API requests for retrieving books.
// It supports pagination (page size and page number)
// and sorting (e.g., by title) based on query parameters.
// Data is fetched from the database and returned to the frontend.

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "")
    {
        var query = _context.Books.AsQueryable();
        
        if (sortBy.ToLower() == "title")
        {
            query = query.OrderBy(b => b.Title);
        }

        var totalNumBooks = query.Count();

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var result = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };

        return Ok(result);
    }
}