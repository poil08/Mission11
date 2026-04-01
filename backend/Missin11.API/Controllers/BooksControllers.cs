using Microsoft.AspNetCore.Mvc;
using Mission11.API.Models;

namespace Mission11.API.Controllers;

// BooksController.cs
// This controller handles all API requests related to books.
// It supports retrieving books with pagination/filtering,
// as well as adding, updating, and deleting books from the database.

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
            books = books,
            totalNumBooks = totalNumBooks
        };

        return Ok(result);
    }

    [HttpPost]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();

        return Ok(newBook);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(id);

        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.Isbn = updatedBook.Isbn;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _context.Books.Update(existingBook);
        _context.SaveChanges();

        return Ok(existingBook);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _context.Books.Find(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
}