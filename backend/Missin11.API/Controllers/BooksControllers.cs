using Microsoft.AspNetCore.Mvc;
using Mission11.API.Models;

// This controller handles API requests for retrieving books from the database.
// It supports pagination (page size and page number), sorting (e.g., by title),
// and returns both the list of books and the total number of books for frontend use.

namespace Mission11.API.Controllers;

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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "", string category = "")
    {
        var query = _context.Books.AsQueryable();

        if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
        {
            query = query.Where(b => b.Category == category);
        }

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