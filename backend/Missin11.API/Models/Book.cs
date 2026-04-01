namespace Mission11.API.Models;

// Book.cs
// This model represents a Book entity in the database.
// Each property corresponds to a column in the Books table.

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public string Publisher { get; set; } = "";
    public string Isbn { get; set; } = "";
    public string Classification { get; set; } = "";
    public string Category { get; set; } = "";
    public int PageCount { get; set; }
    public decimal Price { get; set; }
}